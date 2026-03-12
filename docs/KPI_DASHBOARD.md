# KPI Dashboard (Beta)

베타 기간 핵심 KPI는 `완주율`입니다.

## North Star

- 지표명: `완주율`
- 정의: `tpt_test_complete` 사용자 수 / `tpt_test_start` 사용자 수
- 권장 집계:
  - 기본: `users` 기준
  - 보조: `event_count` 기준

## Supporting Metrics

1. 시작 클릭률
- `tpt_test_start_click` / `tpt_main_view`

2. 상세 검사 진입률
- `tpt_detail_start_click` / `tpt_result_view (is_valid_type=true)`

3. 공유 전환율
- `tpt_share_click` / `tpt_result_view (is_valid_type=true)`

4. 재시작율
- `tpt_restart_click` / `tpt_result_view`

## Funnel (GA4 Exploration)

순서:
1. `tpt_test_start`
2. `tpt_question_answered` with `question_index=10`
3. `tpt_test_complete`
4. `tpt_result_view` with `is_valid_type=true`

## Segment Recommendations

- `flow=basic` vs `flow=detail`
- `source=route_param` vs `source=state`
- `mbti_type` 상위 5개 타입

## Data Quality Checks (Daily)

1. `tpt_test_start`는 발생하는데 `tpt_question_answered`가 0인지 확인
2. `tpt_test_complete` 대비 `tpt_result_view` 급감 여부 확인
3. `tpt_test_data_missing` 발생 여부 확인 (정상은 0)
4. `tpt_analytics_ready` 수신 여부 확인 (배포 직후)
