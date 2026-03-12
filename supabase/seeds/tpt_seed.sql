-- TPT seed data for Supabase CLI
-- Run: supabase db execute --file supabase/seeds/tpt_seed.sql
-- Or add this path in supabase/config.toml seed.sql_paths and run supabase db reset

begin;

-- 1) Type catalog (32 MBTI-like taste types)
insert into public.tpt_type_catalog (
  type_code,
  title,
  description,
  recommended_foods,
  is_active
)
values
  ('BICDM', '소프트 실험가', '낯선 음식에도 신중히 접근하지만 새로운 미식에 대한 탐구를 멈추지 않는 사람입니다.', ARRAY['에스닉 카레', '새로운 콘셉트 카페', '이색 조합 디저트']::text[], true),
  ('BICDU', '소프트 실속러', '계획은 하지만 때때로 실용적인 모험을 즐기며 입맛의 효율성을 중시하는 타입입니다.', ARRAY['푸드트럭', '현지인 맛집', '가성비 메뉴']::text[], true),
  ('BICSM', '섬세 감성러', '미묘한 맛의 차이를 느끼는 섬세함과 감성적인 분위기를 함께 추구하는 당신.', ARRAY['티 소믈리에 코스', '다채로운 퓨전 디저트', '플레이트 카페']::text[], true),
  ('BICSU', '소프트 무드러', '자극보다는 부드러운 맛을 선호하며, 감성적이고 안정적인 공간에서 식사하는 것을 즐깁니다.', ARRAY['오믈렛', '플레인 팬케이크', '하몽 샌드위치']::text[], true),
  ('BIRDM', '정통 모험가', '전통적인 맛을 중시하면서도 새로운 조합이나 재료에 도전하는 탐색형 입맛입니다.', ARRAY['매콤 순대볶음', '김치 수플레', '된장 크림 파스타']::text[], true),
  ('BIRDU', '중립 실용러', '과하지 않은 자극과 전통적인 조합, 그리고 실용성까지 조화롭게 고려하는 입맛입니다.', ARRAY['분식집 김밥', '냉모밀', '두부 덮밥']::text[], true),
  ('BIRSM', '잔잔 감성러', '부드럽고 전통적인 음식에서 감성적 안정감을 느끼며, 조용한 맛을 좋아하는 타입입니다.', ARRAY['연잎밥', '우엉조림', '홍시 샐러드']::text[], true),
  ('BIRSU', '포근 한끼러', '실용적이고 부드러운 맛에 익숙한 타입으로, 위로가 되는 식사를 추구합니다.', ARRAY['카레라이스', '계란찜', '두부조림']::text[], true),
  ('BPCDM', '트렌드 기획러', '부드러운 맛을 선호하지만 트렌디하고 감각적인 식사 경험을 계획하며 추구합니다.', ARRAY['노포 브런치', '샌드위치 카페', '플랜테리어 맛집']::text[], true),
  ('BPCDU', '실용 플래너', '실용적인 구성과 부드러운 맛 조합을 중심으로 식사를 기획하고 관리하는 타입입니다.', ARRAY['밀프렙 식단', '홈쿡 가정식', '헬시 도시락']::text[], true),
  ('BPCSM', '따뜻 감성러', '감성을 담은 부드러운 맛을 계획적으로 즐기며, 실속 있는 메뉴 구성이 좋습니다.', ARRAY['토마토 수프', '치킨 크림 스튜', '햄에그 토스트']::text[], true),
  ('BPCSU', '포근 일상러', '꾸밈없고 실용적인 식사에서 따뜻함과 안정감을 추구하는, 일상 중심의 입맛입니다.', ARRAY['카페 오트라떼', '잉글리시 머핀', '미역국']::text[], true),
  ('BPRDM', '집밥 러버', '가정식 중심의 실용적 식사를 선호하며, 익숙한 맛에서 편안함을 느낍니다.', ARRAY['오이냉국', '계란말이', '멸치볶음']::text[], true),
  ('BPRDU', '평온 실용러', '튀지 않지만 따뜻하고 실용적인 한 끼를 중요하게 생각하는 타입입니다.', ARRAY['콩나물국밥', '오트밀', '계란국']::text[], true),
  ('BPRSM', '감성 홈쿡러', '집에서 스스로 꾸미는 식사에 감성을 담고자 하며, 안정적인 맛의 구성을 좋아합니다.', ARRAY['팬케이크', '미트볼 파스타', '로제 리조또']::text[], true),
  ('BPRSU', '클래식 변주러', '전통적인 스타일 속에서도 감성적이거나 약간의 자극을 추가한 독특한 맛을 탐험합니다.', ARRAY['트러플 감자튀김', '청양 소스 피자', '감자 그라탱']::text[], true),
  ('TICDM', '핫미식 탐험가', '강렬한 자극을 추구하며 직관적으로 새로운 맛을 탐험하는 당신, 감성 넘치는 공간에서 특별한 미식을 경험하는 것을 좋아합니다.', ARRAY['수제 스테이크', '트러플 파스타', '풍미 가득한 양념 갈비']::text[], true),
  ('TICDU', '핫실속러', '새로운 음식에 대한 호기심이 많지만, 효율과 실용성을 중시해 빠르고 확실한 맛의 만족을 추구합니다.', ARRAY['편의점 꿀조합', '퀵 분식', '패스트 캐주얼 레스토랑']::text[], true),
  ('TICSM', '매콤 감성러', '매운맛의 강렬한 자극 속에서 예쁘고 감성적인 플레이팅과 분위기까지 함께 즐기는 미식가입니다.', ARRAY['마라샹궈', '불닭 파스타', '고추장 로제떡볶이']::text[], true),
  ('TICSU', '트렌드 스윗러', 'SNS 속 예쁜 비주얼과 트렌디한 맛을 찾아다니며, 실패 없는 디저트와 실용성을 추구합니다.', ARRAY['크로플', '말차 라떼', '크림브륄레']::text[], true),
  ('TIRDM', '퓨전 러버', '전통에 머무르지 않고 도전적인 조합과 이국적인 감성을 즐기는 미식 탐험가입니다.', ARRAY['김치 타코', '크림 마라 떡볶이', '퓨전 초밥']::text[], true),
  ('TIRDU', '월드 미식러', '음식의 국경을 넘나들며 지역적, 문화적 경계를 뛰어넘는 자유롭고 실용적인 미식을 추구합니다.', ARRAY['타파스', '케밥', '세계 길거리 음식']::text[], true),
  ('TIRSM', '정통 낭만러', '전통적인 맛 속에서 감성적인 만족을 찾으며, 깊이 있는 미식 경험을 즐깁니다.', ARRAY['설렁탕', '장어 덮밥', '갈비탕']::text[], true),
  ('TIRSU', '데일리 감성러', '안정적이고 익숙한 식사를 선호하지만, 때로는 감성적인 요소로 변화를 즐깁니다.', ARRAY['아보카도 베이글', '샐러드 정식', '토스트']::text[], true),
  ('TPCDM', '미식 디렉터', '음식뿐 아니라 공간과 분위기까지 완벽하게 계획하며 감성적인 미식 경험을 추구합니다.', ARRAY['파인다이닝 레스토랑', '트러플 파스타', '와인 페어링']::text[], true),
  ('TPCDU', '트렌드 플래너', '최신 트렌드를 빠르게 캐치하며 실용적이고 감각적인 식사를 계획적으로 즐깁니다.', ARRAY['루프탑 다이닝', '브런치 카페', '팝업 레스토랑']::text[], true),
  ('TPCSM', '스윗 가성비러', '달콤한 맛과 예쁜 플레이팅을 좋아하며 합리적이고 계획적인 미식을 즐깁니다.', ARRAY['허니 갈릭 치킨', '단호박 피자', '고구마 샐러드']::text[], true),
  ('TPCSU', '헬시 플래너', '식사를 계획적으로 관리하며 실용적이고 안정적인 선택 속에서도 감각적인 요소를 즐깁니다.', ARRAY['밀프렙 도시락', '닭가슴살 샐러드', '건강식 레스토랑']::text[], true),
  ('TPRDM', '로컬 모험가', '지역 특색 있는 전통 음식에 매력을 느끼며, 자극적이고 개성 있는 맛을 좋아합니다.', ARRAY['막창', '육회 비빔밥', '해장국']::text[], true),
  ('TPRDU', '투박 실속러', '편하고 익숙한 향토음식, 실용적인 가정식을 즐기며, 사람과 함께 먹는 따뜻한 분위기를 선호합니다.', ARRAY['백반', '된장찌개', '오징어볶음']::text[], true),
  ('TPRSM', '로컬 감성러', '로컬 감성과 정을 담은 식사를 좋아하며, 감성적인 분위기에서의 식사를 중요하게 생각합니다.', ARRAY['시골밥상', '묵은지찜', '직화 구이']::text[], true),
  ('TPRSU', '할매손맛러', '실용적인 식생활 속에서도 전통적인 정겨움과 감성을 잊지 않는 따뜻한 입맛입니다.', ARRAY['잡채', '수제비', '김치전']::text[], true)
