-- Run this file in your Supabase SQL editor to create the tables

CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text,
  sort_order int DEFAULT 0,
  row_number int DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_role text,
  avatar_url text,
  quote text NOT NULL,
  rating int DEFAULT 5,
  published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text
);

CREATE TABLE IF NOT EXISTS process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number int NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  sort_order int DEFAULT 0
);

INSERT INTO site_settings (key, value) 
VALUES ('site_name', 'Suvro Mollick')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) 
VALUES ('favicon_url', '')
ON CONFLICT (key) DO NOTHING;

