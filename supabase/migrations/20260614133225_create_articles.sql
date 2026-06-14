create table articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  summary text,
  content text not null,
  cover text,
  category_id uuid references categories(id) on delete set null,
  author_id uuid references teachers(id) on delete set null,
  status text not null default 'draft',
  views integer not null default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);