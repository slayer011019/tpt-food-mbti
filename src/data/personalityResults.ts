// personalityResults.ts

export interface PersonalityResult {
  id: string;
  name: string;      // ✅ 타입 라벨 (통일)
  animal: string;    // ✅ 캐릭터 동물명(한국어)
  ogTitle: string;   // ✅ 자동 생성: "${ogAdj} ${animal}"
  description: string;
  recommendedFoods: string[];
  prompt: string;    // ✅ 자동 생성 (nano-banana 스타일 통일)
  colors: {
    primary: string;
    secondary: string;
  };
}

/**
 * ✅ rawResults: 변경 적고, 실수 적게 (name/ogTitle/prompt 제거)
 */
type RawPersonalityResult = Omit<PersonalityResult, "name" | "ogTitle" | "prompt">;

export const rawResults: RawPersonalityResult[] = [
  {
    id: "TICDM",
    animal: "햄스터",
    description: "강렬한 자극을 추구하며 직관적으로 새로운 맛 탐험",
    recommendedFoods: ["불닭볶음면", "치즈돈까스", "매운 닭발"],
    colors: { primary: "#EF4444", secondary: "#FCA5A5" }
  },
  {
    id: "TICDU",
    animal: "오리",
    description: "새로운 음식에 호기심 있지만 효율 중시",
    recommendedFoods: ["편의점 삼각김밥", "분식 떡볶이", "치킨마요덮밥"],
    colors: { primary: "#3B82F6", secondary: "#93C5FD" }
  },
  {
    id: "TICSM",
    animal: "말티즈",
    description: "매운맛과 예쁜 플레이팅을 동시에 즐김",
    recommendedFoods: ["마라샹궈", "불닭파스타", "고추장로제떡볶이"],
    colors: { primary: "#F59E0B", secondary: "#FDE68A" }
  },
  {
    id: "TICSU",
    animal: "판다",
    description: "SNS 속 예쁜 디저트와 트렌디한 맛 추구",
    recommendedFoods: ["크로플", "말차라떼", "크림브륄레"],
    colors: { primary: "#374151", secondary: "#9CA3AF" }
  },
  {
    id: "TIRDM",
    animal: "여우",
    description: "전통적인 맛 속에서 모험적인 조합을 탐험",
    recommendedFoods: ["에스프레소", "매운 피자", "클래식 파스타"],
    colors: { primary: "#EA580C", secondary: "#FED7AA" }
  },
  {
    id: "TIRDU",
    animal: "고래",
    description: "국경을 넘나드는 자유로운 미식 경험",
    recommendedFoods: ["타파스", "케밥", "세계 길거리 음식"],
    colors: { primary: "#1E40AF", secondary: "#93C5FD" }
  },
  {
    id: "TIRSM",
    animal: "러시안블루",
    description: "전통적이고 감성적인 깊이 있는 미식 경험",
    recommendedFoods: ["설렁탕", "장어덮밥", "갈비탕"],
    colors: { primary: "#6B7280", secondary: "#9CA3AF" }
  },
  {
    id: "TIRSU",
    animal: "기린",
    description: "익숙하지만 감성적인 요소로 변화를 즐김",
    recommendedFoods: ["아보카도베이글", "샐러드정식", "토스트"],
    colors: { primary: "#FBBF24", secondary: "#FDE68A" }
  },
  {
    id: "TPCDM",
    animal: "얼룩말",
    description: "공간과 분위기까지 완벽하게 계획",
    recommendedFoods: ["파인다이닝", "트러플파스타", "와인페어링"],
    colors: { primary: "#000000", secondary: "#FFFFFF" }
  },
  {
    id: "TPCDU",
    animal: "흑곰",
    description: "최신 트렌드를 빠르게 캐치해 실용적으로 즐김",
    recommendedFoods: ["브런치", "루프탑다이닝", "팝업레스토랑"],
    colors: { primary: "#92400E", secondary: "#D97706" }
  },
  {
    id: "TPCSM",
    animal: "수달",
    description: "달콤함과 합리적 가성비를 동시에 추구",
    recommendedFoods: ["허니갈릭치킨", "단호박피자", "고구마샐러드"],
    colors: { primary: "#0F766E", secondary: "#5EEAD4" }
  },
  {
    id: "TPCSU",
    animal: "부엉이",
    description: "계획적인 건강식과 실용성을 중시",
    recommendedFoods: ["밀프렙도시락", "닭가슴살샐러드", "건강식레스토랑"],
    colors: { primary: "#7C2D12", secondary: "#A3A3A3" }
  },
  {
    id: "TPRDM",
    animal: "너구리",
    description: "향토적이면서 자극적인 야식 탐험",
    recommendedFoods: ["막창", "육회비빔밥", "해장국"],
    colors: { primary: "#F59E0B", secondary: "#FBBF24" }
  },
  {
    id: "TPRDU",
    animal: "두더지",
    description: "편안하고 실용적인 향토음식 선호",
    recommendedFoods: ["백반", "된장찌개", "오징어볶음"],
    colors: { primary: "#92400E", secondary: "#FDE68A" }
  },
  {
    id: "TPRSM",
    animal: "라쿤",
    description: "로컬 감성과 정을 담은 따뜻한 미식",
    recommendedFoods: ["시골밥상", "묵은지찜", "직화구이"],
    colors: { primary: "#065F46", secondary: "#A7F3D0" }
  },
  {
    id: "TPRSU",
    animal: "코끼리",
    description: "전통적인 손맛과 안정감을 선호",
    recommendedFoods: ["잡채", "수제비", "김치전"],
    colors: { primary: "#6B7280", secondary: "#9CA3AF" }
  },
  {
    id: "BICDM",
    animal: "닭",
    description: "부드럽지만 새로운 조합을 탐험",
    recommendedFoods: ["에스닉카레", "이색디저트", "콘셉트카페"],
    colors: { primary: "#F59E0B", secondary: "#FCD34D" }
  },
  {
    id: "BICDU",
    animal: "미어캣",
    description: "효율적인 실용성을 중시하는 입맛",
    recommendedFoods: ["분식김밥", "냉모밀", "두부덮밥"],
    colors: { primary: "#F59E0B", secondary: "#FBBF24" }
  },
  {
    id: "BICSM",
    animal: "사막여우",
    description: "미묘한 차이를 즐기며 감성을 추구",
    recommendedFoods: ["티소믈리에코스", "퓨전디저트", "플레이트카페"],
    colors: { primary: "#EA580C", secondary: "#FED7AA" }
  },
  {
    id: "BICSU",
    animal: "알파카",
    description: "감성적이고 안정적인 공간 선호",
    recommendedFoods: ["오믈렛", "팬케이크", "하몽샌드위치"],
    colors: { primary: "#E5E7EB", secondary: "#F9FAFB" }
  },
  {
    id: "BIRDM",
    animal: "독수리",
    description: "전통적이면서 새로운 조합 도전",
    recommendedFoods: ["매콤순대볶음", "김치수플레", "된장크림파스타"],
    colors: { primary: "#7C3AED", secondary: "#C4B5FD" }
  },
  {
    id: "BIRDU",
    animal: "비버",
    description: "전통과 실용성을 조화롭게 고려",
    recommendedFoods: ["김밥세트", "샐러드", "실속정식"],
    colors: { primary: "#92400E", secondary: "#D97706" }
  },
  {
    id: "BIRSM",
    animal: "고슴도치",
    description: "전통적 음식에서 감성적 안정감을 느끼는 타입",
    recommendedFoods: ["연잎밥", "우엉조림", "홍시샐러드"],
    colors: { primary: "#92400E", secondary: "#D97706" }
  },
  {
    id: "BIRSU",
    animal: "거북이",
    description: "실용적이고 부드러운 한 끼 선호",
    recommendedFoods: ["카레라이스", "계란찜", "두부조림"],
    colors: { primary: "#065F46", secondary: "#A7F3D0" }
  },
  {
    id: "BPCDM",
    animal: "토끼",
    description: "부드럽지만 트렌디한 기획형",
    recommendedFoods: ["노포브런치", "샌드위치카페", "플랜테리어맛집"],
    colors: { primary: "#EC4899", secondary: "#F9A8D4" }
  },
  {
    id: "BPCDU",
    animal: "코알라",
    description: "계획적이고 효율적인 실용파",
    recommendedFoods: ["밀프렙식단", "홈쿡가정식", "헬시도시락"],
    colors: { primary: "#6B7280", secondary: "#D1D5DB" }
  },
  {
    id: "BPCSM",
    animal: "팬더개구리",
    description: "부드럽고 개성적인 탐색가",
    recommendedFoods: ["다채로운디저트", "버블티", "플레이트카페"],
    colors: { primary: "#10B981", secondary: "#A7F3D0" }
  },
  {
    id: "BPCSU",
    animal: "카피바라",
    description: "실용적이고 편안한 일상 미식",
    recommendedFoods: ["오트라떼", "토스트", "샐러드정식"],
    colors: { primary: "#F59E0B", secondary: "#FDE68A" }
  },
  {
    id: "BPRDM",
    animal: "사슴",
    description: "향토적이고 감성적인 로컬 미식",
    recommendedFoods: ["시골밥상", "묵은지찜", "직화구이"],
    colors: { primary: "#92400E", secondary: "#FBBF24" }
  },
  {
    id: "BPRDU",
    animal: "낙타",
    description: "전통적이고 실용적인 따뜻한 입맛",
    recommendedFoods: ["백반", "된장찌개", "오징어볶음"],
    colors: { primary: "#F59E0B", secondary: "#FBBF24" }
  },
  {
    id: "BPRSM",
    animal: "물개",
    description: "집밥과 안정감 있는 분위기 선호",
    recommendedFoods: ["계란말이", "멸치볶음", "콩나물국밥"],
    colors: { primary: "#0F766E", secondary: "#5EEAD4" }
  },
  {
    id: "BPRSU",
    animal: "오소리",
    description: "전통적이면서 안정적이고 실용적인 타입",
    recommendedFoods: ["잡채", "수제비", "김치전"],
    colors: { primary: "#92400E", secondary: "#D97706" }
  }
];

