create table banned_users (
  id uuid default gen_random_uuid() primary key,

  phone text not null,

  created_at timestamp default now(),
  updated_at timestamp default now()
);