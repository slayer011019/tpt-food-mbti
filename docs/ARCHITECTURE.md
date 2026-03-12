# Architecture

## Routing Map

- `/` -> `MainPage` (`src/pages/MainPage.jsx`)
- `/taste-test` -> `TasteTest` (`src/pages/TasteTest.jsx`)
- `/taste-detail` -> `TasteDetailTest` (`src/pages/TasteDetailTest.jsx`)
- `/result` -> `ResultPage` (`src/pages/ResultPage.jsx`)
- `/result/:type` -> `ResultPage` (`src/pages/ResultPage.jsx`)

## Pages and Components

- `MainPage`: entry screen and navigation to tests.
- `TasteTest`: 10-question MBTI-style test flow and result navigation.
- `TasteDetailTest`: follow-up detail test (sub scores).
- `ResultPage`: renders result content and share actions.
- Shared UI components in `src/components/`: `Button`, `Card`, `Progress`.
- Global layout wrapper: `src/layouts/AppLayout.jsx`.

## MBTI Logic

- Computation lives in `calculateMBTI` within `src/utils/mbti.js`.
- Result lookup uses `getTypeDescription` in `src/data/mbtiDescriptions.js`.

## Data Files

- Questions: `src/data/questions.js` (includes dimension and reverse scoring).
- Type descriptions: `src/data/mbtiDescriptions.js` (title, description, recommendations).
- Type validation helpers: `isValidTypeCode`, `validateTypeDescriptions`.

## Analytics

- Client event tracking utility: `src/utils/analytics.js`.
- GA4 event spec: `docs/ANALYTICS.md`.
- Core events:
  - `tpt_main_view`
  - `tpt_test_start`, `tpt_question_answered`, `tpt_test_complete`
  - `tpt_result_view`, `tpt_share_click`, `tpt_detail_start_click`
  - `tpt_detail_start`, `tpt_detail_complete`, `tpt_result_back_click`
