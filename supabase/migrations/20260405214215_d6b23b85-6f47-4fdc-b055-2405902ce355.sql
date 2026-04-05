
CREATE TABLE public.nft_digital_twins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id text NOT NULL,
  product_title text NOT NULL,
  product_image_url text,
  variant_title text,
  status text NOT NULL DEFAULT 'claimable',
  claimed_at timestamptz,
  token_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.nft_digital_twins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own digital twins"
ON public.nft_digital_twins
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own digital twins"
ON public.nft_digital_twins
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own digital twins"
ON public.nft_digital_twins
FOR UPDATE
USING (auth.uid() = user_id);

CREATE INDEX idx_nft_digital_twins_user_id ON public.nft_digital_twins(user_id);
CREATE UNIQUE INDEX idx_nft_digital_twins_unique_order_product ON public.nft_digital_twins(user_id, order_id, product_title, variant_title);
