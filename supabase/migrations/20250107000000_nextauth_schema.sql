--
-- NextAuth.js Schema for Supabase
-- This migration creates the required tables for NextAuth.js to work with Supabase
--

-- Create next_auth schema
CREATE SCHEMA IF NOT EXISTS next_auth;

-- Grant permissions on schema
GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL ON SCHEMA next_auth TO postgres;

-- Create users table
CREATE TABLE IF NOT EXISTS next_auth.users (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);

-- Grant permissions on users table
GRANT ALL ON TABLE next_auth.users TO postgres;
GRANT ALL ON TABLE next_auth.users TO service_role;

-- Create uid() function for RLS policies
CREATE OR REPLACE FUNCTION next_auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$$;

-- Create sessions table
CREATE TABLE IF NOT EXISTS next_auth.sessions (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    expires timestamp with time zone NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Grant permissions on sessions table
GRANT ALL ON TABLE next_auth.sessions TO postgres;
GRANT ALL ON TABLE next_auth.sessions TO service_role;

-- Create accounts table
CREATE TABLE IF NOT EXISTS next_auth.accounts (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    "userId" uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Grant permissions on accounts table
GRANT ALL ON TABLE next_auth.accounts TO postgres;
GRANT ALL ON TABLE next_auth.accounts TO service_role;

-- Create verification_tok
ens table
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
    identifier text,
    token text,
    expires timestamp with time zone NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)
);

-- Grant permissions on verification_tokens table
GRANT ALL ON TABLE next_auth.verification_tokens TO postgres;
GRANT ALL ON TABLE next_auth.verification_tokens TO service_role;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sessions_userId ON next_auth.sessions("userId");
CREATE INDEX IF NOT EXISTS idx_accounts_userId ON next_auth.accounts("userId");
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON next_auth.accounts(provider, "providerAccountId");