/**
 * ✅ name 통일 (타입 라벨)
 */
export const NAME_MAP: Record<string, string> = {
  TICDM: "핫미식 탐험형",
  TICDU: "핫실속형",
  TICSM: "매콤 감성형",
  TICSU: "트렌드 스윗형",

  TIRDM: "정통 모험형",
  TIRDU: "월드 미식형",
  TIRSM: "정통 낭만형",
  TIRSU: "데일리 감성형",

  TPCDM: "미식 디렉터형",
  TPCDU: "트렌드 플래너형",
  TPCSM: "스윗 가성비형",
  TPCSU: "헬시 플래너형",

  TPRDM: "로컬 모험형",
  TPRDU: "투박 실속형",
  TPRSM: "로컬 감성형",
  TPRSU: "할매손맛형",

  BICDM: "소프트 실험형",
  BICDU: "소프트 실속형",
  BICSM: "섬세 감성형",
  BICSU: "소프트 무드형",

  BIRDM: "정통 퓨전형",
  BIRDU: "중립 실용형",
  BIRSM: "잔잔 감성형",
  BIRSU: "포근 한끼형",

  BPCDM: "트렌드 기획형",
  BPCDU: "실용 플래너형",
  BPCSM: "유니크 감성형",
  BPCSU: "포근 일상형",

  BPRDM: "로컬 탐험형",
  BPRDU: "차분 실속형",
  BPRSM: "감성 홈쿡형",
  BPRSU: "든든 실용형"
};

