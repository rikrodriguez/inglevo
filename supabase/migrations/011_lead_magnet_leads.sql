create table if not exists public.lead_magnet_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  lead_magnet text not null check (
    lead_magnet in (
      'remote-interview-english-cheat-sheet',
      'latam-remote-job-cv-checklist'
    )
  ),
  role text,
  source_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email, lead_magnet)
);

create index if not exists lead_magnet_leads_created_at_idx
  on public.lead_magnet_leads(created_at desc);

create index if not exists lead_magnet_leads_magnet_created_at_idx
  on public.lead_magnet_leads(lead_magnet, created_at desc);

create index if not exists lead_magnet_leads_source_created_at_idx
  on public.lead_magnet_leads(source_path, created_at desc);

drop trigger if exists lead_magnet_leads_set_updated_at on public.lead_magnet_leads;
create trigger lead_magnet_leads_set_updated_at
  before update on public.lead_magnet_leads
  for each row
  execute function public.set_updated_at();

alter table public.lead_magnet_leads enable row level security;

revoke all on table public.lead_magnet_leads from anon, authenticated;
