create table enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  order_id uuid references orders(id) on delete set null,
  created_at timestamp default now(),
  unique(user_id, course_id)
);