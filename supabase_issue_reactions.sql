-- Anonymous public emoji reactions for the POE2 issue board.
-- Run this in Supabase SQL Editor, then set these Vercel env vars:
--   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
--   VITE_SUPABASE_ANON_KEY=<anon public key>

create table if not exists public.issue_reaction_totals (
  issue_id text not null,
  emoji text not null,
  count integer not null default 0 check (count >= 0),
  updated_at timestamptz not null default now(),
  primary key (issue_id, emoji),
  constraint issue_reaction_totals_allowed_emoji check (emoji in ('👍', '👀', '😂', '😮', '🔥', '💀'))
);

create table if not exists public.issue_reaction_votes (
  id bigint generated always as identity primary key,
  issue_id text not null,
  emoji text not null,
  anon_id text not null,
  created_at timestamptz not null default now(),
  constraint issue_reaction_votes_allowed_emoji check (emoji in ('👍', '👀', '😂', '😮', '🔥', '💀')),
  constraint issue_reaction_votes_unique_browser_reaction unique (issue_id, emoji, anon_id)
);

create index if not exists issue_reaction_votes_issue_emoji_idx
  on public.issue_reaction_votes (issue_id, emoji);

create or replace function public.increment_issue_reaction_total()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.issue_reaction_totals (issue_id, emoji, count, updated_at)
  values (new.issue_id, new.emoji, 1, now())
  on conflict (issue_id, emoji)
  do update set
    count = public.issue_reaction_totals.count + 1,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists issue_reaction_votes_after_insert on public.issue_reaction_votes;
create trigger issue_reaction_votes_after_insert
after insert on public.issue_reaction_votes
for each row execute function public.increment_issue_reaction_total();

alter table public.issue_reaction_totals enable row level security;
alter table public.issue_reaction_votes enable row level security;

drop policy if exists "Anyone can read issue reaction totals" on public.issue_reaction_totals;
create policy "Anyone can read issue reaction totals"
on public.issue_reaction_totals
for select
to anon
using (true);

drop policy if exists "Anonymous visitors can insert issue reactions" on public.issue_reaction_votes;
create policy "Anonymous visitors can insert issue reactions"
on public.issue_reaction_votes
for insert
to anon
with check (
  issue_id <> ''
  and anon_id <> ''
  and length(issue_id) <= 160
  and length(anon_id) <= 120
  and emoji in ('👍', '👀', '😂', '😮', '🔥', '💀')
);

-- Do not add a SELECT policy for issue_reaction_votes. The public app only needs totals.
