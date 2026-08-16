create table otp_codes (
  id uuid primary key default gen_random_uuid(),
  identifier text not null,
  channel text not null check (channel in ('sms', 'email')),
  purpose text not null check (purpose in ('login', 'reset_password')),
  code_hash text not null,
  attempts int not null default 0,
  consumed boolean not null default false,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index idx_otp_lookup on otp_codes (identifier, purpose, consumed);