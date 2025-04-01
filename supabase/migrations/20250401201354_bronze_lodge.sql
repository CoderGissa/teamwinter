/*
  # CWL Enrollment Schema

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `account_name` (text)
      - `townhall_level` (integer)
      - `previous_league` (text)
      - `previous_stars` (integer)
      - `previous_percentage` (integer)
      - `comments` (text)
      - `confirmed` (boolean)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `players` table
    - Add policies for:
      - Anyone can create players
      - Authenticated users can read all players
      - Admin users can update and delete players
*/

-- Create players table
CREATE TABLE IF NOT EXISTS public.players (
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

CREATE POLICY "Authenticated users can read players"
  ON players
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can update players"
  ON players
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admin users can delete players"
  ON players
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS players_user_id_idx ON players(user_id);
CREATE INDEX IF NOT EXISTS players_created_at_idx ON players(created_at);