import questions from "../data/questions";

export const NEUTRAL_CODE = "BPRSU";

const DIMENSIONS = ["TB", "IP", "CR", "DS", "MU"];

const GROUPS = {
  TB: { high: "T", low: "B" },
  IP: { high: "I", low: "P" },
  CR: { high: "C", low: "R" },
  DS: { high: "D", low: "S" },
  MU: { high: "M", low: "U" },
};

const normalizeAnswer = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return 3;
  if (num < 1 || num > 5) return 3;
  return num;
};

export const calculateMBTI = (answersArr, questionBank = questions) => {
  if (!Array.isArray(answersArr)) return NEUTRAL_CODE;
  if (!Array.isArray(questionBank) || questionBank.length < 10) return NEUTRAL_CODE;

  const normalizedAnswers = answersArr.slice(0, 10).map(normalizeAnswer);
  while (normalizedAnswers.length < 10) normalizedAnswers.push(3);

  // 1) dimension/reverse 메타가 있는 경우(권장)
  const questionList = questionBank.slice(0, 10);
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
