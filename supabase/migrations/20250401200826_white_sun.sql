/*
  # Set up authentication schema and policies

  1. Enable auth schema extensions
  2. Create necessary auth policies
  3. Ensure proper role setup
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Ensure proper auth settings
ALTER ROLE authenticated SET search_path = public, auth;
ALTER ROLE anon SET search_path = public, auth;
ALTER ROLE service_role SET search_path = public, auth;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO authenticated;

-- Create auth policies
DO $$
BEGIN
  -- Ensure the auth user can manage their own data
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'auth' 
    AND tablename = 'users' 
    AND policyname = 'Users can manage own data'
  ) THEN
    CREATE POLICY "Users can manage own data" 
    ON auth.users 
    FOR ALL 
    TO authenticated 
    USING (auth.uid() = id);
  END IF;
END $$;