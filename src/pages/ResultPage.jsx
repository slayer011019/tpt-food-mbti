// src/pages/ResultPage.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTypeDescription, isValidTypeCode } from "../data/mbtiDescriptions";
import Card from "../components/Card";
import Button from "../components/Button";
import WaveDivider from "../components/WaveDivider";
import { ANALYTICS_EVENTS, track } from "../utils/analytics";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // TasteTest 또는 TasteDetailTest에서 전달된 값
  const mbtiTypeRaw = location.state?.mbtiType || params.type || null;
  const mbtiType =
    mbtiTypeRaw && mbtiTypeRaw.length === 5 ? mbtiTypeRaw.toUpperCase() : null;
  const isValidType = isValidTypeCode(mbtiType);
  const answers = location.state?.answers || [];
  const mbtiInfo = isValidType ? getTypeDescription(mbtiType) : null;
  const isKnownType =
    mbtiInfo && mbtiInfo.title !== "알 수 없는 타입" && mbtiType;

  useEffect(() => {
    track(ANALYTICS_EVENTS.RESULT_VIEW, {
      has_type: Boolean(mbtiType),
      is_valid_type: isValidType,
      has_answer_state: answers.length > 0,
      source: params.type ? "route_param" : "state",
      mbti_type: isValidType ? mbtiType : "unknown",
    });
  }, [answers.length, isValidType, mbtiType, params.type]);

  const handleShare = async () => {
    if (!mbtiInfo && !mbtiType) return;
    if (navigator.share) {
      try {
        track(ANALYTICS_EVENTS.SHARE_CLICK, {
          flow: "result",
          method: "native_share",
          mbti_type: mbtiType || "unknown",
        });
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

  const handleRestartWithTrack = () => {
    track(ANALYTICS_EVENTS.RESTART_CLICK, {
      flow: "result",
      source: isKnownType ? "result_card" : "result_fallback",
    });
    navigate("/");
  };

  // ✅ 세부 검사 페이지로 이동 (하위 15문항)
  const handleDetailTest = () => {
    track(ANALYTICS_EVENTS.DETAIL_START_CLICK, {
      flow: "result",
      mbti_type: mbtiType || "unknown",
    });
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
              onClick={handleRestartWithTrack}
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
    <div className="min-h-screen bg-warmBg text-foreground px-4 py-8 sm:py-10">
      <div className="max-w-3xl mx-auto text-left p-0">
        <section className="relative overflow-hidden rounded-card bg-gradient-to-b from-deepGreen to-emerald-500 text-white shadow-softCard">
          <div className="pointer-events-none absolute -top-12 -left-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute top-10 -right-6 h-28 w-28 rounded-full bg-white/25 blur-xl" />
          <div className="pointer-events-none absolute bottom-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-white/15 blur-2xl" />

          <div className="relative px-6 pt-8 pb-2 sm:px-8 sm:pt-10">
            <div className="mx-auto w-fit rounded-pill bg-white/20 px-4 py-1 text-sm font-semibold tracking-wide">
              {mbtiType}
            </div>

            <div className="mt-4 flex justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm sm:h-36 sm:w-36">
                {mbtiInfo?.image ? (
                  <img
                    src={mbtiInfo.image}
                    alt={mbtiType}
                    className="h-24 w-24 object-contain sm:h-28 sm:w-28"
                  />
                ) : (
                  <span className="text-5xl" aria-hidden="true">
                    🐾
                  </span>
                )}
              </div>
            </div>
          </div>
          <WaveDivider />
        </section>

        {mbtiInfo ? (
          <Card className="-mt-2 p-6 sm:p-8">
            <h1 className="text-sm font-semibold tracking-wide text-textGray text-center">
              TASTE TYPE RESULT
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-3 text-center text-gray-900">
              {mbtiInfo.title}
            </h2>
            <p className="text-textGray mb-7 whitespace-pre-line leading-relaxed text-center max-w-2xl mx-auto">
              {mbtiInfo.description}
            </p>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-lg text-deepGreen">
                🍴 추천 음식 리스트
              </h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/90">
                {mbtiInfo.recommendations.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-card bg-pastelBlue/70 border border-borderGray p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                정밀 분석으로 업그레이드!
              </h3>
              <ul className="space-y-2 text-textGray">
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">🔍</span>
                  <span>5가지 차원을 세부 점수로 확인할 수 있어요.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">📊</span>
                  <span>강약 레벨과 성향 요약을 함께 보여드려요.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">🧭</span>
                  <span>메인 결과와 비교해 더 정밀한 취향을 파악해요.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                type="button"
                onClick={handleDetailTest}
                variant="primaryGradient"
              >
                정밀 분석 시작하기
              </Button>
              <Button
                type="button"
                onClick={handleShare}
                variant="solidGreen"
              >
                결과 공유하기
              </Button>
              <Button
                type="button"
                onClick={handleRestartWithTrack}
                variant="outline"
              >
                다시 테스트하기
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
