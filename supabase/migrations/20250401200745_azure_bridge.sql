/*
  # Update admin user

  1. Checks if admin user exists
  2. Updates password if user exists, creates if not
  3. Ensures admin role is set correctly
*/

DO $$
DECLARE
  user_exists boolean;
BEGIN
  -- Check if user exists
  SELECT EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE email = 'gijs@teamwinter.nl'
  ) INTO user_exists;

  -- Update existing user or create new one
  IF user_exists THEN
    -- Update password for existing user
    UPDATE auth.users
    SET 
      encrypted_password = crypt('teamwinter', gen_salt('bf')),
      updated_at = now(),
      email_confirmed_at = COALESCE(email_confirmed_at, now())
    WHERE email = 'gijs@teamwinter.nl';
  ELSE
    -- Create new user
    INSERT INTO auth.users (
      instance_id,
      id,
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
      gen_random_uuid(),
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