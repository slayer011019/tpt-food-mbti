import { getSessionId } from "./analytics";

export const RESPONSE_STORE_KEY = "tpt_response_records_v1";
export const RESPONSE_TTL_DAYS = 7;
export const MAX_RESPONSE_RECORDS = 300;

const getGlobal = () => (typeof window !== "undefined" ? window : undefined);
const RESPONSE_TTL_MS = RESPONSE_TTL_DAYS * 24 * 60 * 60 * 1000;

const isExpired = (record, nowMs) => {
  const ts = Date.parse(record?.updatedAt || record?.createdAt || "");
  if (!Number.isFinite(ts)) return false;
  return nowMs - ts > RESPONSE_TTL_MS;
};

const parseStore = (raw) => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const pruneRecords = (records) => {
  const safe = Array.isArray(records) ? records : [];
  const now = Date.now();
  const notExpired = safe.filter((r) => !isExpired(r, now));
  if (notExpired.length <= MAX_RESPONSE_RECORDS) return notExpired;
  return notExpired
    .sort((a, b) => {
      const at = Date.parse(a?.updatedAt || a?.createdAt || 0);
      const bt = Date.parse(b?.updatedAt || b?.createdAt || 0);
      return bt - at;
    })
    .slice(0, MAX_RESPONSE_RECORDS);
};

const readRawRecords = () => {
  const win = getGlobal();
  if (!win) return [];
  try {
    return parseStore(win.localStorage.getItem(RESPONSE_STORE_KEY));
  } catch {
    return [];
  }
};

export const getResponseRecords = () => {
  const win = getGlobal();
  if (!win) return [];
  const raw = readRawRecords();
  const pruned = pruneRecords(raw);
  if (pruned.length !== raw.length) {
    try {
      win.localStorage.setItem(RESPONSE_STORE_KEY, JSON.stringify(pruned));
    } catch {
      // ignore: keep runtime stable if storage is unavailable.
    }
  }
  return pruned;
};

const saveRecords = (records) => {
  const win = getGlobal();
  if (!win) return false;
  try {
    win.localStorage.setItem(RESPONSE_STORE_KEY, JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
};

const saveRecordsWithEviction = (records) => {
  const normalized = pruneRecords(records);
  if (saveRecords(normalized)) return true;

  const fallback = [...normalized];
  while (fallback.length > 0) {
    fallback.pop();
    if (saveRecords(fallback)) return true;
  }
  return false;
};

const sanitizeLikertArray = (input, maxLen, fallback = 0) => {
  if (!Array.isArray(input)) return [];
  return input.slice(0, maxLen).map((value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return fallback;
    return num;
  });
};

export const upsertResponseRecord = (patch) => {
  const win = getGlobal();
  if (!win || !patch || typeof patch !== "object") return null;

  const sessionId = patch.sessionId || getSessionId();
  const records = getResponseRecords();
  const now = new Date().toISOString();
  const normalizedPatch = { ...patch };
  if ("basicAnswers" in patch) {
    normalizedPatch.basicAnswers = sanitizeLikertArray(patch.basicAnswers, 10);
  }
  if ("detailAnswers" in patch) {
    normalizedPatch.detailAnswers = sanitizeLikertArray(patch.detailAnswers, 15);
  }
  if ("bigFiveAnswers" in patch) {
    normalizedPatch.bigFiveAnswers = sanitizeLikertArray(patch.bigFiveAnswers, 10);
  }
  const idx = records.findIndex((r) => r.sessionId === sessionId);

  if (idx >= 0) {
    records[idx] = {
      ...records[idx],
      ...normalizedPatch,
      sessionId,
      updatedAt: now,
    };
  } else {
    records.push({
      sessionId,
      createdAt: now,
      updatedAt: now,
      ...normalizedPatch,
    });
  }

  const persisted = saveRecordsWithEviction(records);
  if (!persisted) return null;
  const finalRecords = readRawRecords();
  return finalRecords.find((r) => r.sessionId === sessionId) || null;
};

export const recordBasicResponse = ({ answers, mbtiType, questionnaireVersion }) =>
  upsertResponseRecord({
    sessionId: getSessionId(),
    questionnaireVersion,
    basicAnswers: Array.isArray(answers) ? answers : [],
    mbtiType: mbtiType || null,
    completedBasicAt: new Date().toISOString(),
  });

export const recordDetailResponse = ({ answers, detailCode }) =>
  upsertResponseRecord({
    sessionId: getSessionId(),
    detailAnswers: Array.isArray(answers) ? answers : [],
    detailCode: detailCode || null,
    completedDetailAt: new Date().toISOString(),
  });

export const recordBigFiveResponse = ({ answers, scores }) =>
  upsertResponseRecord({
    sessionId: getSessionId(),
    bigFiveAnswers: Array.isArray(answers) ? answers : [],
    bigFiveScores: scores || null,
    completedBigFiveAt: new Date().toISOString(),
  });

export const clearResponseRecords = () => {
  const win = getGlobal();
  if (!win) return;
  try {
    win.localStorage.removeItem(RESPONSE_STORE_KEY);
  } catch {
    // no-op
  }
};

const toCsvCell = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return `"${str.replaceAll('"', '""')}"`;
  }
  return str;
};

export const recordsToCsv = (records) => {
  const safe = Array.isArray(records) ? records : [];
  const headers = [
    "sessionId",
    "createdAt",
    "updatedAt",
    "questionnaireVersion",
    "mbtiType",
    "detailCode",
    ...Array.from({ length: 10 }, (_, i) => `basic_q${String(i + 1).padStart(2, "0")}`),
    ...Array.from({ length: 15 }, (_, i) => `detail_q${String(i + 11).padStart(2, "0")}`),
    ...Array.from({ length: 10 }, (_, i) => `big5_q${String(i + 1).padStart(2, "0")}`),
    "bf_extraversion",
    "bf_agreeableness",
    "bf_conscientiousness",
    "bf_emotional_stability",
    "bf_openness",
  ];

  const rows = safe.map((r) => {
    const basic = Array.isArray(r.basicAnswers) ? r.basicAnswers : [];
    const detail = Array.isArray(r.detailAnswers) ? r.detailAnswers : [];
    const big5 = Array.isArray(r.bigFiveAnswers) ? r.bigFiveAnswers : [];
    const scores = r.bigFiveScores || {};

    return [
      r.sessionId,
      r.createdAt,
      r.updatedAt,
      r.questionnaireVersion,
      r.mbtiType,
      r.detailCode,
      ...Array.from({ length: 10 }, (_, i) => basic[i] ?? ""),
      ...Array.from({ length: 15 }, (_, i) => detail[i] ?? ""),
      ...Array.from({ length: 10 }, (_, i) => big5[i] ?? ""),
      scores.EXTRAVERSION ?? "",
      scores.AGREEABLENESS ?? "",
      scores.CONSCIENTIOUSNESS ?? "",
      scores.EMOTIONAL_STABILITY ?? "",
      scores.OPENNESS ?? "",
    ].map(toCsvCell);
  });

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
};
