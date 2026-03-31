import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ANALYTICS_EVENTS,
  getAnalyticsConsent,
  initAnalytics,
  setAnalyticsConsent,
  track,
  trackPageView,
} from "../utils/analytics";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded text-sm font-medium ${
    isActive ? "bg-black text-white" : "text-gray-800 hover:bg-gray-100"
  }`;

export default function AppLayout({ children }) {
  const location = useLocation();
  const lastTrackedPathRef = useRef("");
  const [consent, setConsent] = useState(() => getAnalyticsConsent());

  useEffect(() => {
    const key = `${location.pathname}${location.search}`;
    if (lastTrackedPathRef.current === key) return;
    lastTrackedPathRef.current = key;
    trackPageView();
  }, [location.pathname, location.search]);

  const onConsent = (granted) => {
    setAnalyticsConsent(granted);
    setConsent(granted);
    if (granted) {
      initAnalytics();
      track(ANALYTICS_EVENTS.ANALYTICS_CONSENT_UPDATED, { consent: "granted" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-base font-semibold">
            입맛 MBTI
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              메인
            </NavLink>
            <NavLink to="/taste-test" className={navLinkClass}>
              종합검사
            </NavLink>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer
        className="mt-10 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 flex items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Taste MBTI. All rights reserved.</span>
          {consent !== null ? (
            <button
              type="button"
              onClick={() => onConsent(!consent)}
              className="px-2 py-1 rounded border border-borderGray text-textGray hover:bg-warmBg"
            >
              {consent ? "분석 수집 끄기" : "분석 수집 켜기"}
            </button>
          ) : null}
        </div>
      </footer>
      {consent === null ? (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl rounded-card border border-borderGray bg-white/95 backdrop-blur px-4 py-3 shadow-softCard">
          <p className="text-sm text-gray-800">
            사용 통계 수집에 동의하면 서비스 개선을 위한 익명 이벤트를 전송합니다.
          </p>
          <div className="mt-3 flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => onConsent(false)}
              className="px-3 py-2 text-sm rounded border border-borderGray text-textGray hover:bg-warmBg"
            >
              거부
            </button>
            <button
              type="button"
              onClick={() => onConsent(true)}
              className="px-3 py-2 text-sm rounded bg-deepGreen text-white hover:opacity-95"
            >
              동의
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
