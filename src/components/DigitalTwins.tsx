import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Diamond } from "lucide-react";
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
      toast.success("The covenant is sealed.", {
        description: `${twin.product_title} has been claimed.`,
      });
    } catch (err) {
      console.error("Claim error:", err);
      toast.error("Claim failed. Try again.");
    } finally {
      setClaimingId(null);
    }
  };

  const statusBadge = (status: string) => {
    const base = "text-xs tracking-[0.12em] uppercase px-3 py-1 font-medium";
    switch (status) {
      case "claimable":
        return (
          <span className={base} style={{ color: '#C8A96E', backgroundColor: 'rgba(200,169,110,0.1)', border: '0.5px solid rgba(200,169,110,0.3)', borderRadius: '2px' }}>
            Claimable
          </span>
        );
      case "claimed":
        return (
          <span className={base} style={{ color: '#6aaa88', backgroundColor: 'rgba(106,170,136,0.1)', border: '0.5px solid rgba(106,170,136,0.3)', borderRadius: '2px' }}>
            Claimed
          </span>
        );
      case "pending":
        return (
          <span className={base} style={{ color: '#555', backgroundColor: '#111', border: '0.5px solid #222', borderRadius: '2px' }}>
            Pending
          </span>
        );
      default:
        return (
          <span className={base} style={{ color: '#555', border: '0.5px solid #222', borderRadius: '2px' }}>
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-serif text-2xl text-white mb-1">Digital Twins</h2>
          <p className="text-xs tracking-[0.15em] uppercase" style={{ color: '#555' }}>
            Your authenticated digital records
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ backgroundColor: '#111', border: '0.5px solid #1a1a1a', borderRadius: '4px', overflow: 'hidden' }}>
              <Skeleton className="h-48 w-full" style={{ backgroundColor: '#1a1a1a' }} />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" style={{ backgroundColor: '#1a1a1a' }} />
                <Skeleton className="h-3 w-1/2" style={{ backgroundColor: '#1a1a1a' }} />
                <Skeleton className="h-8 w-full" style={{ backgroundColor: '#1a1a1a' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-white mb-1">Digital Twins</h2>
        <p className="text-xs tracking-[0.15em] uppercase" style={{ color: '#555' }}>
          Your authenticated digital records
        </p>
      </div>

      {twins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Diamond className="h-8 w-8 mb-6" style={{ color: '#1a1a1a' }} />
          <p className="font-serif text-lg text-white mb-3">The covenant awaits.</p>
          <div className="w-6 h-px mb-4" style={{ backgroundColor: '#C8A96E' }} />
          <p className="text-xs tracking-[0.15em] uppercase" style={{ color: '#333' }}>
            Acquire a Collection Box to receive your digital twin
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {twins.map((twin) => (
            <div
              key={twin.id}
              style={{
                backgroundColor: '#111',
                border: '0.5px solid #1a1a1a',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = '#2a2a2a')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = '#1a1a1a')}
            >
              <div className="relative h-48 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
                {twin.product_image_url ? (
                  <img
                    src={twin.product_image_url}
                    alt={twin.product_title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Diamond className="h-12 w-12" style={{ color: '#1a1a1a' }} />
                )}
                <div className="absolute top-3 right-3">
                  {statusBadge(twin.status)}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-white leading-tight">
                    {twin.product_title}
                  </h3>
                  {twin.variant_title && (
                    <p className="text-xs mt-1" style={{ color: '#555' }}>{twin.variant_title}</p>
                  )}
                  <p className="text-xs mt-1" style={{ color: '#333' }}>
                    {twin.metadata?.order_name || `Order #${twin.order_id}`}
                  </p>
                </div>

                {twin.status === "claimable" && (
                  <button
                    onClick={() => handleClaim(twin)}
                    disabled={claimingId === twin.id}
                    className="w-full py-2.5 text-xs tracking-[0.15em] uppercase font-medium transition-colors"
                    style={{
                      backgroundColor: '#C8A96E',
                      color: '#0a0a0a',
                      border: 'none',
                      borderRadius: '2px',
                      cursor: claimingId === twin.id ? 'not-allowed' : 'pointer',
                      opacity: claimingId === twin.id ? 0.6 : 1
                    }}
                  >
                    {claimingId === twin.id ? "Claiming..." : "Claim Yours"}
                  </button>
                )}

                {twin.status === "claimed" && twin.claimed_at && (
                  <p className="text-xs text-center" style={{ color: '#333' }}>
                    Sealed {new Date(twin.claimed_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
