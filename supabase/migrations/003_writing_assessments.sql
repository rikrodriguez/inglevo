create table if not exists public.writing_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment_type text not null check (
    assessment_type in ('slack_update', 'blocker_explanation', 'meeting_follow_up')
  ),
  prompt text not null,
  user_message text not null,
  improved_message text,
  overall_score integer check (overall_score >= 0 and overall_score <= 100),
  clarity integer check (clarity >= 0 and clarity <= 100),
  tone integer check (tone >= 0 and tone <= 100),
  concision integer check (concision >= 0 and concision <= 100),
  ownership integer check (ownership >= 0 and ownership <= 100),
  actionability integer check (actionability >= 0 and actionability <= 100),
  feedback_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists writing_assessments_user_id_created_at_idx
  on public.writing_assessments(user_id, created_at desc);

alter table public.writing_assessments enable row level security;

drop policy if exists "Users can read their own writing assessments" on public.writing_assessments;
create policy "Users can read their own writing assessments"
  on public.writing_assessments for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own writing assessments" on public.writing_assessments;
create policy "Users can insert their own writing assessments"
  on public.writing_assessments for insert
  with check (auth.uid() = user_id);
