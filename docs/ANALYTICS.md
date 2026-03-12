# Analytics Spec (GA4)

TPT 베타 운영용 이벤트 스키마입니다.  
모든 이벤트는 `src/utils/analytics.js`의 `ANALYTICS_EVENTS` 상수를 통해 발화합니다.

## Base Parameters

아래 필드는 모든 이벤트에 자동 첨부됩니다.

- `session_id`: 세션 스코프 식별자 (`sessionStorage` 기반)
- `page_path`: 이벤트 발생 시점의 pathname
- `timestamp`: ISO 문자열 시간

## Event Map

1. `page_view`
- Trigger: 라우트 변경 시 수동 발화 (SPA)
- Params: `page_title`, `page_location`, `page_path`

2. `tpt_analytics_ready`
- Trigger: GA4 초기화 성공 직후
- Params: `measurement_id`

3. `tpt_main_view`
- Trigger: 메인 페이지 진입
- Params: 없음

4. `tpt_test_start_click`
- Trigger: 메인에서 테스트 시작 버튼 클릭
- Params: `flow` (`basic` | `detail`)

5. `tpt_test_start`
- Trigger: 기본 테스트 페이지 로드
- Params: `flow`, `question_count`

6. `tpt_test_data_missing`
- Trigger: 질문 데이터 누락 감지
- Params: `flow`

7. `tpt_question_answered`
- Trigger: 질문 응답 선택
- Params: `flow`, `question_index`, `value`

8. `tpt_test_complete`
- Trigger: 기본 테스트 완료
- Params: `flow`, `mbti_type`, `answer_count`

9. `tpt_result_view`
- Trigger: 결과 페이지 렌더
- Params: `has_type`, `is_valid_type`, `has_answer_state`, `source`, `mbti_type`

10. `tpt_share_click`
- Trigger: 공유/링크복사/상세결과 공유 클릭
- Params: `flow`, `method`, `mbti_type`

11. `tpt_detail_start_click`
- Trigger: 결과 페이지에서 세부 검사 시작 클릭
- Params: `flow`, `mbti_type`

12. `tpt_detail_start`
- Trigger: 세부 검사 페이지 로드
- Params: `flow`, `question_count`, `has_base_type`

13. `tpt_detail_complete`
- Trigger: 세부 검사 완료
- Params: `flow`, `answer_count`

14. `tpt_result_back_click`
- Trigger: 세부 검사에서 메인 결과로 복귀 클릭
- Params: `flow`, `has_base_type`

15. `tpt_restart_click`
- Trigger: 결과/세부검사에서 처음으로(재시작) 클릭
- Params: `flow`, `source`

## GA4 Setup

1. 프로젝트 루트에 `.env` 파일을 만들고 아래 값을 설정합니다.
2. `G-XXXXXXXXXX`를 실제 측정 ID로 교체합니다.
3. 앱 시작 시 `initAnalytics()`가 GA 스크립트를 자동 주입합니다.
4. GA 초기화 시 `send_page_view: false`가 적용됩니다. (`page_view`는 라우트 변경 시 수동 발화)
5. 배포 후 GA4 Realtime에서 `page_view`, `tpt_*` 이벤트 수신 여부를 검증합니다.

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

참고: 예시 파일은 `.env.example`에 포함되어 있습니다.

## Notes

- 현재 구현은 `gtag`와 `plausible`을 동시에 지원합니다.
- 이벤트 파라미터는 스키마 화이트리스트 기반으로 전송됩니다.
