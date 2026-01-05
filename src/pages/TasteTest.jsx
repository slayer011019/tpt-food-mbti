// src/pages/TasteTest.jsx
import { useState } from "react";
import questions from "../data/questions";
import { useNavigate } from "react-router-dom";
import Progress from "../components/Progress";
import Button from "../components/Button";
import { calculateMBTI } from "../utils/mbti";

function TasteTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // 각 문항의 숫자 값(1~5)
  const navigate = useNavigate();

  // 널가드: 질문 배열이 비었을 때
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">질문 데이터가 없습니다.</p>
      </div>
    );
  }

  const questionList = questions.slice(0, 10);
  const current = questionList[currentQuestionIndex];
  const questionText = current?.question ?? "";
  const answerChoices = current?.options ?? [];

  const handleSelect = (value) => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 모든 문항 완료 → 타입 계산 후 결과 페이지로 이동
      const mbtiType = calculateMBTI(updatedAnswers);
      navigate(`/result/${mbtiType}`, {
        state: { answers: updatedAnswers, mbtiType },
      });
    }
  };

  const progress = ((currentQuestionIndex + 1) / questionList.length) * 100;

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">입맛 MBTI 테스트</h1>

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