on conflict (type_code)
do update set
  title = excluded.title,
  description = excluded.description,
  recommended_foods = excluded.recommended_foods,
  is_active = excluded.is_active,
  updated_at = now();

-- 2) Sample test runs (realistic, anonymous-friendly: user_id = null)
insert into public.tpt_test_runs (
  id,
  user_id,
  status,
  flow,
  base_type_code,
  detail_type_code,
  source,
  started_at,
  completed_at,
  metadata
)
values
  (
    '1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1',
    null,
    'completed',
    'basic',
    'TICDM',
    null,
    'seed_demo_web',
    now() - interval '7 days',
    now() - interval '7 days' + interval '2 minutes',
    '{"device":"mobile","locale":"ko-KR"}'::jsonb
  ),
  (
    '6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6',
    null,
    'completed',
    'basic',
    'BPRSU',
    null,
    'seed_demo_web',
    now() - interval '3 days',
    now() - interval '3 days' + interval '3 minutes',
    '{"device":"desktop","locale":"ko-KR"}'::jsonb
  ),
  (
    '5ec050b1-4852-4862-84cb-b078db16aa48',
    null,
    'completed',
    'detail',
    'BIRSU',
    'BIRSU',
    'seed_demo_web',
    now() - interval '1 day',
    now() - interval '1 day' + interval '4 minutes',
    '{"device":"desktop","locale":"ko-KR","from_result":true}'::jsonb
  )
