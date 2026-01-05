// src/pages/TasteTest.jsx
import { useState } from "react";
import questions from "../data/questions";
import { useNavigate } from "react-router-dom";
import Progress from "../components/Progress";
import Button from "../components/Button";

function TasteTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // 각 문항의 숫자 값(1~5)
  const navigate = useNavigate();

  // ✅ MBTI 타입 계산 함수 (5자리: T/B, I/P, C/R, D/S, M/U)
  const calculateMBTI = (answersArr) => {
    // 1) dimension/reverse 메타가 있는 경우(권장)
    const questionList = questions.slice(0, 10);
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
