create table courses (
  id uuid default gen_random_uuid() primary key,

  name text not null,

  description text not null,

  cover text not null,

  support text not null,

  href text not null unique,

  price integer not null,

  status text not null,

  discount integer not null default 0,
category_id uuid not null references categories(id) on delete restrict,
creator_id uuid not null references teachers(id) on delete restrict,

  created_at timestamp default now(),
  updated_at timestamp default now()
);