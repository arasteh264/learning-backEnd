create type user_role as enum ('ADMIN', 'USER',"TEACHER");

create table users (
  id uuid default gen_random_uuid() primary key,

  username text not null unique,

  name text not null,

  email text not null unique,

  password text not null,

  phone text not null unique,

  role user_role not null default 'USER',

  ban_status boolean not null default false,

  created_at timestamp default now(),
  updated_at timestamp default now()
);