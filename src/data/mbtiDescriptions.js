export const TYPE_DIMENSIONS = [
  ["T", "B"],
  ["I", "P"],
  ["C", "R"],
  ["D", "S"],
  ["M", "U"],
];

const TYPE_AXIS_KEYS = ["TB", "IP", "CR", "DS", "MU"];

const TYPE_AXIS_META = {
  TB: {
    title: "맛 선호도",
    T: {
      label: "강한 자극 추구형",
      detail:
        "매운맛, 진한 양념, 향신료처럼 존재감이 강한 맛에서 만족도가 높고 한 끼에도 확실한 임팩트를 원합니다.",
    },
    B: {
      label: "부드러운 균형형",
      detail:
        "과한 자극보다 담백하고 편안한 맛을 선호하며 오래 먹어도 질리지 않는 안정적인 조합을 좋아합니다.",
    },
  },
  IP: {
    title: "식사 스타일",
    I: {
      label: "즉흥 선택형",
      detail:
        "그날 기분이나 눈에 띈 메뉴에 끌리면 바로 움직이는 편이고 현장 분위기에 따라 선택이 달라집니다.",
    },
    P: {
      label: "계획 선택형",
      detail:
        "후기, 동선, 가격, 웨이팅까지 미리 살펴보고 실패 확률을 줄이는 선택을 선호합니다.",
    },
  },
  CR: {
    title: "비주얼 성향",
    C: {
      label: "감각적 연출형",
      detail:
        "플레이팅, 색감, 공간 분위기처럼 식사의 연출 요소를 중요하게 보고 경험 전체의 완성도를 따집니다.",
    },
    R: {
      label: "정통 본질형",
      detail:
        "겉모습보다 맛의 완성도와 기본기에 더 끌리며 투박해도 제대로 만든 음식을 높게 평가합니다.",
    },
  },
  DS: {
    title: "도전 성향",
    D: {
      label: "탐험 선호형",
      detail:
        "신메뉴, 낯선 조합, 한정판 같은 새로운 시도를 즐기며 실패 가능성도 경험의 일부로 받아들입니다.",
    },
    S: {
      label: "안정 선호형",
      detail:
        "검증된 메뉴와 익숙한 식당을 선호하고 예상 가능한 만족감을 더 중요하게 생각합니다.",
    },
  },
  MU: {
    title: "가치 기준",
    M: {
      label: "무드 중시형",
      detail:
        "맛뿐 아니라 인테리어, 음악, 서비스, 함께하는 분위기까지 포함해 식사의 기분을 중요하게 여깁니다.",
    },
    U: {
      label: "실용 중시형",
      detail:
        "가격, 포만감, 영양, 접근성처럼 실제 만족에 바로 연결되는 요소를 우선순위에 둡니다.",
    },
  },
};

const buildTraitBreakdown = (type) =>
  TYPE_AXIS_KEYS.map((axis, index) => {
    const letter = type[index];
    const axisMeta = TYPE_AXIS_META[axis];
    const traitMeta = axisMeta[letter];

    return {
      code: axis,
      title: axisMeta.title,
      label: traitMeta.label,
      detail: traitMeta.detail,
    };
  });

const ONE_LINE_COPY = {
  taste: {
    T: "자극이 분명한 메뉴에서 만족도가 빠르게 올라가고",
    B: "편안하고 균형 잡힌 메뉴에서 만족도가 오래 유지되고",
  },
  plan: {
    I: "그날 끌리는 선택을 믿는 편이며",
    P: "실패 확률이 낮은 선택을 미리 골라두는 편이며",
  },
  visual: {
    C: "비주얼과 완성도까지 취향 판단에 포함시키기 때문에",
    R: "겉모습보다 맛의 기본기와 완성도를 먼저 보기 때문에",
  },
  challenge: {
    D: "새로운 조합이나 요즘 뜨는 메뉴도 자연스럽게 소화합니다.",
    S: "익숙한 메뉴 안에서 가장 만족도가 높은 선택을 찾아갑니다.",
  },
};

