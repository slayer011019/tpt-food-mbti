// src/data/questions.js

// 공통 5점 리커트 옵션
const LIKERT5 = [
  { label: "전혀 그렇지 않다", value: 1 },
  { label: "그렇지 않다", value: 2 },
  { label: "보통이다", value: 3 },
  { label: "그렇다", value: 4 },
  { label: "매우 그렇다", value: 5 },
];

const questions = [
  // =========================
  // 기본 10문항 (빠른 분류용)
  // =========================

  // Taste (T/B)
  {
    // Q1
    question: "매운 음식을 얼마나 즐기시나요?",
    dimension: "TB",
    reverse: false, // 높을수록 T
    options: LIKERT5,
  },
  {
    // Q2
    question: "달콤하고 부드러운 디저트를 즐기는 편인가요?",
    // 달콤·부드러움은 B 성향 → 역채점으로 T를 낮춰 B에 가중
    dimension: "TB",
    reverse: true,
    options: LIKERT5,
  },

  // Planning (I/P)
  {
    // Q3
    question: "식사·카페 방문을 즉흥적으로 결정하는 편인가요?",
    dimension: "IP",
    reverse: false, // 높을수록 I
    options: LIKERT5,
  },
  {
    // Q4
    question: "아침 식사를 규칙적으로 챙기고, 식단을 미리 계획하나요?",
    dimension: "IP",
    reverse: true, // 계획·규칙은 P 성향 → 역채점
    options: LIKERT5,
  },

  // Style (C/R)
  {
    // Q5
    question: "음식 사진을 자주 찍어 공유하는 편인가요?",
    dimension: "CR",
    reverse: false, // 높을수록 C(비주얼)
    options: LIKERT5,
  },
  {
    // Q6
    question: "플레이팅·비주얼보다 전통적 맛과 정석 레시피를 더 중시하나요?",
    dimension: "CR",
    reverse: true, // 전통은 R 성향 → 역채점
    options: LIKERT5,
  },

  // Venture (D/S)
  {
    // Q7
    question: "새로운 메뉴나 낯선 조합에 도전하는 편인가요?",
    dimension: "DS",
    reverse: false, // 높을수록 D(모험)
    options: LIKERT5,
  },
  {
    // Q8
    question: "단골집·익숙한 메뉴를 반복해서 선택하는 편인가요?",
    dimension: "DS",
    reverse: true, // 익숙함은 S 성향 → 역채점
    options: LIKERT5,
  },

  // Culture (M/U)
  {
    // Q9
    question: "분위기·감성(인테리어/음악/서비스 등)을 특히 중시하나요?",
    dimension: "MU",
    reverse: false, // 높을수록 M(감성)
    options: LIKERT5,
  },
  {
    // Q10
    question: "가성비·영양·대기시간 같은 효율을 우선 고려하나요?",
    dimension: "MU",
    reverse: true, // 효율은 U 성향 → 역채점
    options: LIKERT5,
  },

  // =========================
  // 정밀 15문항 (서브 점수/랭크용)
  // =========================

  // Taste (T/B) — Q11~Q13
  {
    // Q11
    question: "단짠단짠 같은 강한 대비의 맛 조합을 좋아합니다.",
    dimension: "TB",
    reverse: false, // 강한 자극 → T
    options: LIKERT5,
  },
  {
    // Q12
    question: "담백하고 슴슴한 맛이 더 오래 질리지 않습니다.",
    dimension: "TB",
    reverse: true, // 담백·부드러움 → B
    options: LIKERT5,
  },
  {
    // Q13
    question: "향신료나 이국적인 향을 즐기는 편입니다.",
    dimension: "TB",
    reverse: false, // 향신료·이국적 → T
    options: LIKERT5,
  },

  // Planning (I/P) — Q14~Q16
  {
    // Q14
    question: "끌리면 예약 없이 바로 가는 편입니다.",
    dimension: "IP",
    reverse: false, // 즉흥 → I
    options: LIKERT5,
  },
  {
    // Q15
    question: "인기 맛집은 미리 조사하고 계획을 세웁니다.",
    dimension: "IP",
    reverse: true, // 계획 → P
    options: LIKERT5,
  },
  {
    // Q16
    question: "루틴대로 같은 메뉴를 자주 고릅니다.",
    dimension: "IP",
    reverse: true, // 반복·루틴 → P
    options: LIKERT5,
  },

  // Style (C/R) — Q17~Q19
  {
    // Q17
    question: "음식은 ‘인스타 감성샷’이 중요하다고 생각합니다.",
    dimension: "CR",
    reverse: false, // 비주얼 중시 → C
    options: LIKERT5,
  },
  {
    // Q18
    question: "투박한 한식 밥상 같은 전통적인 스타일이 더 끌립니다.",
    dimension: "CR",
    reverse: true, // 전통 선호 → R
    options: LIKERT5,
  },
  {
    // Q19
    question: "깔끔하고 정갈한 플레이팅에 특히 끌립니다.",
    dimension: "CR",
    reverse: false, // 비주얼·정갈 → C
    options: LIKERT5,
  },

  // Venture (D/S) — Q20~Q22
  {
    // Q20
    question: "신상 음료나 한정판 메뉴는 꼭 시도해보는 편입니다.",
    dimension: "DS",
    reverse: false, // 신상·도전 → D
    options: LIKERT5,
  },
  {
    // Q21
    question: "실패할 확률이 높은 메뉴는 피합니다.",
    dimension: "DS",
    reverse: true, // 위험 회피 → S
    options: LIKERT5,
  },
  {
    // Q22
    question: "새로운 맛의 조합을 실험하는 것을 즐깁니다.",
    dimension: "DS",
    reverse: false, // 실험·도전 → D
    options: LIKERT5,
  },

  // Culture (M/U) — Q23~Q25
  {
    // Q23
    question: "분위기 좋은 공간에서 오래 머무는 것을 좋아합니다.",
    dimension: "MU",
    reverse: false, // 분위기·감성 → M
    options: LIKERT5,
  },
  {
    // Q24
    question: "빨리, 배부르게, 효율적으로 먹는 것이 더 중요합니다.",
    dimension: "MU",
    reverse: true, // 효율·실용 → U
    options: LIKERT5,
  },
  {
    // Q25
    question: "특별한 날에는 감성적인 장소를 우선적으로 고릅니다.",
    dimension: "MU",
    reverse: false, // 감성 우선 → M
    options: LIKERT5,
  },
];

export default questions;
