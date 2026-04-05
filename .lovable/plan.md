

# Add NFT Digital Twin Section to Dashboard

## Overview
Add a new "Digital Twins" section within the dashboard that lets users view and claim NFT digital twins associated with their purchased products. This will be rendered inline in the dashboard's main content area (not a separate page), accessible via a new sidebar item under "Quick Access."

## What Changes

### 1. Database: Create `nft_digital_twins` table
A new table to track which products have claimable NFTs and their claim status per user.

```sql
CREATE TABLE public.nft_digital_twins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id text NOT NULL,
  product_title text NOT NULL,
  product_image_url text,
  variant_title text,
  status text NOT NULL DEFAULT 'claimable',  -- claimable, claimed, pending
  claimed_at timestamptz,
  token_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.nft_digital_twins ENABLE ROW LEVEL SECURITY;
-- Users can only view/update their own NFTs
```

### 2. Edge Function: `sync-nft-twins`
When the user visits the Digital Twins section, call this function to:
- Fetch the user's Shopify orders (reusing existing `SHOPIFY_ACCESS_TOKEN`)
- Compare against existing `nft_digital_twins` rows
- Insert any new claimable NFTs for products not yet tracked
- Return the full list of digital twins for the user

### 3. Dashboard UI Changes

**DashboardSidebar** -- Add a "Digital Twins" item (with a gem/diamond icon) to the `quickAccessItems` array, linking to an internal view (not a route navigation).

**Dashboard page** -- Instead of always navigating away on sidebar click, render a `DigitalTwins` component inline when the user selects "Digital Twins." The component will show:
- A grid of cards, each representing a purchased product
- Product image, title, variant, and order number
- Status badge: "Claimable" (gold), "Claimed" (green), "Pending" (gray)
- A "Claim Digital Twin" button for claimable items that updates the status to "claimed"

### 4. New Component: `src/components/DigitalTwins.tsx`
- Calls `supabase.functions.invoke('sync-nft-twins')` on mount
- Displays loading state, empty state ("No digital twins available yet"), and the card grid
- Claim button updates the row status via Supabase client

## Technical Details

- The NFT claim is currently a status update in the database (placeholder for future blockchain integration). No actual minting occurs yet.
- The edge function uses the authenticated user's email to match Shopify orders, same pattern as `get-shopify-orders`.
- RLS policies ensure users can only see and update their own digital twin records.