/**
 * ✅ ogTitle 자동 생성용 형용사(톤 통일: ~한 / ~로운)
 * ogTitle = `${OG_ADJ_MAP[id]} ${animal}`
 */
export const OG_ADJ_MAP: Record<string, string> = {
  TICDM: "열정 가득한",
  TICDU: "알뜰한",
  TICSM: "감각 가득한",
  TICSU: "트렌디한",

  TIRDM: "멋스러운",
  TIRDU: "자유로운",
  TIRSM: "클래식한",
  TIRSU: "감성 가득한",

  TPCDM: "완벽한",
  TPCDU: "현명한",
  TPCSM: "유쾌한",
  TPCSU: "지혜로운",

  TPRDM: "야식에 강한",
  TPRDU: "담백한",
  TPRSM: "장난스러운",
  TPRSU: "든든한",

  BICDM: "개성 강한",
  BICDU: "호기심 가득한",
  BICSM: "섬세한",
  BICSU: "포근한",

  BIRDM: "우아한",
  BIRDU: "성실한",
  BIRSM: "따뜻한",
  BIRSU: "느긋한",

  BPCDM: "트렌디한",
  BPCDU: "나른한",
  BPCSM: "유니크한",
  BPCSU: "평화로운",

  BPRDM: "고요한",
  BPRDU: "차분한",
  BPRSM: "장난기 가득한",
  BPRSU: "든든한"
};

/**
 * ✅ nano-banana 스타일 통일 프롬프트
 */
const NEGATIVE =
  "no text, no watermark, no logo, no extra limbs, no deformed anatomy, no messy background, no blur, no low-res, no cropped head";

