// src/data/questions.js

// 공통 5점 리커트 옵션
export const SCALE_MIN = 1;
export const SCALE_MAX = 5;
export const DIMENSIONS = ["TB", "IP", "CR", "DS", "MU"];

const LIKERT5 = [
  { label: "전혀 그렇지 않다", value: SCALE_MIN },
  { label: "그렇지 않다", value: 2 },
  { label: "보통이다", value: 3 },
  { label: "그렇다", value: 4 },
  { label: "매우 그렇다", value: SCALE_MAX },
];

export const BASIC_QUESTION_COUNT = 10;
export const TOTAL_QUESTION_COUNT = 25;
export const QUESTIONNAIRE_VERSION = "v1";

const questions = [
  // =========================
  // 기본 10문항 (빠른 분류용)
  // =========================

  // Taste (T/B)
  {
    id: "Q1",
    question: "매운 음식이나 자극적인 맛을 즐기는 편인가요?",
    dimension: "TB",
    reverse: false, // 높을수록 T
    options: LIKERT5,
  },
  {
    id: "Q2",
    question: "달콤하고 부드러운 디저트를 특히 좋아하나요?",
    dimension: "TB",
    reverse: true, // 높을수록 B
    options: LIKERT5,
  },

  // Planning (I/P)
  {
    id: "Q3",
    question: "식사나 카페 방문을 즉흥적으로 결정하는 편인가요?",
    dimension: "IP",
    reverse: false, // 높을수록 I
    options: LIKERT5,
  },
  {
    id: "Q4",
    question: "먹을 메뉴나 갈 장소를 미리 정해두는 편인가요?",
    dimension: "IP",
    reverse: true, // 높을수록 P
    options: LIKERT5,
  },

  // Style (C/R)
  {
    id: "Q5",
    question: "음식은 맛뿐 아니라 비주얼도 중요하다고 생각하나요?",
    dimension: "CR",
    reverse: false, // 높을수록 C
    options: LIKERT5,
  },
  {
    id: "Q6",
    question: "화려한 비주얼보다 익숙하고 전통적인 스타일의 음식이 더 좋나요?",
    dimension: "CR",
    reverse: true, // 높을수록 R
    options: LIKERT5,
  },

  // Venture (D/S)
  {
    id: "Q7",
    question: "새로운 메뉴나 낯선 조합에 도전하는 편인가요?",
    dimension: "DS",
    reverse: false, // 높을수록 D
    options: LIKERT5,
  },
  {
    id: "Q8",
    question: "익숙한 메뉴를 반복해서 고르는 편인가요?",
    dimension: "DS",
    reverse: true, // 높을수록 S
    options: LIKERT5,
  },

  // Culture (M/U)
  {
    id: "Q9",
    question: "식당이나 카페를 고를 때 분위기와 감성을 중요하게 생각하나요?",
    dimension: "MU",
    reverse: false, // 높을수록 M
    options: LIKERT5,
  },
  {
    id: "Q10",
    question: "분위기보다 가격, 대기시간, 접근성 같은 현실적인 요소를 더 중시하나요?",
    dimension: "MU",
    reverse: true, // 높을수록 U
    options: LIKERT5,
  },

  // =========================
  // 정밀 15문항 (서브 점수/랭크용)
  // =========================

  // Taste (T/B) — Q11~Q13
  {
    id: "Q11",
    question: "단짠이나 매콤달콤처럼 대비가 강한 맛 조합을 좋아합니다.",
    dimension: "TB",
    reverse: false, // 강한 자극 → T
    options: LIKERT5,
  },
  {
    id: "Q12",
    question: "담백하고 은은한 맛이 더 오래 질리지 않는 편입니다.",
    dimension: "TB",
    reverse: true, // 담백·부드러움 → B
    options: LIKERT5,
  },
  {
    id: "Q13",
    question: "향신료나 이국적인 향이 들어간 음식에 거부감이 적습니다.",
    dimension: "TB",
    reverse: false, // 향신료·이국적 → T
    options: LIKERT5,
  },

  // Planning (I/P) — Q14~Q16
  {
    id: "Q14",
    question: "끌리면 예약이나 사전 조사 없이 바로 가보는 편입니다.",
    dimension: "IP",
    reverse: false, // 즉흥 → I
    options: LIKERT5,
  },
  {
    id: "Q15",
    question: "인기 맛집이나 카페는 미리 찾아보고 계획하는 편입니다.",
    dimension: "IP",
    reverse: true, // 계획 → P
    options: LIKERT5,
  },
  {
    id: "Q16",
    question: "식사 전에 후보 메뉴나 장소를 몇 군데 정리해두는 편입니다.",
    dimension: "IP",
    reverse: true, // 계획성 → P
    options: LIKERT5,
  },

  // Style (C/R) — Q17~Q19
  {
    id: "Q17",
    question: "음식은 맛만큼이나 사진으로 남겼을 때의 느낌도 중요하다고 생각합니다.",
    dimension: "CR",
    reverse: false, // 비주얼 중시 → C
    options: LIKERT5,
  },
  {
    id: "Q18",
    question: "세련된 연출보다 투박해도 정통적인 스타일에 더 끌립니다.",
    dimension: "CR",
    reverse: true, // 전통 선호 → R
    options: LIKERT5,
  },
  {
    id: "Q19",
    question: "깔끔하고 정갈하게 담긴 플레이팅에 특히 끌립니다.",
    dimension: "CR",
    reverse: false, // 비주얼·정갈 → C
    options: LIKERT5,
  },

  // Venture (D/S) — Q20~Q22
  {
    id: "Q20",
    question: "신상 메뉴나 한정판이 나오면 한 번쯤 먹어보고 싶습니다.",
    dimension: "DS",
    reverse: false, // 신상·도전 → D
    options: LIKERT5,
  },
  {
    id: "Q21",
    question: "낯선 메뉴보다는 이미 만족했던 메뉴를 다시 고르는 편입니다.",
    dimension: "DS",
    reverse: true, // 안정 추구 → S
    options: LIKERT5,
  },
  {
    id: "Q22",
    question: "새로운 맛의 조합을 직접 경험해보는 것을 즐깁니다.",
    dimension: "DS",
    reverse: false, // 실험·도전 → D
    options: LIKERT5,
  },

  // Culture (M/U) — Q23~Q25
  {
    id: "Q23",
    question: "음식 자체뿐 아니라 공간이 주는 분위기도 중요한 경험이라고 느낍니다.",
    dimension: "MU",
    reverse: false, // 분위기·감성 → M
    options: LIKERT5,
  },
  {
    id: "Q24",
    question: "식사를 할 때는 감성보다 효율과 실용성이 더 중요합니다.",
    dimension: "MU",
    reverse: true, // 효율·실용 → U
    options: LIKERT5,
  },
  {
    id: "Q25",
    question: "조용하고 감성적인 공간에 더 오래 머물고 싶어집니다.",
    dimension: "MU",
    reverse: false, // 감성 공간 선호 → M
    options: LIKERT5,
  },
];

export default questions;
