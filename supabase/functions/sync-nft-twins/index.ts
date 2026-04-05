import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHOPIFY_STORE_DOMAIN = "dfcdghryed-97-98-36-if9i6.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Auth client to get user
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customerEmail = user.email;
    if (!customerEmail) {
      return new Response(JSON.stringify({ error: "No email associated with account" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const shopifyAccessToken = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!shopifyAccessToken) {
      return new Response(JSON.stringify({ error: "Shopify not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Service role client for inserts (bypasses RLS since we set user_id correctly)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch orders from Shopify
    const url = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders.json?email=${encodeURIComponent(customerEmail)}&status=any&limit=250`;
    const shopifyRes = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": shopifyAccessToken,
        "Content-Type": "application/json",
      },
    });

    if (!shopifyRes.ok) {
      console.error("Shopify API error:", await shopifyRes.text());
      return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await shopifyRes.json();
    const orders = data.orders || [];

    // Get existing twins for this user
    const { data: existingTwins } = await supabaseAdmin
      .from("nft_digital_twins")
      .select("order_id, product_title, variant_title")
      .eq("user_id", user.id);

    const existingKeys = new Set(
      (existingTwins || []).map(
        (t: any) => `${t.order_id}|${t.product_title}|${t.variant_title || ""}`
      )
    );

    // Build new twins from orders
    const newTwins: any[] = [];
    for (const order of orders) {
      for (const item of order.line_items || []) {
        const key = `${order.id}|${item.title}|${item.variant_title || ""}`;
        if (!existingKeys.has(key)) {
          // Get product image if available
          let imageUrl = null;
          if (item.product_id) {
            try {
              const imgRes = await fetch(
                `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/products/${item.product_id}/images.json?limit=1`,
                {
                  headers: {
                    "X-Shopify-Access-Token": shopifyAccessToken,
                    "Content-Type": "application/json",
                  },
                }
              );
              if (imgRes.ok) {
                const imgData = await imgRes.json();
                imageUrl = imgData.images?.[0]?.src || null;
              }
            } catch {
              // ignore image fetch errors
            }
          }

          for (let i = 0; i < item.quantity; i++) {
            newTwins.push({
              user_id: user.id,
              order_id: String(order.id),
              product_title: item.title,
              product_image_url: imageUrl,
              variant_title: item.variant_title || null,
              status: "claimable",
              metadata: {
                order_name: order.name,
                price: item.price,
                currency: order.currency,
              },
            });
          }
        }
      }
    }

    // Insert new twins
    if (newTwins.length > 0) {
      const { error: insertError } = await supabaseAdmin
        .from("nft_digital_twins")
        .upsert(newTwins, { onConflict: "user_id,order_id,product_title,variant_title", ignoreDuplicates: true });

      if (insertError) {
        console.error("Insert error:", insertError);
      }
    }

    // Fetch all twins for user
    const { data: allTwins, error: fetchError } = await supabaseAdmin
      .from("nft_digital_twins")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return new Response(JSON.stringify({ error: "Failed to fetch digital twins" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ twins: allTwins || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
