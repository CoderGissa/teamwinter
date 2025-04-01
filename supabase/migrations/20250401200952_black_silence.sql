/*
  # Complete authentication schema setup

  1. Create auth schema and tables
  2. Set up proper permissions
  3. Create necessary indexes
  4. Enable RLS
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.users (
  instance_id uuid,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  aud varchar(255),
  role varchar(255),
  email varchar(255) UNIQUE,
  encrypted_password varchar(255),
  email_confirmed_at timestamp with time zone,
  invited_at timestamp with time zone,
  confirmation_token varchar(255),
  confirmation_sent_at timestamp with time zone,
  recovery_token varchar(255),
  recovery_sent_at timestamp with time zone,
  email_change_token_new varchar(255),
  email_change_token_current varchar(255),
  email_change_confirm_status smallint DEFAULT 0,
  banned_until timestamp with time zone,
  raw_app_meta_data jsonb,
  raw_user_meta_data jsonb,
  is_super_admin boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  phone text UNIQUE DEFAULT NULL,
  phone_confirmed_at timestamp with time zone,
  phone_change text DEFAULT '',
  phone_change_token varchar(255) DEFAULT '',
  phone_change_sent_at timestamp with time zone,
  confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
  email_change text DEFAULT '',
  email_change_sent_at timestamp with time zone,
  last_sign_in_at timestamp with time zone,
  raw_confirmation_token text,
  raw_recovery_token text,
  raw_email_change_token text,
  raw_phone_change_token text,
  deleted_at timestamp with time zone,
  is_sso_user boolean DEFAULT false NOT NULL
);

-- Create necessary indexes
CREATE INDEX IF NOT EXISTS users_instance_id_email_idx ON auth.users (instance_id, email);
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users (instance_id);

-- Set up proper auth settings
ALTER ROLE authenticated SET search_path = public, auth;
ALTER ROLE anon SET search_path = public, auth;
ALTER ROLE service_role SET search_path = public, auth;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO authenticated;

-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create auth policies
DO $$
BEGIN
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

-- Create admin user if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'gijs@teamwinter.nl'
  ) THEN
    INSERT INTO auth.users (
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      email_change_token_current,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'gijs@teamwinter.nl',
      crypt('teamwinter', gen_salt('bf')),
      now(),
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;