// src/pages/MainPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { ANALYTICS_EVENTS, track } from "../utils/analytics";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    track(ANALYTICS_EVENTS.MAIN_VIEW);
  }, []);

  const startBasicTest = () => {
    track(ANALYTICS_EVENTS.TEST_START_CLICK, { flow: "basic" });
    navigate("/taste-test");
  };

  return (
    <div className="min-h-screen bg-warmBg px-4 py-8 sm:py-12 flex items-center justify-center">
      <Card className="w-full max-w-3xl bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-4xl mb-3" aria-hidden="true">
            🍽️
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-end mb-3">
            입맛에도 MBTI가 있다면?
          </h1>
          <p className="text-textGray text-base sm:text-lg mb-8">
            10문항으로 나의 식사 성향을 빠르게 확인하고, 취향에 맞는 추천까지
            받아보세요.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
            <div className="rounded-card bg-pastelOrange p-4 flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                🌶️
              </span>
              <span className="font-semibold text-gray-800">맛 선호도</span>
            </div>
            <div className="rounded-card bg-pastelBlue p-4 flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                🍱
              </span>
              <span className="font-semibold text-gray-800">식사 스타일</span>
            </div>
            <div className="rounded-card bg-pastelGreen p-4 flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                🧭
              </span>
              <span className="font-semibold text-gray-800">음식 철학</span>
            </div>
            <div className="rounded-card bg-pastelPink p-4 flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                🚀
              </span>
              <span className="font-semibold text-gray-800">도전 성향</span>
            </div>
          </div>

          <div className="rounded-card bg-gray-50 border border-borderGray p-5 text-left mb-8">
            <h2 className="font-bold text-gray-800 mb-3">테스트 정보</h2>
            <ul className="list-disc list-inside text-textGray space-y-1">
              <li>총 10문항으로 1~2분 내 완료할 수 있어요.</li>
              <li>정답이 없는 성향 테스트입니다.</li>
              <li>결과는 재미와 자기이해를 위한 참고용입니다.</li>
              <li>테스트 후 유형별 음식 추천을 확인할 수 있어요.</li>
            </ul>
          </div>

          <Button
            onClick={startBasicTest}
            variant="primaryGradient"
            className="w-full sm:w-auto min-w-56"
          >
            테스트 시작하기
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MainPage;
