create table cart_items (
  id uuid default gen_random_uuid() primary key,
  cart_id uuid not null references carts(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  created_at timestamp default now(),
  unique(cart_id, course_id)
);
