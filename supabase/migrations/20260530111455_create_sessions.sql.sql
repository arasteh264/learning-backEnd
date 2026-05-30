create table sessions (
  id uuid default gen_random_uuid() primary key,

  title text not null,

  time text not null,

  free boolean not null default false,

  video text not null,

  course_id uuid not null references courses(id) on delete cascade,

  created_at timestamp default now(),
  updated_at timestamp default now()
);