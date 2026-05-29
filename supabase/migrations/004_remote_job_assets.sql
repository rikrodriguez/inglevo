create table if not exists public.remote_job_assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_type text not null check (
    asset_type in (
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
  input_context text not null,
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists remote_job_assets_user_id_created_at_idx
  on public.remote_job_assets(user_id, created_at desc);

create index if not exists remote_job_assets_user_id_asset_type_idx
  on public.remote_job_assets(user_id, asset_type);

alter table public.remote_job_assets enable row level security;

drop policy if exists "Users can read their own remote job assets" on public.remote_job_assets;
create policy "Users can read their own remote job assets"
  on public.remote_job_assets for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own remote job assets" on public.remote_job_assets;
create policy "Users can insert their own remote job assets"
  on public.remote_job_assets for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own remote job assets" on public.remote_job_assets;
create policy "Users can update their own remote job assets"
  on public.remote_job_assets for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own remote job assets" on public.remote_job_assets;
create policy "Users can delete their own remote job assets"
  on public.remote_job_assets for delete
  using (auth.uid() = user_id);

drop trigger if exists remote_job_assets_set_updated_at on public.remote_job_assets;
create trigger remote_job_assets_set_updated_at
  before update on public.remote_job_assets
  for each row execute function public.set_updated_at();