const buildDetailedDescription = (type, profile) => {
  const valueTail =
    type[4] === "M"
      ? "분위기까지 좋은 한 끼에서 이 타입의 매력이 가장 선명하게 드러납니다."
      : "가성비와 만족도가 분명한 한 끼에서 이 타입의 장점이 가장 또렷하게 드러납니다.";

  return `${profile.title}는 ${ONE_LINE_COPY.taste[type[0]]} ${ONE_LINE_COPY.plan[type[1]]} ${ONE_LINE_COPY.visual[type[2]]} ${ONE_LINE_COPY.challenge[type[3]]} ${valueTail}`;
};

const TREND_POOLS = {
  TB: {
    T: [
      "마라크림 떡볶이",
      "청양 라구 파스타",
      "스파이시 미소 라멘",
      "고추장 버터 치킨",
    ],
    B: [
      "말차 바스크 치즈케이크",
      "그릭요거트 그래놀라 볼",
      "버터떡",
      "크림 수프 카레",
    ],
  },
  CR: {
    C: [
      "시즌 파르페",
      "소금빵 샌드",
      "오픈샌드 브런치 플레이트",
      "말차 디저트 플레이트",
    ],
    R: [
      "솥밥 정식",
      "들기름 메밀면",
      "제철 봄나물 비빔밥",
      "약과 아이스크림",
    ],
  },
  DS: {
    D: [
      "피스타치오 초콜릿 디저트",
      "김치 카츠산도",
      "트러플 들기름 막국수",
      "크림 마라 뇨끼",
    ],
    S: [
      "런던베이글 샌드위치",
      "사골 곰탕",
      "토마토 바질 파스타",
      "닭다리살 솥밥",
    ],
  },
  MU: {
    M: [
      "한옥 티룸 말차 세트",
      "버터바와 플랫화이트",
      "시그니처 칵테일 브런치",
      "LP바 나폴리탄",
    ],
    U: [
      "포케 볼",
      "닭가슴살 곡물 샐러드",
      "국밥 한상",
      "정식 도시락",
    ],
  },
};

const rotatePick = (items, offset) =>
  items.map((_, index) => items[(index + offset) % items.length]);

const buildTrendRecommendations = (type, fallbackRecommendations) => {
  const pools = [
    ...rotatePick(TREND_POOLS.TB[type[0]], type.charCodeAt(1) % TREND_POOLS.TB[type[0]].length),
    ...rotatePick(TREND_POOLS.CR[type[2]], type.charCodeAt(3) % TREND_POOLS.CR[type[2]].length),
    ...rotatePick(TREND_POOLS.DS[type[3]], type.charCodeAt(4) % TREND_POOLS.DS[type[3]].length),
    ...rotatePick(TREND_POOLS.MU[type[4]], type.charCodeAt(0) % TREND_POOLS.MU[type[4]].length),
    ...(Array.isArray(fallbackRecommendations) ? fallbackRecommendations : []),
  ];

  return [...new Set(pools)].slice(0, 3);
};

const buildRecommendationReason = (type, recommendations) => {
  const challengeText =
    type[3] === "D"
      ? "새로운 조합이나 시즌 메뉴도 부담 없이 시도해볼수록 만족도가 올라갑니다."
      : "검증된 대표 메뉴나 익숙한 조합을 고를수록 만족도가 안정적으로 유지됩니다.";
  const valueText =
    type[4] === "M"
      ? "특히 음식 맛과 함께 공간 분위기까지 살아 있는 장소에서 이 유형의 장점이 더 잘 드러납니다."
      : "특히 가격, 포만감, 접근성이 분명한 메뉴에서 이 유형의 강점이 더 잘 살아납니다.";

  return `${recommendations.join(", ")} 같은 메뉴가 잘 맞고, ${challengeText} ${valueText}`;
};

