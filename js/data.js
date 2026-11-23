/* =========================================================
   RUNTIME; 홈페이지 콘텐츠 설정 파일
   ---------------------------------------------------------
   ※ 이 파일만 고치면 홈페이지의 글 내용과 링크가 바뀝니다.
   ※ 활동 설명·연간 일정·FAQ 문구는 "예시"입니다.
     동아리 실제 내용에 맞게 다듬어 주세요.
   ※ 문자열은 큰따옴표(" ") 안에 쓰고, 항목 끝의 쉼표(,)를 지우지 마세요.
   ========================================================= */

window.RUNTIME_DATA = {

  /* ---------- 링크 ----------
     instagram : 인스타그램 주소 (모집 공지 버튼, 헤더·푸터 아이콘에 사용)
     applyForm : 구글폼 지원서 주소. 비워 두면 '지원서 링크 준비 중'으로 표시되고,
                 주소를 넣으면 '지원서 작성하기' 버튼이 활성화됩니다. */
  links: {
    instagram: "https://www.instagram.com/khu_runtime/",
    applyForm: ""
  },

  /* ---------- 동아리 기본 정보 (소개 섹션 오른쪽 패널) ---------- */
  profile: [
    { label: "소속", value: "경희대학교 이과대학" },
    { label: "분야", value: "IT · 개발 · 프로그래밍" },
    { label: "대상", value: "IT에 관심 있는 경희대 학생 누구나" },
    { label: "활동", value: "기초반 · 심화반 · 자격증&스터디 · 공모전" },
    { label: "SNS",  value: "@khu_runtime" }
  ],

  /* ---------- 지원 섹션 ---------- */
  recruit: {
    title: "RUNTIME; 신규 부원 모집",
    desc: "모집 일정과 공지는 인스타그램에서 가장 먼저 알려드려요.\n지원은 구글폼 지원서로 받습니다.",
    targets: [
      { title: "전공 무관",   desc: "이과대학 학생은 물론, IT에 관심 있는 경희대 학생이라면 누구나 지원할 수 있어요." },
      { title: "실력 무관",   desc: "코딩을 처음 시작하는 분도 환영해요. 기초반 세미나부터 함께 시작합니다." },
      { title: "꾸준한 참여", desc: "한 학기 동안 정기 활동에 성실히 참여할 수 있는 분을 찾아요." }
    ],
    // 지원 방법 (날짜 없이 순서만 안내)
    steps: [
      { step: "01", title: "모집 공지 확인",   desc: "인스타그램 @khu_runtime 에서 모집 공지를 확인해요." },
      { step: "02", title: "구글폼 지원서 작성", desc: "아래 '지원서 작성하기' 버튼으로 지원서를 제출해요." },
      { step: "03", title: "개별 연락",       desc: "지원서 확인 후 면접 등 다음 일정을 개별로 안내드려요." },
      { step: "04", title: "런타임 합류",     desc: "OT와 함께 런타임 활동을 시작해요!" }
    ]
  },

  /* ---------- 활동 (ACTIVITY) ----------
     key: 주소 뒤에 붙는 이름(activity.html#basic), short: 홈 화면 카드의 한 줄 설명
     icon: 카드에 표시할 짧은 기호, color: 카드 강조색 (클래식 블루 팔레트의 남색 단계 사용) */
  activities: [
    {
      key: "basic", short: "처음 시작하는 부원을 위한 세미나형 기초 과정",
      icon: "{ }", en: "BASIC", title: "기초반 (세미나)", color: "#172B58",
      period: "정기 세미나",
      desc: "프로그래밍을 처음 접하는 부원을 위한 세미나형 기초반입니다. 프로그래밍 언어 기초부터 개발 환경 설정까지, 차근차근 함께 배우며 개발의 첫걸음을 뗄 수 있어요.",
      tags: ["프로그래밍 기초", "세미나", "입문자 환영"]
    },
    {
      key: "advanced", short: "한 단계 더 깊은 주제를 실습으로 익히는 과정",
      icon: "</>", en: "ADVANCED", title: "심화반", color: "#2E4278",
      period: "정기 활동",
      desc: "기초를 다진 부원들이 한 단계 더 깊은 주제를 다루는 심화반입니다. 실습과 결과물 제작을 통해 실제로 쓸 수 있는 개발 실력을 키워요.",
      tags: ["심화 학습", "실습", "결과물 제작"]
    },
    {
      key: "study", short: "IT 자격증 취득과 분야별 스터디",
      icon: "✓", en: "CERTIFICATE & STUDY", title: "자격증 & 스터디", color: "#46578C",
      period: "팀별 자율",
      desc: "IT 자격증 취득을 목표로 함께 공부하고, 관심 분야별 스터디를 꾸려 서로 가르치고 배웁니다. 혼자 하기 어려운 공부도 함께라면 끝까지 갈 수 있어요.",
      tags: ["IT 자격증", "분야별 스터디", "함께 공부"]
    },
    {
      key: "contest", short: "교내외 공모전에 팀으로 도전",
      icon: "★", en: "CONTEST", title: "공모전 활동", color: "#5C6A9A",
      period: "수시",
      desc: "교내외 공모전과 대회에 팀을 꾸려 도전합니다. 아이디어를 기획하고 직접 구현하며 실전 경험과 수상 경력을 함께 쌓아요.",
      tags: ["공모전", "팀 프로젝트", "실전 경험"]
    }
  ],

  /* ---------- 활동 일정 (1학기 기준) ----------
     활동 페이지의 '활동 일정'에 표시됩니다. items에 항목을 추가/삭제하면 됩니다. */
  schedule: {
    title: "런타임의 한 학기, 이렇게 보내요!",
    note: "1학기를 기준으로 한 일정이에요. 세부 일정은 학기마다 조금씩 달라질 수 있어요.",
    periods: [
      { en: "SEMESTER", name: "학기 중", months: "3월 – 6월", items: ["세미나 활동", "MT", "다양한 번개 모임"] },
      { en: "VACATION", name: "방학",   months: "7월 – 8월", items: ["자격증 스터디", "공모전 참여"] }
    ]
  },

  /* ---------- 런타임의 역사 (history.html, 기수별 문서) ----------
     아카이브 화면에서 '런타임의 역사'를 누르면 열리는 문서 화면에 표시됩니다.
     위에서부터 1기 → 최신 기수 순서로 적고, 새 기수는 맨 아래에 추가하세요.
     gen / year / period : 기수 이름, 연도, 활동 기간
     slogan     : 그 기수를 한 줄로 소개하는 문장
     intro      : 개요 문단
     highlights : 주요 활동 목록
     executives : 임원진 — 회장·부회장·총무 3명 (role 직책, name 이름, info 학과·학번, comment 한마디,
                  photo 사진 경로 예) "images/history/4기-회장.jpg"  비워 두면 기본 그림)
     photos     : 활동 사진 (src 사진 경로, caption 설명). src 를 비워 두면 '사진 준비 중' 그림.
     sample     : true 이면 '예시' 표시. 실제 내용으로 바꾸면 지워 주세요.
     ※ 아래 연도·이름·문구는 모두 예시입니다. */
  history: [
    {
      gen: "1기", year: "2023", period: "2023.03 – 2024.02", sample: true,
      slogan: "런타임의 첫 실행",
      intro: "런타임이 처음 시작된 기수예요. 함께 코딩을 배우고 싶은 학생들이 모여 동아리의 기틀을 만들었어요.",
      highlights: ["런타임 동아리 출범", "첫 기초반 세미나 개설", "1기 부원 모집"],
      executives: [
        { role: "회장",     name: "OOO", info: "OO학과 · 23학번", comment: "1기 런타임을 이끈 회장입니다. (예시 문구)", photo: "" },
        { role: "부회장",   name: "OOO", info: "OO학과 · 23학번", comment: "회장과 함께 동아리 운영을 맡았어요. (예시 문구)", photo: "" },
        { role: "총무",     name: "OOO", info: "OO학과 · 23학번", comment: "회비와 일정 관리를 맡았어요. (예시 문구)", photo: "" }
      ],
      photos: [
        { src: "", caption: "1기 첫 모임" },
        { src: "", caption: "1기 세미나" },
        { src: "", caption: "1기 MT" },
        { src: "", caption: "1기 종강총회" }
      ]
    },
    {
      gen: "2기", year: "2024", period: "2024.03 – 2025.02", sample: true,
      slogan: "함께 만드는 첫 결과물",
      intro: "기초반과 심화반이 자리 잡고, 처음으로 MT와 공모전에 도전한 기수예요.",
      highlights: ["기초반 · 심화반 운영", "첫 MT", "첫 공모전 참여"],
      executives: [
        { role: "회장",     name: "OOO", info: "OO학과 · 24학번", comment: "2기 런타임을 이끈 회장입니다. (예시 문구)", photo: "" },
        { role: "부회장",   name: "OOO", info: "OO학과 · 24학번", comment: "회장과 함께 동아리 운영을 맡았어요. (예시 문구)", photo: "" },
        { role: "총무",     name: "OOO", info: "OO학과 · 24학번", comment: "회비와 일정 관리를 맡았어요. (예시 문구)", photo: "" }
      ],
      photos: [
        { src: "", caption: "2기 첫 모임" },
        { src: "", caption: "2기 세미나" },
        { src: "", caption: "2기 MT" },
        { src: "", caption: "2기 종강총회" }
      ]
    },
    {
      gen: "3기", year: "2025", period: "2025.03 – 2026.02", sample: true,
      slogan: "더 넓어진 런타임",
      intro: "자격증 스터디가 생기고, 다양한 번개 모임으로 부원들이 더 가까워진 기수예요.",
      highlights: ["자격증 & 스터디 시작", "다양한 번개 모임", "방학 공모전 참여"],
      executives: [
        { role: "회장",     name: "OOO", info: "OO학과 · 25학번", comment: "3기 런타임을 이끈 회장입니다. (예시 문구)", photo: "" },
        { role: "부회장",   name: "OOO", info: "OO학과 · 25학번", comment: "회장과 함께 동아리 운영을 맡았어요. (예시 문구)", photo: "" },
        { role: "총무",     name: "OOO", info: "OO학과 · 25학번", comment: "회비와 일정 관리를 맡았어요. (예시 문구)", photo: "" }
      ],
      photos: [
        { src: "", caption: "3기 첫 모임" },
        { src: "", caption: "3기 세미나" },
        { src: "", caption: "3기 MT" },
        { src: "", caption: "3기 종강총회" }
      ]
    },
    {
      gen: "4기", year: "2026", period: "2026.03 – 2027.02", sample: true,
      slogan: "지금의 런타임",
      intro: "지금 활동 중인 기수예요. 런타임의 새로운 기록을 함께 만들어 가고 있어요.",
      highlights: ["기초반 · 심화반 · 자격증 스터디 운영", "MT와 다양한 번개 모임", "방학 공모전 참여"],
      executives: [
        { role: "회장",     name: "OOO", info: "OO학과 · 26학번", comment: "4기 런타임을 이끈 회장입니다. (예시 문구)", photo: "" },
        { role: "부회장",   name: "OOO", info: "OO학과 · 26학번", comment: "회장과 함께 동아리 운영을 맡았어요. (예시 문구)", photo: "" },
        { role: "총무",     name: "OOO", info: "OO학과 · 26학번", comment: "회비와 일정 관리를 맡았어요. (예시 문구)", photo: "" }
      ],
      photos: [
        { src: "", caption: "4기 첫 모임" },
        { src: "", caption: "4기 세미나" },
        { src: "", caption: "4기 MT" },
        { src: "", caption: "4기 종강총회" }
      ]
    }
  ],

  /* ---------- 아카이브 (지금까지의 활동 · 사진) ----------
     category : "seminar"(세미나) | "mt"(MT) | "meetup"(번개 모임) | "study"(스터디) | "contest"(공모전)
     images   : images/archive 폴더에 사진을 넣고 경로를 적어 주세요. 여러 장 가능.
                예) images: ["images/archive/2026-mt-1.jpg", "images/archive/2026-mt-2.jpg"]
                비워 두면 '사진 준비 중' 그림이 대신 표시됩니다.
     sample   : true 이면 카드에 '예시' 표시가 붙습니다. 실제 기록으로 바꾸면 지워 주세요.
     위에 있을수록 최신 기록으로 보고, 홈 화면에는 위에서부터 4개가 표시됩니다. */
  archiveCategories: {
    seminar: { label: "세미나",   color: "#172B58", icon: "{ }" },
    mt:      { label: "MT",       color: "#2B3F72", icon: "♥" },
    meetup:  { label: "번개 모임", color: "#3F538A", icon: "✦" },
    study:   { label: "스터디",   color: "#5566A0", icon: "✓" },
    contest: { label: "공모전",   color: "#6B76AE", icon: "★" }
  },

  archive: [
    { id: "2026-2-seminar", category: "seminar", date: "2026.09", title: "2학기 기초반 세미나", sample: true,
      desc: "2학기 기초반 세미나를 시작했어요. 새로 들어온 부원들과 함께 프로그래밍 기초를 다졌습니다.", images: [] },
    { id: "2026-summer-contest", category: "contest", date: "2026.08", title: "여름방학 공모전 참여", sample: true,
      desc: "방학 동안 팀을 꾸려 공모전에 참여했어요. 아이디어 기획부터 구현까지 함께했습니다.", images: [] },
    { id: "2026-summer-study", category: "study", date: "2026.07", title: "방학 자격증 스터디", sample: true,
      desc: "방학 동안 자격증 취득을 목표로 스터디를 진행했어요.", images: [] },
    { id: "2026-meetup", category: "meetup", date: "2026.06", title: "종강 기념 번개 모임", sample: true,
      desc: "한 학기를 마무리하며 부원들과 번개 모임을 가졌어요.", images: [] },
    { id: "2026-mt", category: "mt", date: "2026.05", title: "1학기 MT", sample: true,
      desc: "부원들과 함께 MT를 다녀오며 더 가까워지는 시간을 보냈어요.", images: [] },
    { id: "2026-1-seminar", category: "seminar", date: "2026.03", title: "1학기 OT · 기초반 세미나", sample: true,
      desc: "신입 부원 OT와 함께 1학기 기초반 세미나를 시작했어요.", images: [] }
  ],

  /* ---------- 자주 묻는 질문 ---------- */
  faq: [
    { q: "코딩을 전혀 몰라도 지원할 수 있나요?", a: "네! 기초반 세미나가 있어 처음 시작하는 분도 충분히 따라올 수 있어요. 배우려는 의지가 가장 중요합니다." },
    { q: "이과대학 학생만 지원할 수 있나요?", a: "이과대학 기반 동아리지만, IT에 관심 있는 경희대학교 학생이라면 전공과 관계없이 지원할 수 있어요." },
    { q: "어떻게 지원하나요?", a: "인스타그램 @khu_runtime 의 모집 공지를 확인한 뒤, 구글폼 지원서로 지원하면 됩니다." },
    { q: "기초반과 심화반은 어떻게 나뉘나요?", a: "프로그래밍 경험에 따라 나뉘며, 자세한 기준은 모집 공지와 OT에서 안내드려요." },
    { q: "모집 기간이 아닐 때도 문의할 수 있나요?", a: "언제든 인스타그램 DM으로 문의해 주세요. 모집 소식도 인스타그램에서 가장 빠르게 확인할 수 있어요." }
  ]
};
