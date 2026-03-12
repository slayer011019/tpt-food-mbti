-- Enable and manage RLS policies for existing public tables.
-- Safe to re-run (drops/recreates policies).

begin;

-- 0) Ensure RLS is enabled on all current public base tables.
do $$
declare
  t record;
begin
  for t in
    select tablename
    from pg_tables
    where schemaname = 'public'
  loop
    execute format('alter table public.%I enable row level security', t.tablename);
  end loop;
end $$;

-- 1) tpt_type_catalog: public read-only
drop policy if exists "type_catalog_select_public" on public.tpt_type_catalog;
create policy "type_catalog_select_public"
  on public.tpt_type_catalog
  for select
  to anon, authenticated
  using (true);

-- 2) tpt_test_runs: authenticated user can CRUD only own rows
drop policy if exists "runs_select_own" on public.tpt_test_runs;
create policy "runs_select_own"
  on public.tpt_test_runs
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "runs_insert_own" on public.tpt_test_runs;
create policy "runs_insert_own"
  on public.tpt_test_runs
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "runs_update_own" on public.tpt_test_runs;
create policy "runs_update_own"
  on public.tpt_test_runs
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "runs_delete_own" on public.tpt_test_runs;
create policy "runs_delete_own"
  on public.tpt_test_runs
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- 3) tpt_test_answers: only if parent run belongs to current user
drop policy if exists "answers_select_own" on public.tpt_test_answers;
create policy "answers_select_own"
  on public.tpt_test_answers
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_test_answers.run_id
      and r.user_id = auth.uid()
    )
  );

drop policy if exists "answers_insert_own" on public.tpt_test_answers;
create policy "answers_insert_own"
  on public.tpt_test_answers
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_test_answers.run_id
      and r.user_id = auth.uid()
    )
  );

drop policy if exists "answers_update_own" on public.tpt_test_answers;
create policy "answers_update_own"
  on public.tpt_test_answers
  for update
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

drop policy if exists "answers_delete_own" on public.tpt_test_answers;
create policy "answers_delete_own"
  on public.tpt_test_answers
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_test_answers.run_id
      and r.user_id = auth.uid()
    )
  );

-- 4) tpt_dimension_scores: only if parent run belongs to current user
drop policy if exists "scores_select_own" on public.tpt_dimension_scores;
create policy "scores_select_own"
  on public.tpt_dimension_scores
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_dimension_scores.run_id
      and r.user_id = auth.uid()
    )
  );

drop policy if exists "scores_insert_own" on public.tpt_dimension_scores;
create policy "scores_insert_own"
  on public.tpt_dimension_scores
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_dimension_scores.run_id
      and r.user_id = auth.uid()
    )
  );

drop policy if exists "scores_update_own" on public.tpt_dimension_scores;
create policy "scores_update_own"
  on public.tpt_dimension_scores
  for update
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

drop policy if exists "scores_delete_own" on public.tpt_dimension_scores;
create policy "scores_delete_own"
  on public.tpt_dimension_scores
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.tpt_test_runs r
      where r.id = tpt_dimension_scores.run_id
      and r.user_id = auth.uid()
    )
  );

commit;
