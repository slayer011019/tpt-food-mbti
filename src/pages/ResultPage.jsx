// src/pages/ResultPage.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTypeDescription } from "../data/mbtiDescriptions";
import Card from "../components/Card";
import Button from "../components/Button";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // TasteTest 또는 TasteDetailTest에서 전달된 값
  const mbtiTypeRaw = location.state?.mbtiType || params.type || null;
  const mbtiType =
    mbtiTypeRaw && mbtiTypeRaw.length === 5 ? mbtiTypeRaw.toUpperCase() : null;
  const answers = location.state?.answers || [];
  const mbtiInfo = mbtiType ? getTypeDescription(mbtiType) : null;
  const isKnownType =
    mbtiInfo && mbtiInfo.title !== "알 수 없는 타입" && mbtiType;

  const handleShare = async () => {
    if (!mbtiInfo && !mbtiType) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "입맛 MBTI 결과",
          text: `🍴 나는 ${mbtiInfo?.title || mbtiType} 타입이래!`,
          url: window.location.href,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않아요 😥");
    }
  };

  const handleRestart = () => navigate("/");

  // ✅ 세부 검사 페이지로 이동 (하위 15문항)
  const handleDetailTest = () => {
    navigate("/taste-detail", {
      state: { baseType: mbtiType, baseAnswers: answers },
    });
  };

  // 결과가 없을 때(직접 /result 접속) 폴백
  if (!mbtiType || !isKnownType) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card text-card-foreground border border-border rounded-lg shadow-card p-6">
            <h1 className="text-2xl font-medium mb-2">
              결과를 확인할 수 없습니다
            </h1>
            <p className="text-muted-foreground mb-6">
              올바른 결과 링크가 아니거나 테스트가 완료되지 않았습니다.
            </p>
            <Button
              type="button"
              onClick={handleRestart}
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              테스트 시작하기
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-2xl mx-auto text-left p-0">
        <h1 className="text-2xl font-medium mb-2">🍽 입맛 MBTI 결과</h1>
        <p className="text-muted-foreground mb-6">
          당신은{" "}
          <span className="font-medium text-foreground">
            {mbtiInfo?.title || mbtiType}
          </span>{" "}
          타입이에요!
        </p>

        {mbtiInfo ? (
          <Card className="bg-card text-card-foreground border border-border rounded-lg shadow-card p-6">
            {/* 결과 이미지(있다면) */}
            {mbtiInfo.image && (
              <img
                src={mbtiInfo.image}
                alt={mbtiType}
                className="w-32 h-32 object-contain mb-4 mx-auto"
              />
            )}

            <h2 className="text-xl font-medium mb-2 text-center">
              {mbtiInfo.title}
            </h2>
            <p className="text-foreground/90 mb-6 whitespace-pre-line leading-relaxed text-center">
              {mbtiInfo.description}
            </p>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-lg text-primary">
                🍴 추천 음식 리스트
              </h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/90">
                {mbtiInfo.recommendations.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                type="button"
                onClick={handleShare}
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                결과 공유하기
              </Button>
              <Button
                type="button"
                onClick={handleDetailTest}
                className="bg-secondary text-secondary-foreground hover:bg-accent"
              >
                세부 검사하기
              </Button>
              <Button
                type="button"
                onClick={handleRestart}
                className="border border-border bg-muted text-foreground hover:bg-accent"
              >
                테스트 다시 하기
              </Button>
            </div>
          </Card>
        ) : (
          <p className="text-destructive mt-4">
            해당 유형에 대한 정보가 아직 준비되지 않았습니다. (유형: {mbtiType})
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
