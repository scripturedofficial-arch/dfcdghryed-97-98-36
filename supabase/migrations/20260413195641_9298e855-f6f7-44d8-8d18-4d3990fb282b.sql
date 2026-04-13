ALTER TABLE public.profiles ADD COLUMN username text UNIQUE;

CREATE UNIQUE INDEX profiles_username_lower_idx ON public.profiles (lower(username));