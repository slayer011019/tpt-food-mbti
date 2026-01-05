import questions from "../data/questions";

export const calculateMBTI = (answersArr, questionBank = questions) => {
  // 1) dimension/reverse 메타가 있는 경우(권장)
  const questionList = questionBank.slice(0, 10);
  const hasMeta = questionList.every(
    (q) => typeof q.dimension === "string" && typeof q.reverse === "boolean",
  );

  if (hasMeta) {
    const groups = {
      TB: { high: "T", low: "B" },
      IP: { high: "I", low: "P" },
      CR: { high: "C", low: "R" },
      DS: { high: "D", low: "S" },
      MU: { high: "M", low: "U" },
    };

    const bucket = { TB: [], IP: [], CR: [], DS: [], MU: [] };

    answersArr.forEach((raw, i) => {
      const q = questionList[i];
      const val = q.reverse ? 6 - raw : raw; // 역채점
      if (bucket[q.dimension]) bucket[q.dimension].push(val);
    });

    let code = "";
    ["TB", "IP", "CR", "DS", "MU"].forEach((key) => {
      const arr = bucket[key];
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      if (avg > 3) code += groups[key].high;
      else if (avg < 3) code += groups[key].low;
      else code += groups[key].low; // avg == 3: deterministic tie-breaker
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
    const vals = group.indices.map((i) => answersArr[i]);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;

    if (avg > 3) mbtiCode += group.high;
    else if (avg < 3) mbtiCode += group.low;
    else mbtiCode += group.low; // avg == 3: deterministic tie-breaker
  }
  return mbtiCode;
};
