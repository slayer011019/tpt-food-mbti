const SESSION_KEY = "tpt_session_id";
const GA_INIT_FLAG = "__tpt_ga_initialized";
const ANALYTICS_CONSENT_KEY = "tpt_analytics_consent";

export const ANALYTICS_EVENTS = Object.freeze({
  PAGE_VIEW: "page_view",
  ANALYTICS_READY: "tpt_analytics_ready",
  MAIN_VIEW: "tpt_main_view",
  TEST_START_CLICK: "tpt_test_start_click",
  TEST_START: "tpt_test_start",
  TEST_DATA_MISSING: "tpt_test_data_missing",
  QUESTION_ANSWERED: "tpt_question_answered",
  TEST_COMPLETE: "tpt_test_complete",
  RESULT_VIEW: "tpt_result_view",
  SHARE_CLICK: "tpt_share_click",
  RESTART_CLICK: "tpt_restart_click",
  ANALYTICS_CONSENT_UPDATED: "tpt_analytics_consent_updated",
});

const EVENT_PARAM_SCHEMA = Object.freeze({
  [ANALYTICS_EVENTS.PAGE_VIEW]: ["page_title", "page_location", "page_path"],
  [ANALYTICS_EVENTS.ANALYTICS_READY]: ["measurement_id"],
  [ANALYTICS_EVENTS.MAIN_VIEW]: [],
  [ANALYTICS_EVENTS.TEST_START_CLICK]: ["flow"],
  [ANALYTICS_EVENTS.TEST_START]: ["flow", "question_count"],
  [ANALYTICS_EVENTS.TEST_DATA_MISSING]: ["flow"],
  [ANALYTICS_EVENTS.QUESTION_ANSWERED]: ["flow", "question_index", "value"],
  [ANALYTICS_EVENTS.TEST_COMPLETE]: ["flow", "mbti_type", "answer_count"],
  [ANALYTICS_EVENTS.RESULT_VIEW]: [
    "has_type",
    "is_valid_type",
    "has_answer_state",
    "source",
    "mbti_type",
  ],
  [ANALYTICS_EVENTS.SHARE_CLICK]: ["flow", "method", "mbti_type"],
  [ANALYTICS_EVENTS.RESTART_CLICK]: ["flow", "source"],
  [ANALYTICS_EVENTS.ANALYTICS_CONSENT_UPDATED]: ["consent"],
});

const getGlobal = () => (typeof window !== "undefined" ? window : undefined);

const readConsentValue = () => {
  const win = getGlobal();
  if (!win) return null;
  let raw = null;
  try {
    raw = win.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch {
    return false;
  }
  if (raw === "granted") return true;
  if (raw === "denied") return false;
  return null;
};

export const getAnalyticsConsent = () => readConsentValue();

export const setAnalyticsConsent = (granted) => {
  const win = getGlobal();
  if (!win) return;
  try {
    win.localStorage.setItem(
      ANALYTICS_CONSENT_KEY,
      granted ? "granted" : "denied",
    );
  } catch {
    // no-op: if storage is unavailable, consent cannot be persisted.
  }
};

const isValidGaMeasurementId = (value) =>
  typeof value === "string" && /^G-[A-Z0-9]+$/i.test(value.trim());

export const initAnalytics = (measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID) => {
  const win = getGlobal();
  if (!win) return false;
  if (readConsentValue() !== true) return false;
  if (win[GA_INIT_FLAG]) return true;

  const id = typeof measurementId === "string" ? measurementId.trim() : "";
  if (!isValidGaMeasurementId(id)) {
    if (import.meta.env.DEV && id) {
      console.warn(`[analytics] invalid GA measurement id: ${id}`);
    }
    return false;
  }

  win.dataLayer = win.dataLayer || [];
  if (typeof win.gtag !== "function") {
    win.gtag = function gtag() {
      win.dataLayer.push(arguments);
    };
  }

  const script = win.document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  win.document.head.appendChild(script);

  win.gtag("js", new Date());
  win.gtag("config", id, { send_page_view: false });
  win[GA_INIT_FLAG] = true;
  win.gtag("event", ANALYTICS_EVENTS.ANALYTICS_READY, {
    measurement_id: id,
  });

  if (import.meta.env.DEV) {
    console.info(`[analytics] GA4 initialized (${id})`);
  }
  return true;
};

export const getSessionId = () => {
  const win = getGlobal();
  if (!win) return "server";

  try {
    const storage = win.sessionStorage;
    const existing = storage.getItem(SESSION_KEY);
    if (existing) return existing;

    const next = `tpt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    storage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return `tpt-volatile-${Date.now()}`;
  }
};

const sanitizePayload = (eventName, payload) => {
  const allowed = EVENT_PARAM_SCHEMA[eventName] || [];
  const entries = Object.entries(payload || {}).filter(([key]) =>
    allowed.includes(key),
  );
  return Object.fromEntries(entries);
};

export const track = (eventName, payload = {}) => {
  if (!eventName || typeof eventName !== "string") return;

  const win = getGlobal();
  if (!win) return;
  if (readConsentValue() !== true) return;

  const eventPayload = {
    ...sanitizePayload(eventName, payload),
    session_id: getSessionId(),
    page_path: win.location.pathname,
    timestamp: new Date().toISOString(),
  };

  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, eventPayload);
  }

  if (typeof win.plausible === "function") {
    win.plausible(eventName, { props: eventPayload });
  }

  if (import.meta.env.DEV) {
    console.info(`[analytics] ${eventName}`, eventPayload);
  }
};

export const trackPageView = () => {
  const win = getGlobal();
  if (!win) return;

  track(ANALYTICS_EVENTS.PAGE_VIEW, {
    page_title: win.document.title,
    page_location: win.location.href,
    page_path: win.location.pathname,
  });
};
