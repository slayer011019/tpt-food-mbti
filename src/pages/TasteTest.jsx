// src/pages/TasteTest.jsx
import { useEffect, useRef, useState } from "react";
import questions from "../data/questions";
import {
  BASIC_QUESTION_COUNT,
  QUESTIONNAIRE_VERSION,
  TOTAL_QUESTION_COUNT,
} from "../data/questions";
import { useNavigate } from "react-router-dom";
import Progress from "../components/Progress";
import Button from "../components/Button";
import { calculateDetailProfile, calculateMBTI } from "../utils/mbti";
import { ANALYTICS_EVENTS, track } from "../utils/analytics";
import { recordBasicResponse, recordDetailResponse } from "../utils/responseStore";

function TasteTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // 각 문항의 숫자 값(1~5)
  const navigate = useNavigate();
  const questionList = questions;
  const hasTrackedStartRef = useRef(false);

  useEffect(() => {
    if (hasTrackedStartRef.current) return;
    hasTrackedStartRef.current = true;
    track(ANALYTICS_EVENTS.TEST_START, {
      flow: "basic",
      question_count: TOTAL_QUESTION_COUNT,
    });
  }, []);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      track(ANALYTICS_EVENTS.TEST_DATA_MISSING, { flow: "basic" });
    }
  }, []);

  // 널가드: 질문 배열이 비었을 때
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">질문 데이터가 없습니다.</p>
      </div>
    );
  }

  const current = questionList[currentQuestionIndex];
  const questionText = current?.question ?? "";
  const answerChoices = current?.options ?? [];

  const handleSelect = (value) => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);
    track(ANALYTICS_EVENTS.QUESTION_ANSWERED, {
      flow: "basic",
      question_index: currentQuestionIndex + 1,
      value,
    });

    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 모든 문항 완료 → 종합 리포트 계산 후 결과 페이지로 이동
      const mbtiType = calculateMBTI(updatedAnswers);
      const detailProfile = calculateDetailProfile(updatedAnswers, {
        baseType: mbtiType,
      });
      recordBasicResponse({
        answers: updatedAnswers.slice(0, BASIC_QUESTION_COUNT),
        mbtiType,
        questionnaireVersion: QUESTIONNAIRE_VERSION,
      });
      recordDetailResponse({
        answers: updatedAnswers.slice(BASIC_QUESTION_COUNT),
        detailCode: detailProfile.detailCode,
      });
      track(ANALYTICS_EVENTS.TEST_COMPLETE, {
        flow: "basic",
        mbti_type: mbtiType,
        answer_count: updatedAnswers.length,
      });
      navigate(`/result/${mbtiType}`, {
        state: {
          answers: updatedAnswers,
          mbtiType,
          detailCode: detailProfile.detailCode,
          details: detailProfile.details,
        },
      });
    }
  };

  const progress = ((currentQuestionIndex + 1) / questionList.length) * 100;

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">입맛 종합 리포트 검사</h1>
        <p className="text-sm text-textGray mb-4">
          25문항으로 취향 타입과 세부 성향을 한 번에 분석합니다.
        </p>

        <Progress value={progress} />
        <div className="text-xs text-gray-600 text-right mb-6">
          {currentQuestionIndex + 1} / {questionList.length}
        </div>

        <div className="text-lg font-semibold text-gray-800 mb-6">
          {questionText}
        </div>

        <div className="flex flex-col gap-3">
          {answerChoices.map((opt, idx) => (
            <Button
              key={idx}
              variant="secondary"
              className="w-full text-left"
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TasteTest;
