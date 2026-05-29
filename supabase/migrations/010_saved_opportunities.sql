create table if not exists public.saved_opportunities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id text not null,
  status text not null default 'saved' check (status in ('saved', 'preparing', 'applied')),
  created_at timestamptz not null default now(),
  unique(user_id, opportunity_id)
);

create index if not exists saved_opportunities_user_id_created_at_idx
  on public.saved_opportunities(user_id, created_at desc);

alter table public.saved_opportunities enable row level security;

drop policy if exists "Users can read their own saved opportunities" on public.saved_opportunities;
create policy "Users can read their own saved opportunities"
  on public.saved_opportunities for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own saved opportunities" on public.saved_opportunities;
create policy "Users can insert their own saved opportunities"
  on public.saved_opportunities for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own saved opportunities" on public.saved_opportunities;
create policy "Users can update their own saved opportunities"
  on public.saved_opportunities for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own saved opportunities" on public.saved_opportunities;
create policy "Users can delete their own saved opportunities"
  on public.saved_opportunities for delete
  using (auth.uid() = user_id);
