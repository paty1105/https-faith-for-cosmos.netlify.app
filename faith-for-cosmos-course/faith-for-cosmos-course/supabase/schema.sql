-- Faith for the Cosmos: course progress schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)

-- Profiles table: one row per enrolled pastor, extends Supabase's built-in auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  church_name text,
  denomination text,
  created_at timestamptz default now()
);

-- Progress table: one row per completed module per user
create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_number int not null check (module_number between 1 and 4),
  completed_at timestamptz default now(),
  unique (user_id, module_number)
);

-- Row Level Security: users can only ever see/edit their own rows
alter table public.profiles enable row level security;
alter table public.progress enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can view their own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

-- Auto-create a profile row the moment someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
