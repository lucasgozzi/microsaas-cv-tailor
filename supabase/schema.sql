-- Users who signed in via Google OAuth
create table if not exists users (
  id            uuid        default gen_random_uuid() primary key,
  email         text        unique not null,
  name          text,
  avatar_url    text,
  first_seen_at timestamptz default now(),
  last_seen_at  timestamptz default now()
);

-- One row per CV generation
create table if not exists cv_generations (
  id             uuid        default gen_random_uuid() primary key,
  user_email     text        not null references users(email) on delete cascade,
  target_country text        not null,
  language       text        not null,
  match_score    integer,
  created_at     timestamptz default now()
);

-- Satisfaction survey responses
create table if not exists feedback (
  id         uuid        default gen_random_uuid() primary key,
  user_email text        references users(email) on delete set null,
  rating     integer     not null check (rating between 1 and 4),
  comment    text,
  created_at timestamptz default now()
);

-- Useful views
create or replace view user_activity as
select
  u.email,
  u.name,
  u.first_seen_at,
  u.last_seen_at,
  count(distinct g.id)          as total_generations,
  max(g.created_at)             as last_generation_at,
  bool_or(g.id is not null)     as has_generated
from users u
left join cv_generations g on g.user_email = u.email
group by u.email, u.name, u.first_seen_at, u.last_seen_at;
