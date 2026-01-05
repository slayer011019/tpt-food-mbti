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

- Computation lives in `calculateMBTI` within `src/pages/TasteTest.jsx`.
- Result lookup uses `getTypeDescription` in `src/data/mbtiDescriptions.js`.

## Data Files

- Questions: `src/data/questions.js` (includes dimension and reverse scoring).
- Type descriptions: `src/data/mbtiDescriptions.js` (title, description, recommendations).
