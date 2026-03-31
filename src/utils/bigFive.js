import { BIG_FIVE_ITEMS } from "../data/bigFiveQuestions.js";

const TRAITS = [
  "EXTRAVERSION",
  "AGREEABLENESS",
  "CONSCIENTIOUSNESS",
  "EMOTIONAL_STABILITY",
  "OPENNESS",
];

const normalize7 = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return 4;
  if (n < 1) return 1;
  if (n > 7) return 7;
  return n;
};

const scoreItem = (raw, reverse = false) => {
  const v = normalize7(raw);
  return reverse ? 8 - v : v;
};

export const computeBigFiveScores = (answers, itemBank = BIG_FIVE_ITEMS) => {
  if (!Array.isArray(answers) || !Array.isArray(itemBank) || itemBank.length === 0) {
    return null;
  }

  const buckets = {
    EXTRAVERSION: [],
    AGREEABLENESS: [],
    CONSCIENTIOUSNESS: [],
    EMOTIONAL_STABILITY: [],
    OPENNESS: [],
  };

  itemBank.forEach((item, idx) => {
    if (!buckets[item.trait]) return;
    buckets[item.trait].push(scoreItem(answers[idx], item.reverse));
  });

  return TRAITS.reduce((acc, trait) => {
    const values = buckets[trait];
    const avg = values.length
      ? values.reduce((sum, v) => sum + v, 0) / values.length
      : 4;

    acc[trait] = Number(avg.toFixed(3));
    return acc;
  }, {});
};

export const BIG_FIVE_TRAIT_LABELS = {
  EXTRAVERSION: "외향성",
  AGREEABLENESS: "우호성",
  CONSCIENTIOUSNESS: "성실성",
  EMOTIONAL_STABILITY: "정서안정성",
  OPENNESS: "개방성",
};
