create table transactions (
  id uuid default gen_random_uuid() primary key,
  order_id uuid not null references orders(id) on delete no action,
  user_id uuid not null references users(id) on delete no action,
  amount integer not null,
  status text not null default 'pending',
  authority text unique,
  ref_id text,
  gateway text not null default 'zarinpal',
  created_at timestamp default now(),
  updated_at timestamp default now()
);