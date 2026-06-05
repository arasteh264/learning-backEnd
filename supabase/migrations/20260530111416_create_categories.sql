create table categories (
  id uuid default gen_random_uuid() primary key,

  title text not null,
  href text not null unique,

  created_at timestamp default now(),
  updated_at timestamp default now()
);