const buildPrompt = (params: {
  animalEn: string;
  foodPropEn: string;
  drinkPropEn: string;
  primary: string;
  secondary: string;
  extra?: string;
}) => {
  const { animalEn, foodPropEn, drinkPropEn, primary, secondary, extra } = params;

  return `
Studio product photo of a cute 3D vinyl figurine mascot (TPT series), ${animalEn}, big head and big eyes.
Centered, front-facing on a small cafe tabletop, holding a miniature ${foodPropEn} and a ${drinkPropEn}.
Minimal seamless background with a soft gradient using ${primary} and ${secondary}. Soft diffused lighting, gentle shadows, shallow depth of field, high detail, clean composition.
${extra ?? ""}
${NEGATIVE}
  `.trim();
};

/**
 * ✅ 타입별 프롬프트 메타 (음식/음료는 recommendedFoods의 1번을 최대한 반영)
 */
const PROMPT_META_MAP: Record<
  string,
  { animalEn: string; foodPropEn: string; drinkPropEn: string; extra?: string }
> = {
  TICDM: {
    animalEn: "hamster",
    foodPropEn: "fire chicken stir-fried noodles (buldak ramen)",
    drinkPropEn: "iced latte",
    extra: "Tiny spicy steam and a playful wink."
  },
  TICDU: {
    animalEn: "duck",
    foodPropEn: "convenience store triangle kimbap",
    drinkPropEn: "americano",
    extra: "Neat and practical props (small napkin)."
  },
  TICSM: {
    animalEn: "maltese dog (tiny chef hat)",
    foodPropEn: "mala stir-fry bowl (mala xiang guo) with pretty plating",
    drinkPropEn: "sparkling water",
    extra: "Add a small garnish and clean plating vibe."
  },
  TICSU: {
    animalEn: "panda",
    foodPropEn: "croffle with whipped cream",
    drinkPropEn: "matcha latte",
    extra: "Trendy cafe feel with subtle bokeh lights far behind."
  },

  TIRDM: {
    animalEn: "fox (stylish scarf)",
    foodPropEn: "spicy pizza slice",
    drinkPropEn: "espresso",
    extra: "Boutique cafe product photography vibe."
  },
  TIRDU: {
    animalEn: "whale (tiny sailor outfit)",
    foodPropEn: "tapas platter (mini olives and bite-size tapas)",
    drinkPropEn: "lemonade",
    extra: "Add a tiny travel postcard prop."
  },
  TIRSM: {
    animalEn: "Russian Blue cat",
    foodPropEn: "seolleongtang (Korean ox bone soup) in a small bowl",
    drinkPropEn: "hot tea",
    extra: "Calm, vintage mood but still clean product shot."
  },
  TIRSU: {
    animalEn: "giraffe",
    foodPropEn: "avocado bagel",
    drinkPropEn: "iced latte",
    extra: "Minimal, airy tabletop."
  },

  TPCDM: {
    animalEn: "zebra",
    foodPropEn: "truffle pasta (fine dining plating)",
    drinkPropEn: "wine glass (non-alcoholic grape juice)",
    extra: "Premium high-end vibe, super clean."
  },
  TPCDU: {
    animalEn: "black bear",
    foodPropEn: "brunch plate (croissant and eggs)",
    drinkPropEn: "coffee",
    extra: "Warm bakery mood."
  },
  TPCSM: {
    animalEn: "otter",
    foodPropEn: "honey garlic chicken (mini plate)",
    drinkPropEn: "milk tea",
    extra: "Playful smile, cozy casual vibe."
  },
  TPCSU: {
    animalEn: "owl (smart round glasses)",
    foodPropEn: "meal-prep lunch box (healthy bento with salad)",
    drinkPropEn: "black coffee",
    extra: "Very tidy, organized vibe. Add a tiny checklist card."
  },

  TPRDM: {
    animalEn: "tanuki (raccoon dog)",
    foodPropEn: "grilled gopchang (Korean grilled intestines) mini plate",
    drinkPropEn: "cola in a cup",
    extra: "Night-snack energy but keep background minimal."
  },
  TPRDU: {
    animalEn: "mole",
    foodPropEn: "Korean home-meal set (baekban) mini tray",
    drinkPropEn: "barley tea",
    extra: "Humble and warm, clean product composition."
  },
  TPRSM: {
    animalEn: "raccoon",
    foodPropEn: "rustic countryside meal tray",
    drinkPropEn: "hot tea",
    extra: "Warm cabin comfort, but still neat."
  },
  TPRSU: {
    animalEn: "elephant",
    foodPropEn: "japchae (glass noodles) mini plate",
    drinkPropEn: "warm tea",
    extra: "Stable and comforting, calm expression."
  },

  BICDM: {
    animalEn: "chicken",
    foodPropEn: "ethnic curry bowl",
    drinkPropEn: "iced tea",
    extra: "Add a quirky tiny pick flag prop."
  },
  BICDU: {
    animalEn: "meerkat",
    foodPropEn: "cold soba (naeng momil) mini bowl",
    drinkPropEn: "green tea",
    extra: "Practical and simple."
  },
  BICSM: {
    animalEn: "fennec fox",
    foodPropEn: "tea flight set (tea sommelier course) with tiny pastry",
    drinkPropEn: "hot tea",
    extra: "Delicate minimal plating."
  },
  BICSU: {
    animalEn: "alpaca (cozy scarf)",
    foodPropEn: "omelet plate",
    drinkPropEn: "hot milk",
    extra: "Extra cozy and fluffy texture."
  },

  BIRDM: {
    animalEn: "eagle",
    foodPropEn: "spicy sundae stir-fry (soondae-bokkeum) mini plate",
    drinkPropEn: "sparkling water",
    extra: "Regal, elegant vibe."
  },
  BIRDU: {
    animalEn: "beaver",
    foodPropEn: "kimbap set (neat mini tray)",
    drinkPropEn: "americano",
    extra: "Very tidy and practical."
  },
  BIRSM: {
    animalEn: "hedgehog",
    foodPropEn: "lotus leaf rice (yeonipbap) mini bowl",
    drinkPropEn: "hot tea",
    extra: "Warm traditional comfort."
  },
  BIRSU: {
    animalEn: "turtle",
    foodPropEn: "curry rice mini plate",
    drinkPropEn: "barley tea",
    extra: "Calm and slow vibe."
  },

  BPCDM: {
    animalEn: "rabbit",
    foodPropEn: "trendy sandwich",
    drinkPropEn: "oat latte",
    extra: "Dreamy but clean product shot."
  },
  BPCDU: {
    animalEn: "koala",
    foodPropEn: "meal-prep box (healthy lunch)",
    drinkPropEn: "black coffee",
    extra: "Sleepy calm expression, practical vibe."
  },
  BPCSM: {
    animalEn: "panda-frog hybrid (whimsical)",
    foodPropEn: "colorful dessert plate assortment",
    drinkPropEn: "bubble tea",
    extra: "Whimsical but believable as a vinyl figure."
  },
  BPCSU: {
    animalEn: "capybara",
    foodPropEn: "simple toast plate",
    drinkPropEn: "oat latte",
    extra: "Super peaceful vibe, soft smile."
  },

  BPRDM: {
    animalEn: "deer",
    foodPropEn: "rustic countryside meal tray",
    drinkPropEn: "hot tea",
    extra: "Rustic warmth, minimal clean background."
  },
  BPRDU: {
    animalEn: "camel",
    foodPropEn: "Korean home-meal set (baekban) mini tray",
    drinkPropEn: "barley tea",
    extra: "Calm, practical vibe."
  },
  BPRSM: {
    animalEn: "seal",
    foodPropEn: "rolled omelet (gyeran-mari) mini plate",
    drinkPropEn: "hot tea",
    extra: "Home-cook comfort, playful mood."
  },
  BPRSU: {
    animalEn: "badger",
    foodPropEn: "japchae (glass noodles) mini plate",
    drinkPropEn: "barley tea",
    extra: "Dependable and cozy, earthy warmth."
  }
};

