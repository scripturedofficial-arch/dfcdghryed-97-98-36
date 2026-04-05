import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Diamond, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface DigitalTwin {
  id: string;
  order_id: string;
  product_title: string;
  product_image_url: string | null;
  variant_title: string | null;
  status: string;
  claimed_at: string | null;
  token_id: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export function DigitalTwins() {
  const [twins, setTwins] = useState<DigitalTwin[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  useEffect(() => {
    syncTwins();
  }, []);

  const syncTwins = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("sync-nft-twins");
      if (error) throw error;
      setTwins(data?.twins || []);
    } catch (err) {
      console.error("Failed to sync digital twins:", err);
      toast.error("Failed to load digital twins");
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (twin: DigitalTwin) => {
    setClaimingId(twin.id);
    try {
      const { error } = await supabase
        .from("nft_digital_twins" as any)
        .update({ status: "claimed", claimed_at: new Date().toISOString() } as any)
        .eq("id", twin.id);

      if (error) throw error;

      setTwins((prev) =>
        prev.map((t) =>
          t.id === twin.id
            ? { ...t, status: "claimed", claimed_at: new Date().toISOString() }
            : t
        )
      );
      toast.success("Digital Twin claimed!", {
        description: `${twin.product_title} has been claimed successfully.`,
      });
    } catch (err) {
      console.error("Claim error:", err);
      toast.error("Failed to claim digital twin");
    } finally {
      setClaimingId(null);
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "claimable":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30">
            Claimable
          </Badge>
        );
      case "claimed":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
            Claimed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-muted text-muted-foreground border-border hover:bg-muted">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-serif mb-2 text-foreground">Digital Twins</h2>
          <p className="text-muted-foreground">Your NFT digital twins from purchased products</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif mb-2 text-foreground">Digital Twins</h2>
        <p className="text-muted-foreground">Your NFT digital twins from purchased products</p>
      </div>

      {twins.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Diamond className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <p className="text-muted-foreground">No digital twins available yet</p>
          <p className="text-sm text-muted-foreground/70">
            Purchase a product to receive its NFT digital twin
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {twins.map((twin) => (
            <Card key={twin.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                {twin.product_image_url ? (
                  <img
                    src={twin.product_image_url}
                    alt={twin.product_title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Diamond className="h-16 w-16 text-muted-foreground/30" />
                )}
                <div className="absolute top-3 right-3">
                  {statusBadge(twin.status)}
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-foreground text-sm leading-tight">
                    {twin.product_title}
                  </h3>
                  {twin.variant_title && (
                    <p className="text-xs text-muted-foreground mt-1">{twin.variant_title}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Order {twin.metadata?.order_name || `#${twin.order_id}`}
                  </p>
                </div>

                {twin.status === "claimable" && (
                  <Button
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => handleClaim(twin)}
                    disabled={claimingId === twin.id}
                  >
                    <Sparkles className="h-4 w-4" />
                    {claimingId === twin.id ? "Claiming..." : "Claim Digital Twin"}
                  </Button>
                )}

                {twin.status === "claimed" && twin.claimed_at && (
                  <p className="text-xs text-muted-foreground text-center">
                    Claimed on {new Date(twin.claimed_at).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
