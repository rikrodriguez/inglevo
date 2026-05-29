create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

alter table if exists public.profiles enable row level security;
alter table if exists public.practice_sessions enable row level security;
alter table if exists public.subscriptions enable row level security;
alter table if exists public.templates enable row level security;
alter table if exists public.setup_checks enable row level security;
alter table if exists public.writing_assessments enable row level security;
alter table if exists public.remote_job_assets enable row level security;
alter table if exists public.job_assets enable row level security;
alter table if exists public.readiness_assessments enable row level security;
alter table if exists public.internal_events enable row level security;

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

drop policy if exists "Users can read their own writing assessments" on public.writing_assessments;
create policy "Users can read their own writing assessments"
  on public.writing_assessments for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own writing assessments" on public.writing_assessments;
create policy "Users can insert their own writing assessments"
  on public.writing_assessments for insert
  with check (auth.uid() = user_id);

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

drop policy if exists "Users can read their own readiness assessments" on public.readiness_assessments;
create policy "Users can read their own readiness assessments"
  on public.readiness_assessments for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own readiness assessments" on public.readiness_assessments;
create policy "Users can insert their own readiness assessments"
  on public.readiness_assessments for insert
  with check (auth.uid() = user_id);

revoke all on table public.internal_events from anon, authenticated;
