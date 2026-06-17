create table carts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  unique(user_id)
);