on conflict (id)
do update set
  status = excluded.status,
  flow = excluded.flow,
  base_type_code = excluded.base_type_code,
  detail_type_code = excluded.detail_type_code,
  source = excluded.source,
  started_at = excluded.started_at,
  completed_at = excluded.completed_at,
  metadata = excluded.metadata;

-- 3) Sample answers
insert into public.tpt_test_answers (
  run_id,
  question_index,
  question_set,
  dimension,
  is_reverse,
  answer_value,
  answered_at
)
values
  -- Run A: TICDM tendency (basic Q1~Q10)
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 1, 'basic', 'TB', false, 5, now() - interval '7 days' + interval '15 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 2, 'basic', 'TB', true, 1, now() - interval '7 days' + interval '25 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 3, 'basic', 'IP', false, 5, now() - interval '7 days' + interval '35 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 4, 'basic', 'IP', true, 2, now() - interval '7 days' + interval '45 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 5, 'basic', 'CR', false, 5, now() - interval '7 days' + interval '55 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 6, 'basic', 'CR', true, 2, now() - interval '7 days' + interval '65 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 7, 'basic', 'DS', false, 5, now() - interval '7 days' + interval '75 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 8, 'basic', 'DS', true, 2, now() - interval '7 days' + interval '85 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 9, 'basic', 'MU', false, 5, now() - interval '7 days' + interval '95 seconds'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 10, 'basic', 'MU', true, 2, now() - interval '7 days' + interval '105 seconds'),

  -- Run B: BPRSU tendency (basic Q1~Q10)
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 1, 'basic', 'TB', false, 2, now() - interval '3 days' + interval '20 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 2, 'basic', 'TB', true, 5, now() - interval '3 days' + interval '30 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 3, 'basic', 'IP', false, 2, now() - interval '3 days' + interval '40 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 4, 'basic', 'IP', true, 5, now() - interval '3 days' + interval '50 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 5, 'basic', 'CR', false, 2, now() - interval '3 days' + interval '60 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 6, 'basic', 'CR', true, 5, now() - interval '3 days' + interval '70 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 7, 'basic', 'DS', false, 2, now() - interval '3 days' + interval '80 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 8, 'basic', 'DS', true, 5, now() - interval '3 days' + interval '90 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 9, 'basic', 'MU', false, 2, now() - interval '3 days' + interval '100 seconds'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 10, 'basic', 'MU', true, 5, now() - interval '3 days' + interval '110 seconds'),

  -- Run C: detail flow (Q11~Q25)
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 11, 'detail', 'TB', false, 2, now() - interval '1 day' + interval '20 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 12, 'detail', 'TB', true, 5, now() - interval '1 day' + interval '30 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 13, 'detail', 'TB', false, 2, now() - interval '1 day' + interval '40 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 14, 'detail', 'IP', false, 2, now() - interval '1 day' + interval '50 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 15, 'detail', 'IP', true, 5, now() - interval '1 day' + interval '60 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 16, 'detail', 'IP', true, 5, now() - interval '1 day' + interval '70 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 17, 'detail', 'CR', false, 2, now() - interval '1 day' + interval '80 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 18, 'detail', 'CR', true, 5, now() - interval '1 day' + interval '90 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 19, 'detail', 'CR', false, 2, now() - interval '1 day' + interval '100 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 20, 'detail', 'DS', false, 2, now() - interval '1 day' + interval '110 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 21, 'detail', 'DS', true, 5, now() - interval '1 day' + interval '120 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 22, 'detail', 'DS', false, 2, now() - interval '1 day' + interval '130 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 23, 'detail', 'MU', false, 2, now() - interval '1 day' + interval '140 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 24, 'detail', 'MU', true, 5, now() - interval '1 day' + interval '150 seconds'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 25, 'detail', 'MU', false, 2, now() - interval '1 day' + interval '160 seconds')
on conflict (run_id, question_index)
do update set
  question_set = excluded.question_set,
  dimension = excluded.dimension,
  is_reverse = excluded.is_reverse,
  answer_value = excluded.answer_value,
  answered_at = excluded.answered_at;

