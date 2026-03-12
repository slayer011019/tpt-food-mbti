-- TPT declarative schema for Supabase
-- Docs reference: https://supabase.com/docs/guides/local-development/declarative-database-schemas

create extension "pgcrypto";

create table "public"."tpt_type_catalog" (
  "type_code" char(5) primary key,
  "title" text not null,
  "description" text not null,
  "recommended_foods" text[] not null default '{}'::text[],
  "is_active" boolean not null default true,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now(),
  constraint "tpt_type_catalog_type_code_len" check (char_length(type_code) = 5)
);

create table "public"."tpt_test_runs" (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid references auth.users(id) on delete set null,
  "status" text not null default 'in_progress',
  "flow" text not null default 'basic',
  "base_type_code" char(5),
  "detail_type_code" char(5),
  "source" text,
  "started_at" timestamptz not null default now(),
  "completed_at" timestamptz,
  "metadata" jsonb not null default '{}'::jsonb,
  constraint "tpt_test_runs_status_check" check (status in ('in_progress', 'completed', 'abandoned')),
  constraint "tpt_test_runs_flow_check" check (flow in ('basic', 'detail')),
  constraint "tpt_test_runs_base_type_len" check (base_type_code is null or char_length(base_type_code) = 5),
  constraint "tpt_test_runs_detail_type_len" check (detail_type_code is null or char_length(detail_type_code) = 5)
);

create table "public"."tpt_test_answers" (
  "run_id" uuid not null references public.tpt_test_runs(id) on delete cascade,
  "question_index" smallint not null,
  "question_set" text not null,
  "dimension" char(2) not null,
  "is_reverse" boolean not null default false,
  "answer_value" smallint not null,
  "answered_at" timestamptz not null default now(),
  primary key (run_id, question_index),
  constraint "tpt_test_answers_question_set_check" check (question_set in ('basic', 'detail')),
  constraint "tpt_test_answers_dimension_check" check (dimension in ('TB', 'IP', 'CR', 'DS', 'MU')),
  constraint "tpt_test_answers_value_check" check (answer_value between 1 and 5),
  constraint "tpt_test_answers_index_check" check (question_index between 1 and 25)
);

create table "public"."tpt_dimension_scores" (
  "run_id" uuid not null references public.tpt_test_runs(id) on delete cascade,
  "dimension" char(2) not null,
  "avg_score" numeric(4,2) not null,
  "rank" text not null,
  "level" smallint not null,
  "letter" char(1) not null,
  "label" text not null,
  "computed_at" timestamptz not null default now(),
  primary key (run_id, dimension),
  constraint "tpt_dimension_scores_dimension_check" check (dimension in ('TB', 'IP', 'CR', 'DS', 'MU')),
  constraint "tpt_dimension_scores_avg_check" check (avg_score between 1 and 5),
  constraint "tpt_dimension_scores_rank_check" check (rank in ('LOW', 'MID', 'HIGH')),
  constraint "tpt_dimension_scores_level_check" check (level between 1 and 5)
);

create index "tpt_test_runs_user_id_idx" on "public"."tpt_test_runs" ("user_id");
create index "tpt_test_runs_started_at_idx" on "public"."tpt_test_runs" ("started_at" desc);
create index "tpt_test_runs_status_idx" on "public"."tpt_test_runs" ("status");
create index "tpt_test_answers_dimension_idx" on "public"."tpt_test_answers" ("dimension");

alter table "public"."tpt_test_runs" enable row level security;
alter table "public"."tpt_test_answers" enable row level security;
alter table "public"."tpt_dimension_scores" enable row level security;

create policy "runs_select_own"
  on "public"."tpt_test_runs"
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "runs_insert_own"
  on "public"."tpt_test_runs"
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "runs_update_own"
  on "public"."tpt_test_runs"
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "answers_rw_own"
  on "public"."tpt_test_answers"
  for all
  to authenticated
  using (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_test_answers.run_id
      and r.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_test_answers.run_id
      and r.user_id = auth.uid()
    )
  );

create policy "scores_rw_own"
  on "public"."tpt_dimension_scores"
  for all
  to authenticated
  using (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_dimension_scores.run_id
      and r.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_dimension_scores.run_id
      and r.user_id = auth.uid()
    )
  );

-- Read-only catalog access
grant select on "public"."tpt_type_catalog" to anon, authenticated;
