/*
  # Set up admin authentication policies

  1. Security
    - Enable RLS on auth.users
    - Add policy for admin access
*/

-- Create policy to identify admin users
CREATE POLICY "Allow admin access"
ON auth.users
FOR SELECT
TO authenticated
USING (email = 'gijs@teamwinter.nl');

-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;