const buildOgTitle = (animal: string, ogAdj: string) => `${ogAdj} ${animal}`;

/**
 * ✅ 최종 export: name/ogTitle/prompt 자동 생성
 */
export const personalityResults: PersonalityResult[] = rawResults.map((r) => {
  const name = NAME_MAP[r.id] ?? "미식 타입";
  const ogAdj = OG_ADJ_MAP[r.id] ?? "귀여운";
  const ogTitle = buildOgTitle(r.animal, ogAdj);

  const meta = PROMPT_META_MAP[r.id];
  const prompt = meta
    ? buildPrompt({
        ...meta,
        primary: r.colors.primary,
        secondary: r.colors.secondary
      })
    : buildPrompt({
        animalEn: "cute animal",
        foodPropEn: "dessert",
        drinkPropEn: "coffee",
        primary: r.colors.primary,
        secondary: r.colors.secondary
      });

  return { ...r, name, ogTitle, prompt };
});

/**
 * ✅ 개발 중 누락 체크 (Vite 기준)
 */
if (import.meta.env?.DEV) {
  const missing = rawResults
    .map((r) => r.id)
    .filter((id) => !(id in NAME_MAP) || !(id in OG_ADJ_MAP) || !(id in PROMPT_META_MAP));

  if (missing.length) {
    console.warn("[TPT] NAME/OG_ADJ/PROMPT_META 누락:", missing);
  }
}
