import questions from "../data/questions";
import { BASIC_QUESTION_COUNT, TOTAL_QUESTION_COUNT } from "../data/questions";

export const NEUTRAL_CODE = "BPRSU";

const DIMENSIONS = ["TB", "IP", "CR", "DS", "MU"];

const GROUPS = {
  TB: { high: "T", low: "B" },
  IP: { high: "I", low: "P" },
  CR: { high: "C", low: "R" },
  DS: { high: "D", low: "S" },
  MU: { high: "M", low: "U" },
};

export const DETAIL_DIMENSIONS = ["TB", "IP", "CR", "DS", "MU"];
export const DETAIL_RANK_LABELS = {
  TB: { LOW: "순한맛 지킴이", MID: "균형 잡힌 입맛", HIGH: "매운맛 덕후" },
  IP: { LOW: "계획파 맛집러", MID: "상황 따라", HIGH: "즉흥파 모험러" },
  CR: { LOW: "투박한 전통파", MID: "적당히 신경", HIGH: "감성샷 집착러" },
  DS: { LOW: "안정적 보수파", MID: "소소한 모험러", HIGH: "신상 헌터" },
  MU: { LOW: "실속러", MID: "밸런서", HIGH: "분위기 감성러" },
};

const rankOf = (avg) => (avg < 2.5 ? "LOW" : avg < 3.5 ? "MID" : "HIGH");

const normalizeAnswer = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return 3;
  if (num < 1 || num > 5) return 3;
  return num;
};

export const calculateMBTI = (answersArr, questionBank = questions) => {
  if (!Array.isArray(answersArr)) return NEUTRAL_CODE;
  if (!Array.isArray(questionBank) || questionBank.length < BASIC_QUESTION_COUNT) {
    return NEUTRAL_CODE;
  }

  const normalizedAnswers = answersArr
    .slice(0, BASIC_QUESTION_COUNT)
    .map(normalizeAnswer);
  while (normalizedAnswers.length < BASIC_QUESTION_COUNT) normalizedAnswers.push(3);

  // 1) dimension/reverse 메타가 있는 경우(권장)
  const questionList = questionBank.slice(0, BASIC_QUESTION_COUNT);
  const hasMeta = questionList.every(
    (q) => typeof q.dimension === "string" && typeof q.reverse === "boolean",
  );

  if (hasMeta) {
    const bucket = { TB: [], IP: [], CR: [], DS: [], MU: [] };

    normalizedAnswers.forEach((raw, i) => {
      const q = questionList[i];
      const val = q.reverse ? 6 - raw : raw; // 역채점
      if (bucket[q.dimension]) bucket[q.dimension].push(val);
    });

    let code = "";
    DIMENSIONS.forEach((key) => {
      const arr = bucket[key];
      const avg = arr.length
        ? arr.reduce((a, b) => a + b, 0) / arr.length
        : 3;
      if (avg > 3) code += GROUPS[key].high;
      else if (avg < 3) code += GROUPS[key].low;
      else code += GROUPS[key].low; // avg == 3: deterministic tie-breaker
    });
    return code;
  }

  // 2) 폴백: 인덱스 기반(메타 없을 때)
  // Q1-2: TB, Q3-4: IP, Q5-6: CR, Q7-8: DS, Q9-10: MU
  const criteriaGroups = {
    taste: { indices: [0, 1], high: "T", low: "B" },
    planning: { indices: [2, 3], high: "I", low: "P" },
    style: { indices: [4, 5], high: "C", low: "R" },
    venture: { indices: [6, 7], high: "D", low: "S" },
    culture: { indices: [8, 9], high: "M", low: "U" },
  };

  let mbtiCode = "";
  for (const group of Object.values(criteriaGroups)) {
    const vals = group.indices.map((i) => normalizedAnswers[i]);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;

    if (avg > 3) mbtiCode += group.high;
    else if (avg < 3) mbtiCode += group.low;
    else mbtiCode += group.low; // avg == 3: deterministic tie-breaker
  }
  return mbtiCode;
};

export const calculateDetailProfile = (
  answersArr,
  {
    questionBank = questions,
    baseType = null,
  } = {},
) => {
  if (!Array.isArray(answersArr)) {
    return { detailCode: NEUTRAL_CODE, details: null };
  }

  const normalizedAnswers = answersArr
    .slice(0, TOTAL_QUESTION_COUNT)
    .map(normalizeAnswer);
  while (normalizedAnswers.length < TOTAL_QUESTION_COUNT) normalizedAnswers.push(3);

  const detailQuestions = questionBank.slice(BASIC_QUESTION_COUNT);
  const buckets = { TB: [], IP: [], CR: [], DS: [], MU: [] };

  normalizedAnswers.slice(BASIC_QUESTION_COUNT).forEach((raw, index) => {
    const q = detailQuestions[index];
    if (!q) return;
    const value = q.reverse ? 6 - raw : raw;
    if (buckets[q.dimension]) buckets[q.dimension].push(value);
  });

  const fallbackLetters = (baseType || NEUTRAL_CODE).split("");
  const details = {};

  DETAIL_DIMENSIONS.forEach((dim, index) => {
    const arr = buckets[dim];
    const avg = arr.length
      ? +(arr.reduce((sum, value) => sum + value, 0) / arr.length).toFixed(2)
      : 3.0;
    const rank = rankOf(avg);
    const label = DETAIL_RANK_LABELS[dim][rank];

    let letter = fallbackLetters[index];
    if (avg > 3) letter = GROUPS[dim].high;
    else if (avg < 3) letter = GROUPS[dim].low;

    details[dim] = { avg, rank, label, letter };
  });

  const detailCode = DETAIL_DIMENSIONS.map((dim) => details[dim].letter).join("");
  return { detailCode, details };
};
