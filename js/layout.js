/* =========================================================
   RUNTIME; - layout.js
   모든 화면에 공통으로 들어가는 헤더(메뉴), 페이지 상단 배너,
   다음/이전 화면 이동 버튼, 푸터를 만듭니다.
   (화면 이동은 전환 애니메이션 없이 바로 이동합니다)
   ※ 메뉴 이름이나 화면 순서를 바꾸려면 아래 PAGES 만 고치면 됩니다.
   ========================================================= */
(function () {
  "use strict";

  /* 메뉴에 표시되는 화면 목록 (순서대로 표시) */
  var PAGES = [
    { key: "about",    href: "about.html",    en: "ABOUT",    ko: "동아리 소개",
      desc: "코드가 실행되는 순간처럼, 아이디어를 현실로 만드는 사람들" },
    { key: "activity", href: "activity.html", en: "ACTIVITY", ko: "동아리 활동",
      desc: "기초반부터 공모전까지, 런타임이 함께하는 활동을 소개합니다" },
    { key: "archive",  href: "archive.html",  en: "ARCHIVE",  ko: "아카이브",
      desc: "기수별 런타임의 역사와 지금까지의 활동 기록을 모았습니다" },
    { key: "recruit",  href: "recruit.html",  en: "RECRUIT",  ko: "동아리 지원",
      desc: "런타임과 함께할 새로운 부원을 기다립니다" },
    { key: "faq",      href: "faq.html",      en: "FAQ",      ko: "자주 묻는 질문",
      desc: "지원 전에 궁금한 점을 확인해 보세요" }
  ];
  window.RUNTIME_PAGES = PAGES;

  /* 메뉴에는 없지만 다른 화면 아래에 속한 화면 (parent: 상위 화면) */
  var SUBPAGES = [
    { key: "history", href: "history.html", parent: "archive", en: "HISTORY", ko: "런타임의 역사",
      desc: "1기부터 지금까지, 기수별로 정리한 런타임의 기록입니다" }
  ];

  var page = document.body.getAttribute("data-page") || "home";
  var current = PAGES.concat(SUBPAGES).filter(function (p) { return p.key === page; })[0];
  var parent = current && current.parent ? PAGES.filter(function (p) { return p.key === current.parent; })[0] : null;
  var menuKey = parent ? parent.key : page; // 하위 화면이면 상위 메뉴에 표시

  /* ---------------- 헤더 ---------------- */
  var navItems = PAGES.map(function (p) {
    var active = p.key === menuKey ? ' is-active" aria-current="page' : "";
    return '<li><a href="' + p.href + '" class="nav__link' + active + '" title="' + p.ko + '"><em>' + p.en + "</em></a></li>";
  }).join("");

  var header = document.getElementById("siteHeader");
  if (header) {
    header.outerHTML =
      '<header class="header" id="header">' +
        '<div class="header__inner">' +
          '<a href="index.html" class="logo" aria-label="RUNTIME; 홈으로">' +
            '<img src="images/logo.png" alt="" class="logo__mark">' +
            '<span class="logo__text">RUNTIME;<small>KHU IT CLUB</small></span>' +
          "</a>" +
          '<nav class="nav" id="nav" aria-label="주 메뉴">' +
            '<ul class="nav__list">' +
              '<li class="nav__home"><a href="index.html" class="nav__link' + (page === "home" ? ' is-active" aria-current="page' : "") + '"><em>HOME</em></a></li>' +
              navItems +
            "</ul>" +
          "</nav>" +
          '<div class="header__actions">' +
            '<a class="icon-btn js-insta" href="#" target="_blank" rel="noopener" aria-label="런타임 인스타그램 (새 창)">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" class="fill"/></svg>' +
            "</a>" +
            '<a href="recruit.html" class="btn btn--yellow btn--sm header__apply"><span>지원하기</span></a>' +
            '<button class="hamburger" id="hamburger" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="nav">' +
              "<span></span><span></span><span></span>" +
            "</button>" +
          "</div>" +
        "</div>" +
      "</header>";
  }

  /* ---------------- 하위 화면 상단 배너 ---------------- */
  var hero = document.getElementById("pageHero");
  if (hero && current) {
    hero.className = "page-hero";
    hero.innerHTML =
      '<div class="container page-hero__inner">' +
        '<nav class="crumb" aria-label="현재 위치"><a href="index.html">HOME</a><i>/</i>' +
          (parent ? '<a href="' + parent.href + '">' + parent.en + "</a><i>/</i>" : "") +
          "<span>" + current.ko + "</span></nav>" +
        '<p class="page-hero__en">' + current.en + "</p>" +
        '<h1 class="page-hero__ko">' + current.ko + "</h1>" +
        '<p class="page-hero__desc">' + current.desc + "</p>" +
      "</div>";
  }

  /* ---------------- 이전 / 다음 화면 버튼 ---------------- */
  var pageNav = document.getElementById("pageNav");
  if (pageNav && current) {
    var idx = PAGES.indexOf(current);
    var prev = parent || PAGES[idx - 1];
    var next = parent ? null : PAGES[idx + 1];
    pageNav.className = "page-nav";
    pageNav.innerHTML =
      '<div class="container page-nav__inner">' +
        (prev
          ? '<a class="page-nav__link page-nav__link--prev" href="' + prev.href + '"><small>← PREV</small><strong>' + prev.ko + "</strong></a>"
          : '<a class="page-nav__link page-nav__link--prev" href="index.html"><small>← HOME</small><strong>홈으로</strong></a>') +
        (next
          ? '<a class="page-nav__link page-nav__link--next" href="' + next.href + '"><small>NEXT →</small><strong>' + next.ko + "</strong></a>"
          : '<a class="page-nav__link page-nav__link--next" href="recruit.html"><small>JOIN US →</small><strong>지원하러 가기</strong></a>') +
      "</div>";
  }

  /* ---------------- 푸터 ---------------- */
  var footer = document.getElementById("siteFooter");
  if (footer) {
    footer.outerHTML =
      '<footer class="footer">' +
        '<div class="container footer__inner">' +
          '<div class="footer__brand">' +
            '<a href="index.html" class="logo logo--light">' +
              '<img src="images/logo.png" alt="" class="logo__mark">' +
              '<span class="logo__text">RUNTIME;<small>KHU IT CLUB</small></span>' +
            "</a>" +
            "<p>경희대학교 이과대학 IT 동아리 런타임</p>" +
          "</div>" +
          '<ul class="footer__links">' +
            PAGES.map(function (p) { return '<li><a href="' + p.href + '">' + p.ko + "</a></li>"; }).join("") +
            '<li><a class="js-insta" href="#" target="_blank" rel="noopener">Instagram ↗</a></li>' +
          "</ul>" +
        "</div>" +
        '<div class="container footer__bottom">' +
          "<p>© " + new Date().getFullYear() + " RUNTIME; All rights reserved.</p>" +
          "<p>본 사이트는 동아리 홍보용으로 제작된 비공식 로컬 페이지입니다.</p>" +
        "</div>" +
      "</footer>" +
      '<a href="#top" class="to-top" id="toTop" aria-label="맨 위로">↑</a>';
  }

})();
