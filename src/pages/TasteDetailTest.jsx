// src/pages/TasteDetailTest.jsx
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Progress from "../components/Progress";
import Button from "../components/Button";
import questions from "../data/questions";

const detailQuestions = questions.slice(10); // 하단 15문항만 사용

// 차원/라벨 설정
const DIM_ORDER = ["TB", "IP", "CR", "DS", "MU"];
const LETTER_RULE = {
  TB: { high: "T", low: "B" },
  IP: { high: "I", low: "P" },
  CR: { high: "C", low: "R" },
  DS: { high: "D", low: "S" },
  MU: { high: "M", low: "U" },
};
const RANK_LABELS = {
  TB: { LOW: "순한맛 지킴이", MID: "균형 잡힌 입맛", HIGH: "매운맛 덕후" },
  IP: { LOW: "계획파 맛집러", MID: "상황 따라", HIGH: "즉흥파 모험러" },
  CR: { LOW: "투박한 전통파", MID: "적당히 신경", HIGH: "감성샷 집착러" },
  DS: { LOW: "안정적 보수파", MID: "소소한 모험러", HIGH: "신상 헌터" },
  MU: { LOW: "실속러", MID: "밸런서", HIGH: "분위기 감성러" },
};
const rankOf = (avg) => (avg < 2.5 ? "LOW" : avg < 3.5 ? "MID" : "HIGH");

export default function TasteDetailTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const baseType = location.state?.baseType || null; // (옵션) 메인 결과 코드
  const baseAnswers = location.state?.baseAnswers || null; // (옵션) 기본 10문항 답변

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); // 1~5 값 저장
  const [done, setDone] = useState(false); // ✅ 결과 표시 모드

  // 완료 후 세부 점수 계산
  const { detailCode, details } = useMemo(() => {
    if (!done) return { detailCode: null, details: null };

    const buckets = { TB: [], IP: [], CR: [], DS: [], MU: [] };
    answers.forEach((raw, i) => {
      const q = detailQuestions[i];
      if (!q) return;
      const v = q.reverse ? 6 - raw : raw; // 역채점 반영
      buckets[q.dimension].push(v);
    });

    const calc = {};
    DIM_ORDER.forEach((dim) => {
      const b = buckets[dim];
      const avg = b.length
        ? +(b.reduce((a, v) => a + v, 0) / b.length).toFixed(2)
        : 3.0;
      const rank = rankOf(avg);
      const label = RANK_LABELS[dim][rank];
      const letter = avg >= 3 ? LETTER_RULE[dim].high : LETTER_RULE[dim].low;
      calc[dim] = { avg, rank, label, letter };
    });

    const code = DIM_ORDER.map((d) => calc[d].letter).join("");
    return { detailCode: code, details: calc };
  }, [done, answers]);

  const progress = ((current + 1) / detailQuestions.length) * 100;
  const q = detailQuestions[current];

  const select = (value) => {
    if (done) return;
    const next = [...answers, value];
    setAnswers(next);

    if (current < detailQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      // ✅ 완료: 결과 표시 모드로 전환
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    if (!done || !details) return;
    const textLines = DIM_ORDER.map((dim) => {
      const d = details[dim];
      return `${dim}: ${d.avg} (${d.label})`;
    }).join("\n");

    try {
      if (navigator.share) {
        await navigator.share({
          title: "입맛 MBTI 세부 결과",
          text: `내 서브 지표\n${textLines}`,
          url: window.location.href,
        });
      } else {
        alert("이 브라우저는 공유 기능을 지원하지 않아요 😥");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 메인 결과로 돌아가기 (baseType 없으면 홈으로)
  const goBackToResult = () => {
    if (baseType) {
      navigate("/result", {
        state: { mbtiType: baseType, answers: baseAnswers },
      });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-2xl mx-auto p-6 bg-card text-card-foreground rounded-lg border border-border shadow-card">
        {!done ? (
          <>
            <h1 className="text-2xl font-medium mb-3">
              🔎 입맛 MBTI 세부 검사
            </h1>
            <Progress value={progress} />
            <div className="text-xs text-muted-foreground text-right mb-6">
              {current + 1} / {detailQuestions.length}
            </div>

            <div className="text-lg font-medium mb-6">{q.question}</div>

            <div className="flex flex-col gap-3">
              {q.options.map((opt, idx) => (
                <Button
                  key={idx}
                  type="button"
                  className="w-full text-left bg-surface hover:bg-muted text-foreground border border-border"
                  onClick={() => select(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium mb-2">✅ 세부 결과</h1>
            <p className="text-muted-foreground mb-6">
              {baseType ? (
                <>
                  메인 유형{" "}
                  <span className="font-medium text-foreground">
                    {baseType}
                  </span>{" "}
                  기준으로 서브 지표를 보여드려요.
                </>
              ) : (
                "서브 지표를 확인해보세요."
              )}
            </p>

            {/* 요약 코드(세부 15문항만으로 계산한 보조 코드) */}
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">보조 코드</span>
              <div className="text-xl font-medium">{detailCode}</div>
            </div>

            {/* 차원별 리스트 */}
            <ul className="divide-y divide-border">
              {DIM_ORDER.map((dim) => {
                const d = details[dim];
                const icon =
                  dim === "TB"
                    ? "🔥"
                    : dim === "IP"
                      ? "🎲"
                      : dim === "CR"
                        ? "📸"
                        : dim === "DS"
                          ? "🚀"
                          : "✨";

                const name =
                  dim === "TB"
                    ? "Taste (T/B)"
                    : dim === "IP"
                      ? "Planning (I/P)"
                      : dim === "CR"
                        ? "Style (C/R)"
                        : dim === "DS"
                          ? "Venture (D/S)"
                          : "Culture (M/U)";

                return (
                  <li
                    key={dim}
                    className="py-4 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="font-medium">
                        {icon} {name}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {d.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium">{d.avg}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {d.rank}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* 액션 */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                type="button"
                onClick={handleShare}
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                결과 공유하기
              </Button>

              <Button
                type="button"
                onClick={goBackToResult}
                className="bg-secondary text-secondary-foreground hover:bg-accent"
              >
                메인 결과로 돌아가기
              </Button>

              <Button
                type="button"
                onClick={() => navigate("/")}
                className="border border-border bg-surface text-foreground hover:bg-muted"
              >
                처음으로
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
