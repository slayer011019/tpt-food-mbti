# TPT: Taste Personality Test (Food MBTI)

입맛 성향을 빠르게 분류하고, 유형별 추천을 보여주는 **TPT(입맛 성격 테스트)** 웹앱.  
짧은 질문 흐름으로 사용자의 취향 타입을 만들고, 결과 화면에서 타입 설명 + 추천을 제공해요.

> ⚠️ 이 테스트는 재미/프로덕트 실험용이며 의학적·영양학적 진단 목적이 아닙니다.

---

## What it does

- 질문에 답하면 점수 누적 → **TPT 타입** 산출
- 결과 페이지에서 **타입 요약/설명/추천** 표시
- (옵션) 타입 상세 페이지로 deeper dive

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
- (Optional) ESLint

---

## Architecture

See `docs/ARCHITECTURE.md`.

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
