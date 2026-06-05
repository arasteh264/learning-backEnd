create table comments (
  id uuid default gen_random_uuid() primary key,

  body text not null,

  creator_id uuid not null references users(id),

  is_accept boolean not null default false,

  course_id uuid not null references courses(id) on delete cascade,

  score integer not null check (score >= 0 and score <= 5),

  is_answer boolean not null default false,

  main_comment_id uuid references comments(id) on delete cascade,

  created_at timestamp default now(),
  updated_at timestamp default now()
);