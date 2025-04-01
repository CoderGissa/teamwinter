-- Drop existing table if it exists
DROP TABLE IF EXISTS public.players;

-- Create players table
CREATE TABLE public.players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_name text NOT NULL,
  townhall_level integer NOT NULL,
  previous_league text NOT NULL,
  previous_stars integer NOT NULL,
  previous_percentage integer NOT NULL,
  comments text,
  confirmed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can create players"
  ON players
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read players"
  ON players
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin users can update players"
  ON players
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can delete players"
  ON players
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS players_user_id_idx ON players(user_id);
CREATE INDEX IF NOT EXISTS players_created_at_idx ON players(created_at);

-- Insert sample data
INSERT INTO public.players (account_name, townhall_level, previous_league, previous_stars, previous_percentage)
VALUES 
  ('TW Gissa', 17, 'Champion 1', 21, 700),
  ('TW Mootje', 17, 'Champion 1', 20, 680),
  ('TW Rens', 17, 'Champion 1', 18, 650),
  ('TW Henk', 17, 'Champion 1', 19, 670),
  ('TW Piet', 17, 'Champion 1', 19, 665);