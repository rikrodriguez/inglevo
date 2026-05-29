create table if not exists public.job_assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (
    type in (
      'recruiter_message',
      'linkedin_headline',
      'linkedin_about',
      'resume_bullet',
      'follow_up_email',
      'salary_script',
      'interview_answer'
    )
  ),
  title text not null,
  content text not null,
  source_session_id uuid references public.practice_sessions(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists job_assets_user_id_created_at_idx
  on public.job_assets(user_id, created_at desc);

create index if not exists job_assets_user_id_type_idx
  on public.job_assets(user_id, type);

alter table public.job_assets enable row level security;

drop policy if exists "Users can read their own job assets" on public.job_assets;
create policy "Users can read their own job assets"
  on public.job_assets for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own job assets" on public.job_assets;
create policy "Users can insert their own job assets"
  on public.job_assets for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own job assets" on public.job_assets;
create policy "Users can update their own job assets"
  on public.job_assets for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own job assets" on public.job_assets;
create policy "Users can delete their own job assets"
  on public.job_assets for delete
  using (auth.uid() = user_id);

drop trigger if exists job_assets_set_updated_at on public.job_assets;
create trigger job_assets_set_updated_at
  before update on public.job_assets
  for each row execute function public.set_updated_at();
