create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  service text not null,
  message text not null,
  source text not null default 'luscious-lox',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
