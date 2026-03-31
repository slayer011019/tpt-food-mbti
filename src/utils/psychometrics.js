import {
  BASIC_QUESTION_COUNT,
  DIMENSIONS,
  SCALE_MAX,
  SCALE_MIN,
} from "../data/questions.js";
import questions from "../data/questions.js";
import { mean, sampleCovariance, sampleVariance } from "./stats.js";

const LETTER_RULE = {
  TB: { high: "T", low: "B" },
  IP: { high: "I", low: "P" },
  CR: { high: "C", low: "R" },
  DS: { high: "D", low: "S" },
  MU: { high: "M", low: "U" },
};

const clampLikert = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return (SCALE_MIN + SCALE_MAX) / 2;
  if (num < SCALE_MIN) return SCALE_MIN;
  if (num > SCALE_MAX) return SCALE_MAX;
  return num;
};

const scoreItem = (raw, reverse = false) => {
  const val = clampLikert(raw);
  return reverse ? SCALE_MAX + SCALE_MIN - val : val;
};

export const buildDimensionScores = (answers, questionBank = questions, phase) => {
  if (!Array.isArray(answers)) return null;
  if (!Array.isArray(questionBank) || questionBank.length === 0) return null;

  const bucket = { TB: [], IP: [], CR: [], DS: [], MU: [] };
  const source =
    phase === "basic"
      ? questionBank.slice(0, BASIC_QUESTION_COUNT)
      : phase === "detail"
        ? questionBank.slice(BASIC_QUESTION_COUNT)
        : questionBank;

  source.forEach((q, idx) => {
    if (!q || !bucket[q.dimension]) return;
    const raw = answers[idx];
    const score = scoreItem(raw, q.reverse);
    bucket[q.dimension].push(score);
  });

  return DIMENSIONS.reduce((acc, dim) => {
    const values = bucket[dim];
    const avg = values.length ? mean(values) : (SCALE_MIN + SCALE_MAX) / 2;
    const letter = avg >= 3 ? LETTER_RULE[dim].high : LETTER_RULE[dim].low;

    acc[dim] = {
      count: values.length,
      avg: Number(avg.toFixed(3)),
      letter,
      values,
    };

    return acc;
  }, {});
};

export const cronbachAlpha = (responsesMatrix, items) => {
  if (!Array.isArray(responsesMatrix) || !Array.isArray(items)) return null;
  if (items.length < 2 || responsesMatrix.length < 2) return null;

  const scoredRows = responsesMatrix
    .map((row) =>
      items.map((q, idx) => ({
        value: scoreItem(row?.[idx], q?.reverse),
      })),
    )
    .map((row) => row.map((c) => c.value));

  const k = items.length;
  const itemVariances = items.map((_, itemIdx) => {
    const column = scoredRows.map((row) => row[itemIdx]);
    return sampleVariance(column);
  });
  const totalScores = scoredRows.map((row) => row.reduce((sum, v) => sum + v, 0));
  const totalVariance = sampleVariance(totalScores);

  if (totalVariance === 0) return null;
  const alpha = (k / (k - 1)) * (1 - itemVariances.reduce((sum, v) => sum + v, 0) / totalVariance);
  return Number(alpha.toFixed(4));
};

export const correctedItemTotalCorrelation = (responsesMatrix, items) => {
  if (!Array.isArray(responsesMatrix) || !Array.isArray(items)) return [];
  if (items.length < 2 || responsesMatrix.length < 3) return [];

  const scoredRows = responsesMatrix.map((row) =>
    items.map((q, idx) => scoreItem(row?.[idx], q?.reverse)),
  );

  return items.map((q, itemIdx) => {
    const itemScores = scoredRows.map((row) => row[itemIdx]);
    const restScores = scoredRows.map((row) =>
      row.reduce((sum, v, idx) => (idx === itemIdx ? sum : sum + v), 0),
    );

    const itemVar = sampleVariance(itemScores);
    const restVar = sampleVariance(restScores);
    const r =
      itemVar === 0 || restVar === 0
        ? 0
        : sampleCovariance(itemScores, restScores) / Math.sqrt(itemVar * restVar);

    return {
      id: q.id,
      dimension: q.dimension,
      rit: Number(r.toFixed(4)),
    };
  });
};