const buildLifestyleHighlights = (type) => {
  const tasteMoment =
    type[0] === "T"
      ? "컨디션을 확 끌어올리고 싶을 때 강한 맛으로 분위기를 전환하는 편입니다."
      : "편안하게 오래 먹을 수 있는 메뉴로 하루 리듬을 안정시키는 편입니다.";
  const placeMood =
    type[4] === "M"
      ? "맛집을 고를 때도 메뉴만큼 공간 무드와 머무는 기분을 중요하게 봅니다."
      : "분위기보다 동선, 가격, 포만감처럼 실제 만족을 좌우하는 조건을 먼저 봅니다.";
  const orderingStyle =
    type[1] === "I"
      ? "현장에서 끌리는 메뉴가 보이면 계획을 바꿔서라도 바로 시도할 가능성이 높습니다."
      : "미리 찾아본 대표 메뉴나 실패 확률이 낮은 선택지부터 확인하는 쪽에 가깝습니다.";

  return [
    { title: "잘 맞는 순간", detail: tasteMoment },
    { title: "어울리는 장소", detail: placeMood },
    { title: "주문 스타일", detail: orderingStyle },
  ];
};

const typeDescriptions = {
  // 1
  TICDM: {
    title: "매운 탐험형",
    description:
      "강렬한 자극을 추구하며 직관적으로 새로운 맛을 탐험하는 당신, 감성 넘치는 공간에서 특별한 미식을 경험하는 것을 좋아합니다.",
    recommendations: [
      "수제 스테이크",
      "트러플 파스타",
      "풍미 가득한 양념 갈비",
    ],
  },
  // 2
  TICDU: {
    title: "매운 실속형",
    description:
      "새로운 음식에 대한 호기심이 많지만, 효율과 실용성을 중시해 빠르고 확실한 맛의 만족을 추구합니다.",
    recommendations: ["편의점 꿀조합", "퀵 분식", "패스트 캐주얼 레스토랑"],
  },
  // 3
  TICSM: {
    title: "매운 무드형",
    description:
      "매운맛의 강렬한 자극 속에서 예쁘고 감성적인 플레이팅과 분위기까지 함께 즐기는 미식가입니다.",
    recommendations: ["마라샹궈", "불닭 파스타", "고추장 로제떡볶이"],
  },
  // 4
  TICSU: {
    title: "매운 밸런스형",
    description:
      "SNS 속 예쁜 비주얼과 트렌디한 맛을 찾아다니며, 실패 없는 디저트와 실용성을 추구합니다.",
    recommendations: ["크로플", "말차 라떼", "크림브륄레"],
  },
  // 5
  TIRDM: {
    title: "정통 취향 탐험형",
    description:
      "전통에 머무르지 않고 도전적인 조합과 이국적인 감성을 즐기는 미식 탐험가입니다.",
    recommendations: ["김치 타코", "크림 마라 떡볶이", "퓨전 초밥"],
  },
  // 6
  TIRDU: {
    title: "정통 실속형",
    description:
      "음식의 국경을 넘나들며 지역적, 문화적 경계를 뛰어넘는 자유롭고 실용적인 미식을 추구합니다.",
    recommendations: ["타파스", "케밥", "세계 길거리 음식"],
  },
  // 7
  TIRSM: {
    title: "정통 감성형",
    description:
      "전통적인 맛 속에서 감성적인 만족을 찾으며, 깊이 있는 미식 경험을 즐깁니다.",
    recommendations: ["설렁탕", "장어 덮밥", "갈비탕"],
  },
  // 8
  TIRSU: {
    title: "정통 편안형",
    description:
      "안정적이고 익숙한 식사를 선호하지만, 때로는 감성적인 요소로 변화를 즐깁니다.",
    recommendations: ["아보카도 베이글", "샐러드 정식", "토스트"],
  },
  // 9
  TPCDM: {
    title: "감각 미식형",
    description:
      "음식뿐 아니라 공간과 분위기까지 완벽하게 계획하며 감성적인 미식 경험을 추구합니다.",
    recommendations: ["파인다이닝 레스토랑", "트러플 파스타", "와인 페어링"],
  },
  // 10
  TPCDU: {
    title: "감각 실속형",
    description:
      "최신 트렌드를 빠르게 캐치하며 실용적이고 감각적인 식사를 계획적으로 즐깁니다.",
    recommendations: ["루프탑 다이닝", "브런치 카페", "팝업 레스토랑"],
  },
  // 11
  TPCSM: {
    title: "감각 균형형",
    description:
      "달콤한 맛과 예쁜 플레이팅을 좋아하며 합리적이고 계획적인 미식을 즐깁니다.",
    recommendations: ["허니 갈릭 치킨", "단호박 피자", "고구마 샐러드"],
  },
  // 12
  TPCSU: {
    title: "든든한 관리형",
    description:
      "식사를 계획적으로 관리하며 실용적이고 안정적인 선택 속에서도 감각적인 요소를 즐깁니다.",
    recommendations: ["밀프렙 도시락", "닭가슴살 샐러드", "건강식 레스토랑"],
  },
  // 13
  TPRDM: {
    title: "로컬 취향 탐험형",
    description:
      "지역 특색 있는 전통 음식에 매력을 느끼며, 자극적이고 개성 있는 맛을 좋아합니다.",
    recommendations: ["막창", "육회 비빔밥", "해장국"],
  },
  // 14
  TPRDU: {
    title: "로컬 실속형",
    description:
      "편하고 익숙한 향토음식, 실용적인 가정식을 즐기며, 사람과 함께 먹는 따뜻한 분위기를 선호합니다.",
    recommendations: ["백반", "된장찌개", "오징어볶음"],
  },
  // 15
  TPRSM: {
    title: "로컬 감성형",
    description:
      "로컬 감성과 정을 담은 식사를 좋아하며, 감성적인 분위기에서의 식사를 중요하게 생각합니다.",
    recommendations: ["시골밥상", "묵은지찜", "직화 구이"],
  },
  // 16
  TPRSU: {
    title: "로컬 편안형",
    description:
      "실용적인 식생활 속에서도 전통적인 정겨움과 감성을 잊지 않는 따뜻한 입맛입니다.",
    recommendations: ["잡채", "수제비", "김치전"],
  },
  // 17
  BICDM: {
    title: "은은한 탐험형",
    description:
      "낯선 음식에도 신중히 접근하지만 새로운 미식에 대한 탐구를 멈추지 않는 사람입니다.",
    recommendations: ["에스닉 카레", "새로운 콘셉트 카페", "이색 조합 디저트"],
  },
  // 18
  BICDU: {
    title: "은은한 실속형",
    description:
      "계획은 하지만 때때로 실용적인 모험을 즐기며 입맛의 효율성을 중시하는 타입입니다.",
    recommendations: ["푸드트럭", "현지인 맛집", "가성비 메뉴"],
  },
  // 19
  BICSM: {
    title: "은은한 감성형",
    description:
      "미묘한 맛의 차이를 느끼는 섬세함과 감성적인 분위기를 함께 추구하는 당신.",
    recommendations: [
      "티 소믈리에 코스",
      "다채로운 퓨전 디저트",
      "플레이트 카페",
    ],
  },
  // 20
  BICSU: {
    title: "은은한 편안형",
    description:
      "자극보다는 부드러운 맛을 선호하며, 감성적이고 안정적인 공간에서 식사하는 것을 즐깁니다.",
    recommendations: ["오믈렛", "플레인 팬케이크", "하몽 샌드위치"],
  },
  // 21
  BIRDM: {
    title: "담백한 탐험형",
    description:
      "전통적인 맛을 중시하면서도 새로운 조합이나 재료에 도전하는 탐색형 입맛입니다.",
    recommendations: ["매콤 순대볶음", "김치 수플레", "된장 크림 파스타"],
  },
  // 22
  BIRDU: {
    title: "담백한 실속형",
    description:
      "과하지 않은 자극과 전통적인 조합, 그리고 실용성까지 조화롭게 고려하는 입맛입니다.",
    recommendations: ["분식집 김밥", "냉모밀", "두부 덮밥"],
  },
  // 23
  BIRSM: {
    title: "담백한 감성형",
    description:
      "부드럽고 전통적인 음식에서 감성적 안정감을 느끼며, 조용한 맛을 좋아하는 타입입니다.",
    recommendations: ["연잎밥", "우엉조림", "홍시 샐러드"],
  },
  // 24
  BIRSU: {
    title: "담백한 편안형",
    description:
      "실용적이고 부드러운 맛에 익숙한 타입으로, 위로가 되는 식사를 추구합니다.",
    recommendations: ["카레라이스", "계란찜", "두부조림"],
  },
  // 25
  BPCDM: {
    title: "부드러운 미식형",
    description:
      "부드러운 맛을 선호하지만 트렌디하고 감각적인 식사 경험을 계획하며 추구합니다.",
    recommendations: ["노포 브런치", "샌드위치 카페", "플랜테리어 맛집"],
  },
  // 26
  BPCDU: {
    title: "부드러운 실속형",
    description:
      "실용적인 구성과 부드러운 맛 조합을 중심으로 식사를 기획하고 관리하는 타입입니다.",
    recommendations: ["밀프렙 식단", "홈쿡 가정식", "헬시 도시락"],
  },
  // 27
  BPCSM: {
    title: "부드러운 감성형",
    description:
      "감성을 담은 부드러운 맛을 계획적으로 즐기며, 실속 있는 메뉴 구성이 좋습니다.",
    recommendations: ["토마토 수프", "치킨 크림 스튜", "햄에그 토스트"],
  },
  // 28
  BPCSU: {
    title: "부드러운 일상형",
    description:
      "꾸밈없고 실용적인 식사에서 따뜻함과 안정감을 추구하는, 일상 중심의 입맛입니다.",
    recommendations: ["카페 오트라떼", "잉글리시 머핀", "미역국"],
  },
  // 29
  BPRDM: {
    title: "일상 취향 탐험형",
    description:
      "가정식 중심의 실용적 식사를 선호하며, 익숙한 맛에서 편안함을 느낍니다.",
    recommendations: ["오이냉국", "계란말이", "멸치볶음"],
  },
  // 30
  BPRDU: {
    title: "일상 실속형",
    description:
      "튀지 않지만 따뜻하고 실용적인 한 끼를 중요하게 생각하는 타입입니다.",
    recommendations: ["콩나물국밥", "오트밀", "계란국"],
  },
  // 31
  BPRSM: {
    title: "일상 감성형",
    description:
      "집에서 스스로 꾸미는 식사에 감성을 담고자 하며, 안정적인 맛의 구성을 좋아합니다.",
    recommendations: ["팬케이크", "미트볼 파스타", "로제 리조또"],
  },
  // 32
  BPRSU: {
    title: "편안한 일상형",
    description:
      "전통적인 스타일 속에서도 감성적이거나 약간의 자극을 추가한 독특한 맛을 탐험합니다.",
    recommendations: ["트러플 감자튀김", "청양 소스 피자", "감자 그라탱"],
  },
};

