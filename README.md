# TPT: Taste Personality Test (Food MBTI)

입맛 성향을 25문항으로 분석해 하나의 **종합 리포트**로 보여주는 TPT 웹앱입니다.  
한 번의 검사로 타입 코드, 유형 해석, 생활형 성향, 5가지 축 세부 점수까지 확인할 수 있습니다.

> ⚠️ 이 테스트는 재미/프로덕트 실험용이며 의학적·영양학적 진단 목적이 아닙니다.

---

## 프로젝트 요약

- 25문항 검사 완료 시 **TPT 5자리 타입 코드** 산출
- 결과 페이지에서 **종합 리포트** 형태로 해석 제공
- 5가지 축의 세부 점수와 생활형 해석까지 한 번에 표시

---

## TPT 타입 체계 (현재 기준)

- **Taste**: `T` (자극적) / `B` (부드러운)
- **Planning**: `I` (즉흥적) / `P` (계획적)
- **Style**: `C` (예쁜/감성) / `R` (전통/레트로)
- **Venture**: `D` (모험적) / `S` (안정적)
- **Culture**: `M` (무드/감성) / `U` (실용)

> 예: `TICDM` 처럼 5자리 코드로 표현 (총 32가지)

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- ESLint
- Prettier

---

## Architecture

See `docs/ARCHITECTURE.md`.
Analytics event schema is documented in `docs/ANALYTICS.md`.
Beta KPI guide: `docs/KPI_DASHBOARD.md`.
Release QA checklist: `docs/QA_CHECKLIST.md`.

---

## Routing Map

- `/` (MainPage)
- `/taste-test` (TasteTest)
- `/result` (ResultPage)
- `/result/:type` (ResultPage)

---

## Data Files

- `src/data/questions.js`: 25문항 질문/차원/역채점 정의
- `src/data/mbtiDescriptions.js`: 타입명, 설명, 리포트 문구 생성 유틸
- `src/utils/mbti.js`: 타입 계산과 세부 축 점수 계산 유틸
- `src/utils/analytics.js`: 사용자 흐름 이벤트 추적 유틸

---

## Quick Start

```bash
# install
npm install

# run dev server
npm run dev

# build
npm run build

# preview build
npm run preview
```

## Environment

```bash
cp .env.example .env
```

---

## Contribution Commands

```bash
# lint
npm run lint

# unit tests
npm run test:run

# format
npm run format
```
