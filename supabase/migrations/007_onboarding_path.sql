alter table public.profiles
  add column if not exists target_salary text,
  add column if not exists applying_remote_jobs text,
  add column if not exists recommended_path text check (
    recommended_path in ('Improve English', 'Remote Jobs', 'My Readiness')
  );