const UNKNOWN_PROFILE = {
  title: "알 수 없는 타입",
  description: "이 타입에 대한 정보가 없습니다.",
  recommendations: [],
};

export const buildAllTypeCodes = () =>
  TYPE_DIMENSIONS.reduce(
    (acc, [a, b]) => acc.flatMap((prefix) => [`${prefix}${a}`, `${prefix}${b}`]),
    [""],
  );

export const ALL_TYPE_CODES = buildAllTypeCodes();

export const isValidTypeCode = (type) =>
  typeof type === "string" &&
  type.length === 5 &&
  ALL_TYPE_CODES.includes(type.toUpperCase());

export const getTypeDescription = (type) => {
  if (!isValidTypeCode(type)) return UNKNOWN_PROFILE;
  const normalizedType = type.toUpperCase();
  const profile = typeDescriptions[normalizedType] || UNKNOWN_PROFILE;

  return {
    ...profile,
    traitBreakdown: buildTraitBreakdown(normalizedType),
    detailedDescription: buildDetailedDescription(normalizedType, profile),
    recommendations: buildTrendRecommendations(
      normalizedType,
      profile.recommendations,
    ),
    recommendationReason: buildRecommendationReason(
      normalizedType,
      buildTrendRecommendations(normalizedType, profile.recommendations),
    ),
    lifestyleHighlights: buildLifestyleHighlights(normalizedType),
  };
};

export const validateTypeDescriptions = () => {
  const existing = Object.keys(typeDescriptions).sort();
  const expected = [...ALL_TYPE_CODES].sort();
  const missing = expected.filter((code) => !existing.includes(code));
  const extras = existing.filter((code) => !expected.includes(code));

  return {
    isValid: missing.length === 0 && extras.length === 0,
    missing,
    extras,
    count: existing.length,
  };
};

export default Object.freeze(typeDescriptions);
