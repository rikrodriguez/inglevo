create table if not exists public.setup_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  stable_internet boolean not null default false,
  working_microphone boolean not null default false,
  can_join_video_calls boolean not null default false,
  quiet_place boolean not null default false,
  headphones_available boolean not null default false,
  timezone_overlap boolean not null default false,
  timezone text,
  microphone_status text,
  camera_status text,
  score integer not null default 0 check (score >= 0 and score <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists setup_checks_user_id_idx
  on public.setup_checks(user_id);

alter table public.setup_checks enable row level security;

drop policy if exists "Users can read their own setup check" on public.setup_checks;
create policy "Users can read their own setup check"
  on public.setup_checks for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own setup check" on public.setup_checks;
create policy "Users can insert their own setup check"
  on public.setup_checks for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own setup check" on public.setup_checks;
create policy "Users can update their own setup check"
  on public.setup_checks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop trigger if exists setup_checks_set_updated_at on public.setup_checks;
create trigger setup_checks_set_updated_at
  before update on public.setup_checks
  for each row execute function public.set_updated_at();
