-- ============================================================
-- ML Career Hub — Supabase Schema
-- Run this entire file in: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- Enable UUID extension (already enabled by default on Supabase)
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- Auto-created when a user signs up via trigger below
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  email       text,
  avatar_url  text,
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- TOPICS (Syllabus tracker)
-- ============================================================
create table public.topics (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  name        text not null,
  course_id   text not null,
  course_name text not null,
  status      text not null default 'not_started'
                check (status in ('not_started','in_progress','done')),
  notes       text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.topics enable row level security;

create policy "Users manage own topics"
  on public.topics for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index topics_user_id_idx on public.topics(user_id);
create index topics_course_id_idx on public.topics(course_id);
create index topics_status_idx on public.topics(status);

-- ============================================================
-- COMPANIES (Company tracker — 178 pre-loaded + custom)
-- ============================================================
create table public.companies (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references public.profiles(id) on delete cascade not null,
  name          text not null,
  tier          text not null default 'Custom',
  tier_number   integer,
  work_mode     text not null default 'Hybrid'
                  check (work_mode in ('Hybrid','Remote','WFO')),
  india_cities  text,
  salary_range  text,
  difficulty    text default 'Medium'
                  check (difficulty in ('Hard','Medium-Hard','Medium','Approachable')),
  roles         text,
  total_rounds  text,
  coding_rounds text,
  ml_rounds     text,
  sys_design    text,
  bq_rounds     text,
  take_home     boolean default false,
  timeline_weeks text,
  interview_tips text,
  careers_url   text,
  is_preset     boolean default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.companies enable row level security;

create policy "Users manage own companies"
  on public.companies for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index companies_user_id_idx on public.companies(user_id);
create index companies_tier_idx on public.companies(tier);
create index companies_work_mode_idx on public.companies(work_mode);

-- ============================================================
-- APPLICATIONS (Job application Kanban)
-- ============================================================
create table public.applications (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references public.profiles(id) on delete cascade not null,
  company_name  text not null,
  role          text not null,
  status        text not null default 'watchlist'
                  check (status in ('watchlist','applied','interviewing','offered','rejected')),
  applied_date  date,
  interview_round integer default 0,
  notes         text,
  job_url       text,
  salary_offered text,
  tier          text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.applications enable row level security;

create policy "Users manage own applications"
  on public.applications for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index applications_user_id_idx on public.applications(user_id);
create index applications_status_idx on public.applications(status);

-- ============================================================
-- GOALS (Daily goals)
-- ============================================================
create table public.goals (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  text        text not null,
  category    text default 'General',
  done        boolean default false,
  goal_date   date not null default current_date,
  created_at  timestamptz default now()
);

alter table public.goals enable row level security;

create policy "Users manage own goals"
  on public.goals for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index goals_user_id_date_idx on public.goals(user_id, goal_date);

-- ============================================================
-- STREAK LOG (Study streak heatmap)
-- ============================================================
create table public.streak_log (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  log_date    date not null default current_date,
  created_at  timestamptz default now(),
  unique(user_id, log_date)
);

alter table public.streak_log enable row level security;

create policy "Users manage own streak"
  on public.streak_log for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index streak_user_date_idx on public.streak_log(user_id, log_date);

-- ============================================================
-- NOTES
-- ============================================================
create table public.notes (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  title       text not null default 'Untitled',
  body        text,
  tags        text[] default '{}',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.notes enable row level security;

create policy "Users manage own notes"
  on public.notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index notes_user_id_idx on public.notes(user_id);

-- ============================================================
-- GOAL CATEGORIES (per user, customizable)
-- ============================================================
create table public.goal_categories (
  id        uuid primary key default uuid_generate_v4(),
  user_id   uuid references public.profiles(id) on delete cascade not null,
  name      text not null,
  color     text default '#888',
  created_at timestamptz default now(),
  unique(user_id, name)
);

alter table public.goal_categories enable row level security;

create policy "Users manage own categories"
  on public.goal_categories for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- UPDATED_AT triggers (auto-update timestamps)
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger topics_updated_at
  before update on public.topics
  for each row execute procedure public.set_updated_at();

create trigger companies_updated_at
  before update on public.companies
  for each row execute procedure public.set_updated_at();

create trigger applications_updated_at
  before update on public.applications
  for each row execute procedure public.set_updated_at();

create trigger notes_updated_at
  before update on public.notes
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- Done! Check tables were created:
-- select table_name from information_schema.tables
-- where table_schema = 'public' order by table_name;
-- ============================================================
