create table orders (
  id uuid default gen_random_uuid() primary key,
  userId uuid not null references users(id) on delete no action,
  total_price integer not null default 0,
  status text not null default 'pending',
  created_at timestamp default now(),
  updated_at timestamp default now()
);
