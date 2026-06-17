create table order_items (
  id uuid default gen_random_uuid() primary key,
  orderId uuid not null references orders(id) on delete cascade,
  courseId uuid not null references courses(id) on delete no action,
  price integer not null,
  created_at timestamp default now()
);