-- 4) Sample dimension scores
insert into public.tpt_dimension_scores (
  run_id,
  dimension,
  avg_score,
  rank,
  level,
  letter,
  label,
  computed_at
)
values
  -- Run A TICDM
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 'TB', 5.00, 'HIGH', 5, 'T', '매운맛 덕후', now() - interval '7 days' + interval '2 minutes'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 'IP', 4.50, 'HIGH', 5, 'I', '즉흥파 모험러', now() - interval '7 days' + interval '2 minutes'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 'CR', 4.50, 'HIGH', 5, 'C', '감성샷 집착러', now() - interval '7 days' + interval '2 minutes'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 'DS', 4.50, 'HIGH', 5, 'D', '신상 헌터', now() - interval '7 days' + interval '2 minutes'),
  ('1f6d3f8d-4d67-43f6-9a65-d89da15f5ec1', 'MU', 4.50, 'HIGH', 5, 'M', '분위기 감성러', now() - interval '7 days' + interval '2 minutes'),

  -- Run B BPRSU
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 'TB', 1.50, 'LOW', 2, 'B', '순한맛 지킴이', now() - interval '3 days' + interval '3 minutes'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 'IP', 1.50, 'LOW', 2, 'P', '계획파 맛집러', now() - interval '3 days' + interval '3 minutes'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 'CR', 1.50, 'LOW', 2, 'R', '투박한 전통파', now() - interval '3 days' + interval '3 minutes'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 'DS', 1.50, 'LOW', 2, 'S', '안정적 보수파', now() - interval '3 days' + interval '3 minutes'),
  ('6f2ea2e6-0e1f-4db2-8e4d-fec7df9d74e6', 'MU', 1.50, 'LOW', 2, 'U', '실속러', now() - interval '3 days' + interval '3 minutes'),

  -- Run C detail BIRSU
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 'TB', 1.67, 'LOW', 2, 'B', '순한맛 지킴이', now() - interval '1 day' + interval '4 minutes'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 'IP', 1.67, 'LOW', 2, 'P', '계획파 맛집러', now() - interval '1 day' + interval '4 minutes'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 'CR', 1.67, 'LOW', 2, 'R', '투박한 전통파', now() - interval '1 day' + interval '4 minutes'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 'DS', 1.67, 'LOW', 2, 'S', '안정적 보수파', now() - interval '1 day' + interval '4 minutes'),
  ('5ec050b1-4852-4862-84cb-b078db16aa48', 'MU', 1.67, 'LOW', 2, 'U', '실속러', now() - interval '1 day' + interval '4 minutes')
on conflict (run_id, dimension)
do update set
  avg_score = excluded.avg_score,
  rank = excluded.rank,
  level = excluded.level,
  letter = excluded.letter,
  label = excluded.label,
  computed_at = excluded.computed_at;

commit;
