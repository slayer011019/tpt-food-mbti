// src/pages/ResultPage.jsx
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTypeDescription, isValidTypeCode } from "../data/mbtiDescriptions";
import { typeVisuals } from "../data/image";
import { calculateDetailProfile, DETAIL_DIMENSIONS } from "../utils/mbti";
import Card from "../components/Card";
import Button from "../components/Button";
import WaveDivider from "../components/WaveDivider";
import { ANALYTICS_EVENTS, track } from "../utils/analytics";

const HERO_THEMES = {
  T: "from-[#1f7a5b] via-[#19b47d] to-[#78d8ac]",
  B: "from-[#6276ff] via-[#7a92ff] to-[#b6c7ff]",
  D: "from-[#ff7a3d]/30 via-[#ffffff]/0 to-[#ffb067]/20",
  S: "from-[#6abf8a]/20 via-[#ffffff]/0 to-[#8fd3b6]/20",
};

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // TasteTest에서 전달된 값 또는 URL 파라미터
  const mbtiTypeRaw = location.state?.mbtiType || params.type || null;
  const mbtiType =
    mbtiTypeRaw && mbtiTypeRaw.length === 5 ? mbtiTypeRaw.toUpperCase() : null;
  const isValidType = isValidTypeCode(mbtiType);
  const answers = location.state?.answers || [];
  const mbtiInfo = isValidType ? getTypeDescription(mbtiType) : null;
  const isKnownType =
    mbtiInfo && mbtiInfo.title !== "알 수 없는 타입" && mbtiType;
  const detailProfile =
    location.state?.details && location.state?.detailCode
      ? {
          detailCode: location.state.detailCode,
          details: location.state.details,
        }
      : answers.length >= 25 && mbtiType
        ? calculateDetailProfile(answers, { baseType: mbtiType })
        : null;
  const lastTrackedResultKeyRef = useRef("");
  const visualInfo = mbtiType ? typeVisuals[mbtiType] : null;
  const heroTheme = mbtiType
    ? `${HERO_THEMES[mbtiType[0]] || HERO_THEMES.B} ${HERO_THEMES[mbtiType[3]] || HERO_THEMES.S}`
    : HERO_THEMES.B;
  const heroEmoji =
    mbtiType?.[0] === "T" ? "🌶️" : mbtiType?.[0] === "B" ? "🥛" : "🍽️";
  const heroAccent =
    mbtiType?.[4] === "M" ? "분위기까지 챙기는 타입" : "실속까지 계산하는 타입";

  useEffect(() => {
    const trackingKey = `${mbtiType || "unknown"}:${params.type ? "route_param" : "state"}:${answers.length}`;
    if (lastTrackedResultKeyRef.current === trackingKey) return;
    lastTrackedResultKeyRef.current = trackingKey;

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
          text: [
            `${heroEmoji} 나는 ${mbtiInfo?.title || mbtiType} (${mbtiType}) 타입!`,
            visualInfo?.animal
              ? `${visualInfo.animal} 캐릭터처럼 ${heroAccent}.`
              : heroAccent,
            `추천 메뉴: ${(mbtiInfo?.recommendations || []).slice(0, 2).join(", ")}`,
          ].join("\n"),
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
      <div className="max-w-6xl mx-auto text-left p-0">
        <section className={`relative overflow-hidden rounded-card bg-gradient-to-b ${heroTheme} text-white shadow-softCard`}>
          <div className="pointer-events-none absolute -top-12 -left-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute top-10 -right-6 h-28 w-28 rounded-full bg-white/25 blur-xl" />
          <div className="pointer-events-none absolute bottom-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.22),transparent_65%)]" />

          <div className="relative px-6 pt-8 pb-2 sm:px-8 sm:pt-10">
            <div className="mx-auto w-fit rounded-pill bg-white/20 px-4 py-1 text-sm font-semibold tracking-wide">
              {mbtiType}
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs font-semibold tracking-[0.22em] text-white/75">
                {visualInfo?.animal ? `${visualInfo.animal.toUpperCase()} MODE` : "TASTE MODE"}
              </p>
              <p className="mt-1 text-sm text-white/90">{heroAccent}</p>
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
                    {heroEmoji}
                  </span>
                )}
              </div>
            </div>
          </div>
          <WaveDivider />
        </section>

        {mbtiInfo ? (
          <Card className="-mt-2 p-6 sm:p-8 lg:p-10">
            <h1 className="text-sm font-semibold tracking-[0.18em] text-textGray text-center">
              TASTE TYPE REPORT
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-3 text-center text-gray-900">
              {mbtiInfo.title}
            </h2>
            <p className="text-textGray mb-3 whitespace-pre-line leading-relaxed text-center max-w-3xl mx-auto">
              {mbtiInfo.description}
            </p>
            <p className="text-sm text-textGray/90 mb-8 text-center max-w-2xl mx-auto">
              한 번의 검사로 타입 해석과 세부 성향까지 묶어서 읽을 수 있는 종합 리포트입니다.
            </p>

            <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-3">
              {mbtiInfo.traitBreakdown.map((trait) => (
                <div
                  key={trait.code}
                  className="rounded-card border border-borderGray bg-gradient-to-b from-white to-warmBg/60 p-4"
                >
                  <div className="text-xs font-semibold tracking-wide text-deepGreen/80 mb-1">
                    {trait.title}
                  </div>
                  <div className="text-base font-bold text-gray-900 mb-2">
                    {trait.label}
                  </div>
                  <p className="text-sm leading-relaxed text-textGray">
                    {trait.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-5 mb-6 items-stretch">
              <div className="rounded-card bg-pastelGreen/40 border border-borderGray p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  이 타입을 한 문장으로 말하면
                </h3>
                <p className="text-textGray leading-relaxed mb-3">
                  {mbtiInfo.detailedDescription}
                </p>
                <p className="text-textGray leading-relaxed">
                  {mbtiInfo.recommendationReason}
                </p>
              </div>

              <div className="rounded-card border border-borderGray bg-gradient-to-b from-white to-sky-50 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  생활형 해석
                </h3>
                <div className="space-y-3">
                  {mbtiInfo.lifestyleHighlights.map((item) => (
                    <div key={item.title} className="rounded-2xl bg-white/80 border border-white p-3">
                      <div className="text-xs font-semibold tracking-wide text-deepGreen/80 mb-1">
                        {item.title}
                      </div>
                      <p className="text-sm leading-relaxed text-textGray">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5 mb-6">
              <div className="rounded-card border border-borderGray bg-gradient-to-b from-white to-amber-50 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  종합 해석 포인트
                </h3>
                <p className="text-textGray leading-relaxed">
                  {visualInfo?.animal
                    ? `${visualInfo.animal} 캐릭터처럼 ${heroAccent.toLowerCase()} 성향이 분명하고, ${mbtiInfo.title} 특유의 선택 기준이 식사 취향 전반에 일관되게 나타납니다.`
                    : `${mbtiInfo.title} 특유의 선택 기준이 식사 취향 전반에 일관되게 나타납니다.`}
                </p>
              </div>

              <div className="rounded-card bg-pastelBlue/70 border border-borderGray p-5 mb-0">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  세부 성향 리포트
                </h3>
                {detailProfile?.details ? (
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-pill bg-white/80 px-4 py-2 text-sm">
                      <span className="text-textGray">세부 코드</span>
                      <span className="font-bold text-gray-900">
                        {detailProfile.detailCode}
                      </span>
                    </div>
                    {DETAIL_DIMENSIONS.map((dim) => (
                      <div
                        key={dim}
                        className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3"
                      >
                        <span className="text-sm font-semibold text-gray-900">
                          {mbtiInfo.traitBreakdown.find((item) => item.code === dim)?.title}
                        </span>
                        <span className="text-sm text-textGray">
                          {detailProfile.details[dim].avg}점 · {detailProfile.details[dim].label}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-textGray leading-relaxed">
                    새 검사 결과에서는 5가지 축 점수가 함께 제공됩니다.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
              <Button
                type="button"
                onClick={handleShare}
                variant="primaryGradient"
                className="w-full sm:w-auto min-w-44"
              >
                결과 공유하기
              </Button>
              <Button
                type="button"
                onClick={handleRestartWithTrack}
                variant="outline"
                className="w-full sm:w-auto min-w-44"
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
