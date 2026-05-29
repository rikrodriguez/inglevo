create table if not exists public.readiness_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment_type text not null,
  score integer not null check (score >= 0 and score <= 100),
  area_scores jsonb not null default '{}'::jsonb,
  feedback_json jsonb not null default '{}'::jsonb,
  status text not null default 'completed' check (
    status in ('completed', 'partial', 'failed')
  ),
  created_at timestamptz not null default now()
);

create index if not exists readiness_assessments_user_id_created_at_idx
  on public.readiness_assessments(user_id, created_at desc);

create index if not exists readiness_assessments_user_id_type_idx
  on public.readiness_assessments(user_id, assessment_type);

alter table public.readiness_assessments enable row level security;

drop policy if exists "Users can read their own readiness assessments" on public.readiness_assessments;
create policy "Users can read their own readiness assessments"
  on public.readiness_assessments for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own readiness assessments" on public.readiness_assessments;
create policy "Users can insert their own readiness assessments"
  on public.readiness_assessments for insert
  with check (auth.uid() = user_id);
