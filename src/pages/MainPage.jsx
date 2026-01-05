// src/pages/MainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-2xl mx-auto p-6 text-left">
        <h1 className="text-2xl font-bold mb-3">입맛에도 MBTI가 있다면?</h1>
        <p className="text-gray-600 mb-8">
          몇 가지 질문에 답하고, 당신의 입맛 유형과 추천 음식을 확인해보세요 🍽️
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => alert("🔥 오늘은 얼얼하고 시원한 매운맛!")}
            className="py-3 px-4 rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 transition text-left"
          >
            매운맛
          </button>
          <button
            onClick={() => alert("🍯 달콤하게 당 충전 어떠세요?")}
            className="py-3 px-4 rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 transition text-left"
          >
            달콤한맛
          </button>
          <button
            onClick={() => alert("🥜 고소하고 담백한 한 끼!")}
            className="py-3 px-4 rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 transition text-left"
          >
            고소한맛
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate("/taste-test")} variant="primary">
            기본 테스트 하러가기
          </Button>
          <Button onClick={() => navigate("/taste-detail")} variant="secondary">
            세부 검사 하러가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
