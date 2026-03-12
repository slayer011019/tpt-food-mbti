# QA Checklist (Beta Release)

## Scope

- 디바이스: iOS Safari, Android Chrome, Desktop Chrome
- 경로: `/`, `/taste-test`, `/result/:type`, `/taste-detail`

## Functional

1. 기본 테스트 10문항 완료 시 결과 페이지로 이동
2. 결과 페이지에서 공유/링크복사 동작
3. 결과 페이지에서 세부 검사 진입 가능
4. 세부 검사 15문항 완료 시 보조 코드/차원 점수 표시
5. 세부 검사에서 메인 결과 복귀 가능
6. 직접 URL 진입 `/result/TICDM` 정상 표시
7. 잘못된 URL 진입 `/result/ABCDE` 폴백 표시

## Analytics

1. 메인 진입 시 `page_view`, `tpt_main_view` 발생
2. 기본 테스트 시작 시 `tpt_test_start` 발생
3. 10문항 응답 시 `tpt_question_answered`가 10회 발생
4. 완료 시 `tpt_test_complete` 발생
5. 결과 진입 시 `tpt_result_view` 발생 (`is_valid_type=true`)
6. 공유/복사 클릭 시 `tpt_share_click` 발생
7. 재시작 클릭 시 `tpt_restart_click` 발생
8. 배포 직후 `tpt_analytics_ready` 발생

## Regression

1. `npm run lint`
2. `npm run test:run`
3. `npm run build`
