const typeDescriptions = {
  // 1
  "TICDM": {
    title: "핫미식 탐험가",
    description: "강렬한 자극을 추구하며 직관적으로 새로운 맛을 탐험하는 당신, 감성 넘치는 공간에서 특별한 미식을 경험하는 것을 좋아합니다.",
    recommendations: ["수제 스테이크", "트러플 파스타", "풍미 가득한 양념 갈비"]
  },
  // 2
  "TICDU": {
    title: "핫실속러",
    description: "새로운 음식에 대한 호기심이 많지만, 효율과 실용성을 중시해 빠르고 확실한 맛의 만족을 추구합니다.",
    recommendations: ["편의점 꿀조합", "퀵 분식", "패스트 캐주얼 레스토랑"]
  },
  // 3
  "TICSM": {
    title: "매콤 감성러",
    description: "매운맛의 강렬한 자극 속에서 예쁘고 감성적인 플레이팅과 분위기까지 함께 즐기는 미식가입니다.",
    recommendations: ["마라샹궈", "불닭 파스타", "고추장 로제떡볶이"]
  },
  // 4
  "TICSU": {
    title: "트렌드 스윗러",
    description: "SNS 속 예쁜 비주얼과 트렌디한 맛을 찾아다니며, 실패 없는 디저트와 실용성을 추구합니다.",
    recommendations: ["크로플", "말차 라떼", "크림브륄레"]
  },
  // 5
  "TIRDM": {
    title: "퓨전 러버",
    description: "전통에 머무르지 않고 도전적인 조합과 이국적인 감성을 즐기는 미식 탐험가입니다.",
    recommendations: ["김치 타코", "크림 마라 떡볶이", "퓨전 초밥"]
  },
  // 6
  "TIRDU": {
    title: "월드 미식러",
    description: "음식의 국경을 넘나들며 지역적, 문화적 경계를 뛰어넘는 자유롭고 실용적인 미식을 추구합니다.",
    recommendations: ["타파스", "케밥", "세계 길거리 음식"]
  },
  // 7
  "TIRSM": {
    title: "정통 낭만러",
    description: "전통적인 맛 속에서 감성적인 만족을 찾으며, 깊이 있는 미식 경험을 즐깁니다.",
    recommendations: ["설렁탕", "장어 덮밥", "갈비탕"]
  },
  // 8
  "TIRSU": {
    title: "데일리 감성러",
    description: "안정적이고 익숙한 식사를 선호하지만, 때로는 감성적인 요소로 변화를 즐깁니다.",
    recommendations: ["아보카도 베이글", "샐러드 정식", "토스트"]
  },
  // 9
  "TPCDM": {
    title: "미식 디렉터",
    description: "음식뿐 아니라 공간과 분위기까지 완벽하게 계획하며 감성적인 미식 경험을 추구합니다.",
    recommendations: ["파인다이닝 레스토랑", "트러플 파스타", "와인 페어링"]
  },
  // 10
  "TPCDU": {
    title: "트렌드 플래너",
    description: "최신 트렌드를 빠르게 캐치하며 실용적이고 감각적인 식사를 계획적으로 즐깁니다.",
    recommendations: ["루프탑 다이닝", "브런치 카페", "팝업 레스토랑"]
  },
  // 11
  "TPCSM": {
    title: "스윗 가성비러",
    description: "달콤한 맛과 예쁜 플레이팅을 좋아하며 합리적이고 계획적인 미식을 즐깁니다.",
    recommendations: ["허니 갈릭 치킨", "단호박 피자", "고구마 샐러드"]
  },
  // 12
  "TPCSU": {
    title: "헬시 플래너",
    description: "식사를 계획적으로 관리하며 실용적이고 안정적인 선택 속에서도 감각적인 요소를 즐깁니다.",
    recommendations: ["밀프렙 도시락", "닭가슴살 샐러드", "건강식 레스토랑"]
  },
  // 13
  "TPRDM": {
    title: "로컬 모험가",
    description: "지역 특색 있는 전통 음식에 매력을 느끼며, 자극적이고 개성 있는 맛을 좋아합니다.",
    recommendations: ["막창", "육회 비빔밥", "해장국"]
  },
  // 14
  "TPRDU": {
    title: "투박 실속러",
    description: "편하고 익숙한 향토음식, 실용적인 가정식을 즐기며, 사람과 함께 먹는 따뜻한 분위기를 선호합니다.",
    recommendations: ["백반", "된장찌개", "오징어볶음"]
  },
  // 15
  "TPRSM": {
    title: "로컬 감성러",
    description: "로컬 감성과 정을 담은 식사를 좋아하며, 감성적인 분위기에서의 식사를 중요하게 생각합니다.",
    recommendations: ["시골밥상", "묵은지찜", "직화 구이"]
  },
  // 16
  "TPRSU": {
    title: "할매손맛러",
    description: "실용적인 식생활 속에서도 전통적인 정겨움과 감성을 잊지 않는 따뜻한 입맛입니다.",
    recommendations: ["잡채", "수제비", "김치전"]
  },
  // 17
  "BICDM": {
    title: "소프트 실험가",
    description: "낯선 음식에도 신중히 접근하지만 새로운 미식에 대한 탐구를 멈추지 않는 사람입니다.",
    recommendations: ["에스닉 카레", "새로운 콘셉트 카페", "이색 조합 디저트"]
  },
  // 18
  "BICDU": {
    title: "소프트 실속러",
    description: "계획은 하지만 때때로 실용적인 모험을 즐기며 입맛의 효율성을 중시하는 타입입니다.",
    recommendations: ["푸드트럭", "현지인 맛집", "가성비 메뉴"]
  },
  // 19
  "BICSM": {
    title: "섬세 감성러",
    description: "미묘한 맛의 차이를 느끼는 섬세함과 감성적인 분위기를 함께 추구하는 당신.",
    recommendations: ["티 소믈리에 코스", "다채로운 퓨전 디저트", "플레이트 카페"]
  },
  // 20
  "BICSU": {
    title: "소프트 무드러",
    description: "자극보다는 부드러운 맛을 선호하며, 감성적이고 안정적인 공간에서 식사하는 것을 즐깁니다.",
    recommendations: ["오믈렛", "플레인 팬케이크", "하몽 샌드위치"]
  },
  // 21
  "BIRDM": {
    title: "정통 모험가",
    description: "전통적인 맛을 중시하면서도 새로운 조합이나 재료에 도전하는 탐색형 입맛입니다.",
    recommendations: ["매콤 순대볶음", "김치 수플레", "된장 크림 파스타"]
  },
  // 22
  "BIRDU": {
    title: "중립 실용러",
    description: "과하지 않은 자극과 전통적인 조합, 그리고 실용성까지 조화롭게 고려하는 입맛입니다.",
    recommendations: ["분식집 김밥", "냉모밀", "두부 덮밥"]
  },
  // 23
  "BIRSM": {
    title: "잔잔 감성러",
    description: "부드럽고 전통적인 음식에서 감성적 안정감을 느끼며, 조용한 맛을 좋아하는 타입입니다.",
    recommendations: ["연잎밥", "우엉조림", "홍시 샐러드"]
  },
  // 24
  "BIRSU": {
    title: "포근 한끼러",
    description: "실용적이고 부드러운 맛에 익숙한 타입으로, 위로가 되는 식사를 추구합니다.",
    recommendations: ["카레라이스", "계란찜", "두부조림"]
  },
  // 25
  "BPCDM": {
    title: "트렌드 기획러",
    description: "부드러운 맛을 선호하지만 트렌디하고 감각적인 식사 경험을 계획하며 추구합니다.",
    recommendations: ["노포 브런치", "샌드위치 카페", "플랜테리어 맛집"]
  },
  // 26
  "BPCDU": {
    title: "실용 플래너",
    description: "실용적인 구성과 부드러운 맛 조합을 중심으로 식사를 기획하고 관리하는 타입입니다.",
    recommendations: ["밀프렙 식단", "홈쿡 가정식", "헬시 도시락"]
  },
  // 27
  "BPCSM": {
    title: "따뜻 감성러",
    description: "감성을 담은 부드러운 맛을 계획적으로 즐기며, 실속 있는 메뉴 구성이 좋습니다.",
    recommendations: ["토마토 수프", "치킨 크림 스튜", "햄에그 토스트"]
  },
  // 28
  "BPCSU": {
    title: "포근 일상러",
    description: "꾸밈없고 실용적인 식사에서 따뜻함과 안정감을 추구하는, 일상 중심의 입맛입니다.",
    recommendations: ["카페 오트라떼", "잉글리시 머핀", "미역국"]
  },
  // 29
  "BPRDM": {
    title: "집밥 러버",
    description: "가정식 중심의 실용적 식사를 선호하며, 익숙한 맛에서 편안함을 느낍니다.",
    recommendations: ["오이냉국", "계란말이", "멸치볶음"]
  },
  // 30
  "BPRDU": {
    title: "평온 실용러",
    description: "튀지 않지만 따뜻하고 실용적인 한 끼를 중요하게 생각하는 타입입니다.",
    recommendations: ["콩나물국밥", "오트밀", "계란국"]
  },
  // 31
  "BPRSM": {
    title: "감성 홈쿡러",
    description: "집에서 스스로 꾸미는 식사에 감성을 담고자 하며, 안정적인 맛의 구성을 좋아합니다.",
    recommendations: ["팬케이크", "미트볼 파스타", "로제 리조또"]
  },
  // 32
  "BPRSU": {
    title: "클래식 변주러",
    description: "전통적인 스타일 속에서도 감성적이거나 약간의 자극을 추가한 독특한 맛을 탐험합니다.",
    recommendations: ["트러플 감자튀김", "청양 소스 피자", "감자 그라탱"]
  }
};

export default typeDescriptions;

export const getTypeDescription = (type) => {
  // calculateMBTI에서 넘어오는 type은 이미 5자리 대문자 조합이므로, toUpperCase()는 선택사항
  return typeDescriptions[type] || {
    title: "알 수 없는 타입",
    description: "이 타입에 대한 정보가 없습니다.",
    recommendations: []
  };
};
