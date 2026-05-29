create extension if not exists "pgcrypto";

create type public.english_level as enum ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');
create type public.subscription_plan as enum ('free', 'pro');
create type public.subscription_status as enum (
  'inactive',
  'trialing',
  'active',
  'past_due',
  'canceled'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  english_level public.english_level,
  role text,
  main_goal text,
  biggest_blocker text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  scenario text not null,
  question text not null,
  user_answer text not null,
  improved_answer text,
  overall_score integer check (overall_score between 0 and 100),
  clarity integer check (clarity between 0 and 100),
  grammar integer check (grammar between 0 and 100),
  professional_tone integer check (professional_tone between 0 and 100),
  structure integer check (structure between 0 and 100),
  opportunity_readiness integer check (opportunity_readiness between 0 and 100),
  feedback_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.templates (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  use_case text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  plan public.subscription_plan not null default 'free',
  status public.subscription_status not null default 'inactive',
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  created_at timestamptz not null default now()
);

create index practice_sessions_user_id_created_at_idx
  on public.practice_sessions(user_id, created_at desc);

create index templates_category_idx
  on public.templates(category);

alter table public.profiles enable row level security;
alter table public.practice_sessions enable row level security;
alter table public.templates enable row level security;
alter table public.subscriptions enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can read their own practice sessions"
  on public.practice_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own practice sessions"
  on public.practice_sessions for insert
  with check (auth.uid() = user_id);

create policy "Templates are public readable"
  on public.templates for select
  using (true);

create policy "Subscriptions are readable only by owner"
  on public.subscriptions for select
  using (auth.uid() = user_id);
