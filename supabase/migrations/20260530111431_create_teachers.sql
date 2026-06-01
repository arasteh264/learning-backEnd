create table teachers (
  id uuid default gen_random_uuid() primary key,

  user_id uuid not null unique references users(id) on delete cascade,

  bio text default '',

  expertise text[] default '{}',

  rating numeric default 0,

  is_verified boolean default false,

  created_at timestamp default now(),
  updated_at timestamp default now()
);