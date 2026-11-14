-- Salon client list used by the admin panel (/api/admin-clients).
-- Run once in the Supabase SQL editor. Client data itself is never committed
-- to this repo; import it from a local, gitignored *.private.sql file.

create extension if not exists pgcrypto;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_phone_idx on public.clients (phone);
create index if not exists clients_email_idx on public.clients (lower(email));

-- Only the server (service role) may read or write clients. With RLS on and
-- no policies, the public anon key cannot see anyone's details.
alter table public.clients enable row level security;
