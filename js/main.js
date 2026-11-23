/* =========================================================
   RUNTIME; - main.js
   화면별 동작 스크립트 (내용 수정은 js/data.js 에서 하세요)
   각 기능은 해당 요소가 있는 화면에서만 실행됩니다.
   ========================================================= */
(function () {
  "use strict";

  var DATA = window.RUNTIME_DATA || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CATS = DATA.archiveCategories || {};

  /* 데이터 문자열을 HTML에 안전하게 넣기 위한 처리 */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function catOf(item) { return item._cat || CATS[item.category] || { label: "활동", color: "#172B58", icon: "◆" }; }

  /* ---------------- 링크 설정 ---------------- */
  function setupLinks() {
    var links = DATA.links || {};
    $$(".js-insta").forEach(function (a) { if (links.instagram) a.href = links.instagram; });
  }

  /* ---------------- 헤더 / 메뉴 / 맨 위로 ---------------- */
  function setupHeader() {
    var header = $("#header");
    var toTop = $("#toTop");
    var burger = $("#hamburger");
    var nav = $("#nav");
    if (!header) return;

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-scrolled", y > 30);
      if (toTop) toTop.classList.toggle("is-show", y > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) toTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    function closeMenu() {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "메뉴 열기");
      document.body.classList.remove("is-locked");
    }
    burger.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
      document.body.classList.toggle("is-locked", open);
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) closeMenu(); });
  }

  /* ---------------- 홈 오른쪽 섹션 도트 ---------------- */
  function setupDots() {
    var dots = $(".dots");
    if (!dots || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        $$("a", dots).forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + id); });
        dots.classList.toggle("is-dark", entry.target.classList.contains("activity"));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("[data-section]").forEach(function (s) { io.observe(s); });
  }

  /* ---------------- 스크롤 등장 효과 ---------------- */
  function setupReveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- 홈: VS Code 창 코드 타이핑 ----------------
     색은 VS Code 기본 테마(Dark+)의 문법 색을 따릅니다 (css 의 .tk-* 참고) */
  function setupTyping() {
    var el = $("#typing");
    if (!el) return;
    var preview = $("#codePreview");
    var timer;
    function later(callback, delay) { timer = setTimeout(callback, delay); }
    $("#openEditor").addEventListener("click", function () {
      preview.showModal();
      if (!reduceMotion) restart();
    });
    preview.addEventListener("close", function () { clearTimeout(timer); });
    var linesBox = $("#codeLines");
    var lnEl = $("#codeLn");
    var cmdEl = $("#termCmd");
    var outEl = $("#termOut");
    var B = function (t) { return '<span class="tk-b">' + t + "</span>"; };
    var lines = [
      '<span class="tk-c">// 경희대학교 이과대학 IT 동아리</span>',
      '<span class="tk-k">const</span> <span class="tk-v">club</span> = <span class="tk-k">new</span> <span class="tk-t">Runtime</span>' + B("(") + '<span class="tk-s">"KHU"</span>' + B(")") + ";",
      "",
      '<span class="tk-v">club</span>.<span class="tk-f">learn</span>' + B("(") + '<span class="tk-s">"together"</span>' + B(")") + ";",
      '<span class="tk-v">club</span>.<span class="tk-f">build</span>' + B("(") + '<span class="tk-s">"your idea"</span>' + B(")") + ";",
      '<span class="tk-v">club</span>.<span class="tk-f">run</span>' + B("()") + ";"
    ];
    var CMD = "node runtime.js";
    var OUT = '<span class="tm-ok">✔ Welcome to RUNTIME;</span>';

    function setLineNumbers(count, active) {
      if (!linesBox) return;
      var html = "";
      for (var k = 1; k <= Math.max(count, 1); k++) html += "<li" + (k === active ? ' class="is-active"' : "") + ">" + k + "</li>";
      linesBox.innerHTML = html;
      if (lnEl) lnEl.textContent = active;
    }
    function render(done, partial) {
      var all = done.slice();
      if (partial !== null) all.push(partial + '<span class="caret"></span>');
      el.innerHTML = all.map(function (l) { return '<span class="code-line">' + (l || " ") + "</span>"; }).join("");
      setLineNumbers(all.length, all.length);
    }
    if (reduceMotion) {
      render(lines, null); cmdEl.textContent = CMD; outEl.innerHTML = OUT;
      return;
    }

    var li = 0, ci = 0, out = [];
    function closeTags(html) {
      var open = (html.match(/<span[^>]*>/g) || []).length;
      var close = (html.match(/<\/span>/g) || []).length;
      return html + new Array(Math.max(open - close, 0) + 1).join("</span>");
    }
    function typeCmd(i) {
      cmdEl.innerHTML = CMD.slice(0, i) + (i < CMD.length ? '<span class="caret"></span>' : "");
      if (i < CMD.length) return later(function () { typeCmd(i + 1); }, 45);
      later(function () { outEl.innerHTML = OUT; }, 350);
      later(restart, 4200);
    }
    function restart() {
      li = 0; ci = 0; out = [];
      cmdEl.innerHTML = '<span class="caret"></span>'; outEl.innerHTML = "";
      step();
    }
    function step() {
      if (li >= lines.length) { render(out, null); later(function () { typeCmd(0); }, 500); return; }
      var line = lines[li];
      if (line.charAt(ci) === "<") ci = line.indexOf(">", ci) + 1;
      else if (line.charAt(ci) === "&") ci = line.indexOf(";", ci) + 1;
      else ci++;
      if (ci > line.length) ci = line.length;
      render(out, closeTags(line.slice(0, ci)));
      if (ci >= line.length) { out.push(line); li++; ci = 0; later(step, line ? 320 : 120); }
      else later(step, 26 + Math.random() * 38);
    }
    render([], "");
    cmdEl.innerHTML = '<span class="caret"></span>';

  }

  /* ---------------- 동아리 정보 패널 (소개) ---------------- */
  function setupProfile() {
    var dl = $("#profileList");
    if (!dl) return;
    (DATA.profile || []).forEach(function (row) {
      var div = document.createElement("div");
      div.className = "panel__row";
      div.innerHTML = "<dt>" + esc(row.label) + "</dt><dd>" + esc(row.value) + "</dd>";
      dl.appendChild(div);
    });
  }

  /* ---------------- 홈: 활동 요약 카드 ---------------- */
  function setupHomeActivities() {
    var ul = $("#homeActs");
    if (!ul) return;
    (DATA.activities || []).forEach(function (a, i) {
      var li = document.createElement("li");
      li.className = "mini-act reveal";
      li.style.setProperty("--c", a.color || "#172B58");
      li.style.transitionDelay = (i * 0.08) + "s";
      li.innerHTML =
        '<a href="activity.html#' + esc(a.key || "") + '">' +
          '<span class="mini-act__num">0' + (i + 1) + "</span>" +
          '<em class="mini-act__en">' + esc(a.en) + "</em>" +
          '<strong class="mini-act__title">' + esc(a.title) + "</strong>" +
          '<span class="mini-act__desc">' + esc(a.short || "") + "</span>" +
          '<span class="mini-act__more">자세히 →</span>' +
        "</a>";
      ul.appendChild(li);
    });
  }

  /* ---------------- 활동 슬라이더 (활동 화면) ---------------- */
  function setupActivities() {
    var stage = $("#actStage");
    if (!stage) return;
    var acts = DATA.activities || [];
    var list = $("#actList");
    var wrap = $("#act");
    if (!acts.length) { wrap.style.display = "none"; return; }

    var current = 0, timer = null, DURATION = 6000, paused = false;
    list.style.setProperty("--n", acts.length);

    acts.forEach(function (a, i) {
      var li = document.createElement("li");
      li.innerHTML =
        '<button type="button" class="act__tab" role="tab" style="--c:' + esc(a.color || "#172B58") + '" aria-label="' + esc(a.title) + '">' +
        '<span class="act__tab-num">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="act__tab-txt"><strong>' + esc(a.title) + "</strong><em>" + esc(a.en) + "</em></span>" +
        "</button>";
      li.firstChild.addEventListener("click", function () { show(i, true); });
      list.appendChild(li);
    });
    var tabs = $$(".act__tab", list);

    function show(i, user) {
      current = (i + acts.length) % acts.length;
      var a = acts[current];
      var num = String(current + 1).padStart(2, "0");
      stage.innerHTML =
        '<article class="act-card" style="--c:' + esc(a.color || "#172B58") + '">' +
          '<div class="act-card__visual">' +
            '<p class="act-card__num">ACTIVITY ' + num + "</p>" +
            '<p class="act-card__name">' + esc(a.title) + "</p>" +
            '<p class="act-card__en">' + esc(a.en) + "</p>" +
          "</div>" +
          '<div class="act-card__body">' +
            '<span class="act-card__period">' + esc(a.period) + "</span>" +
            '<h3 class="act-card__title">' + esc(a.title) + "</h3>" +
            '<p class="act-card__desc">' + esc(a.desc) + "</p>" +
            '<ul class="act-card__tags">' + (a.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
          "</div>" +
        "</article>";
      tabs.forEach(function (t, k) {
        t.classList.toggle("is-active", k === current);
        t.setAttribute("aria-selected", String(k === current));
        t.classList.remove("is-playing");
      });
      if (user) paused = true; // 직접 고르면 자동 넘김 멈춤
      restart();
    }
    function restart() {
      clearTimeout(timer);
      if (paused || reduceMotion) return;
      var tab = tabs[current];
      void tab.offsetWidth;
      tab.style.setProperty("--dur", DURATION + "ms");
      tab.classList.add("is-playing");
      timer = setTimeout(function () { show(current + 1); }, DURATION);
    }

    $("#actPrev").addEventListener("click", function () { show(current - 1, true); });
    $("#actNext").addEventListener("click", function () { show(current + 1, true); });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1, true);
      if (e.key === "ArrowRight") show(current + 1, true);
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) restart(); else clearTimeout(timer); });
      }, { threshold: 0.3 }).observe(wrap);
    }

    // 홈 카드에서 activity.html#basic 처럼 들어오면 해당 활동부터 표시
    var hash = decodeURIComponent((location.hash || "").slice(1));
    var start = 0;
    acts.forEach(function (a, i) { if (a.key && a.key === hash) start = i; });
    show(start, !!hash && start >= 0 && acts[start].key === hash);
  }

  /* ---------------- 활동 일정 (학기 중 / 방학) ---------------- */
  function setupSchedule() {
    var box = $("#schedule");
    if (!box) return;
    var sc = DATA.schedule || {};
    $("#scheduleTitle").textContent = sc.title || "활동 일정";
    $("#scheduleNote").textContent = sc.note || "";
    box.innerHTML = (sc.periods || []).map(function (p, i) {
      return '<li class="term term--' + (i % 2 ? "b" : "a") + '">' +
          '<div class="term__head">' +
            '<em class="term__en">' + esc(p.en) + "</em>" +
            '<strong class="term__name">' + esc(p.name) + "</strong>" +
            '<span class="term__months">' + esc(p.months) + "</span>" +
          "</div>" +
          '<ul class="term__items">' +
            (p.items || []).map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") +
          "</ul>" +
        "</li>";
    }).join("");
  }

  /* ---------------- 지원: 배너 + 인스타/구글폼 버튼 ---------------- */
  function setupRecruit() {
    var r = DATA.recruit || {};
    var links = DATA.links || {};
    var hasForm = links.applyForm && /^https?:\/\//.test(links.applyForm);

    $$("[data-recruit-banner]").forEach(function (el) {
      el.className = "recruit-banner reveal";
      el.innerHTML =
        '<div class="recruit-banner__text">' +
          '<p class="recruit-banner__term">NOW RECRUITING</p>' +
          '<h3 class="recruit-banner__title">' + esc(r.title || "신규 부원 모집") + "</h3>" +
          '<p class="recruit-banner__desc">' + esc(r.desc || "") + "</p>" +
        "</div>" +
        '<img src="images/logo.png" alt="" class="recruit-banner__logo">';
    });

    $$("[data-cta]").forEach(function (el) {
      el.className = "cta-grid reveal";
      el.innerHTML =
        '<a class="cta cta--insta" href="' + esc(links.instagram || "#") + '" target="_blank" rel="noopener">' +
          '<span class="cta__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" class="fill"/></svg></span>' +
          '<span class="cta__body"><em>INSTAGRAM</em><strong>모집 공지 보러 가기</strong>' +
          "<span>모집 일정 · 공지 · 활동 소식을 확인하세요</span>" +
          '<span class="cta__handle">@khu_runtime</span></span>' +
          '<span class="cta__go" aria-hidden="true">↗</span>' +
        "</a>" +
        '<a class="cta cta--form' + (hasForm ? "" : " is-disabled") + '"' +
          (hasForm ? ' href="' + esc(links.applyForm) + '" target="_blank" rel="noopener"' : ' aria-disabled="true"') + ">" +
          '<span class="cta__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg></span>' +
          '<span class="cta__body"><em>GOOGLE FORM</em><strong>지원서 작성하기</strong>' +
          "<span>" + (hasForm ? "구글폼 지원서로 런타임에 지원하세요" : "지원서 링크 준비 중 · 모집 공지는 인스타그램에서 확인해 주세요") + "</span></span>" +
          '<span class="cta__go" aria-hidden="true">↗</span>' +
        "</a>";
    });

    var tl = $("#targetList");
    if (tl) (r.targets || []).forEach(function (t) {
      var li = document.createElement("li");
      li.className = "target reveal";
      li.innerHTML = "<h4>" + esc(t.title) + "</h4><p>" + esc(t.desc) + "</p>";
      tl.appendChild(li);
    });

    var sl = $("#stepList");
    if (sl) (r.steps || []).forEach(function (s) {
      var li = document.createElement("li");
      li.className = "step";
      li.innerHTML =
        '<p class="step__num">STEP ' + esc(s.step) + "</p>" +
        '<p class="step__title">' + esc(s.title) + "</p>" +
        '<p class="step__desc">' + esc(s.desc) + "</p>";
      sl.appendChild(li);
    });
  }

  /* ---------------- 아카이브 ---------------- */
  function thumbHTML(item, img) {
    var c = catOf(item);
    if (img) {
      return '<img class="arc-thumb__img" src="' + esc(img) + '" alt="' + esc(item.title) + '" loading="lazy">' +
        placeholderHTML(item, true);
    }
    return placeholderHTML(item, false);
  }
  function placeholderHTML(item, hidden) {
    var c = catOf(item);
    return '<span class="arc-ph' + (hidden ? " is-fallback" : "") + '" style="--c:' + esc(c.color) + '">' +
      '<span class="arc-ph__icon">' + esc(c.icon) + "</span>" +
      '<span class="arc-ph__txt">PHOTO COMING SOON</span></span>';
  }
  // 사진 파일을 못 찾으면 '사진 준비 중' 그림으로 대체
  function bindImgFallback(root) {
    $$("img.arc-thumb__img, img.lb__img, .lb__thumb img", root).forEach(function (img) {
      function fail() { img.classList.add("is-broken"); }
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail();
      img.addEventListener("error", fail);
    });
  }

  function cardHTML(item, href) {
    var c = catOf(item);
    var imgs = item.images || [];
    var tagOpen = href ? '<a class="arc-card" href="' + href + '"' : '<button type="button" class="arc-card"';
    var tagClose = href ? "</a>" : "</button>";
    return tagOpen + ' data-id="' + esc(item.id) + '" style="--c:' + esc(c.color) + '">' +
      '<span class="arc-thumb">' + thumbHTML(item, imgs[0]) +
        (imgs.length > 1 ? '<span class="arc-count">▣ ' + imgs.length + "</span>" : "") +
        (item.sample ? '<span class="arc-sample">예시</span>' : "") +
      "</span>" +
      '<span class="arc-info">' +
        '<span class="arc-meta"><span class="arc-cat">' + esc(c.label) + '</span><span class="arc-date">' + esc(item.date || "") + "</span></span>" +
        '<strong class="arc-title">' + esc(item.title) + "</strong>" +
      "</span>" +
    tagClose;
  }

  function setupHomeArchive() {
    var grid = $("#homeArchive");
    if (!grid) return;
    var items = (DATA.archive || []).slice(0, 4);
    if (!items.length) { grid.innerHTML = '<p class="arc-empty">아직 등록된 기록이 없어요.</p>'; return; }
    grid.innerHTML = items.map(function (it) {
      return '<li class="reveal">' + cardHTML(it, "archive.html#" + encodeURIComponent(it.id)) + "</li>";
    }).join("");
    bindImgFallback(grid);
  }

  function setupArchive() {
    var grid = $("#archiveGrid");
    if (!grid) return;
    var all = DATA.archive || [];
    var catBox = $("#archiveFilters");
    var countEl = $("#archiveCount");
    var current = "all";

    // 데이터에 있는 분류만 탭으로 표시
    var cats = Object.keys(CATS).filter(function (k) { return all.some(function (it) { return it.category === k; }); });
    catBox.innerHTML =
      '<button class="tab is-active" type="button" data-cat="all" aria-pressed="true">전체 <b>' + all.length + "</b></button>" +
      cats.map(function (k) {
        var n = all.filter(function (it) { return it.category === k; }).length;
        return '<button class="tab" type="button" data-cat="' + esc(k) + '" aria-pressed="false">' + esc(CATS[k].label) + " <b>" + n + "</b></button>";
      }).join("");

    function render() {
      var items = all.filter(function (it) { return current === "all" || it.category === current; });
      countEl.textContent = items.length;
      $$(".tab", catBox).forEach(function (t) {
        var on = t.getAttribute("data-cat") === current;
        t.classList.toggle("is-active", on); t.setAttribute("aria-pressed", String(on));
      });
      if (!items.length) { grid.innerHTML = '<li class="arc-empty">아직 등록된 기록이 없어요.</li>'; return; }
      grid.innerHTML = items.map(function (it, i) {
        return '<li class="arc-item" style="animation-delay:' + Math.min(i * 0.05, 0.4) + 's">' + cardHTML(it) + "</li>";
      }).join("");
      bindImgFallback(grid);
      $$(".arc-card", grid).forEach(function (btn) {
        btn.addEventListener("click", function () { openLightbox(btn.getAttribute("data-id")); });
      });
    }
    catBox.addEventListener("click", function (e) {
      var t = e.target.closest(".tab");
      if (t) { current = t.getAttribute("data-cat"); render(); }
    });
    render();

    // 홈에서 archive.html#아이디 로 들어오면 바로 열기
    var hash = decodeURIComponent((location.hash || "").slice(1));
    if (hash && all.some(function (it) { return it.id === hash; })) setTimeout(function () { openLightbox(hash); }, 300);
  }

  /* ---------------- 기수 이름 칩 (홈 띠, 아카이브 입구) ---------------- */
  function setupGenChips() {
    var hist = DATA.history || [];
    $$("#homeGens, #doorGens").forEach(function (el) {
      el.innerHTML = hist.map(function (h) { return "<i>" + esc(h.gen) + "</i>"; }).join("");
    });
  }

  /* ---------------- 런타임의 역사 문서 (history.html) ---------------- */
  var GEN_COLOR = "#2E4278";
  function setupHistoryDoc() {
    var doc = $("#hdoc");
    var tabsBox = $("#genTabs");
    if (!doc || !tabsBox) return;
    var hist = DATA.history || [];
    if (!hist.length) { doc.innerHTML = '<p class="arc-empty">아직 등록된 역사가 없어요.</p>'; return; }
    var last = hist.length - 1;

    tabsBox.innerHTML = hist.map(function (h, i) {
      return '<li><button type="button" class="hdoc-gen' + (i === last ? " is-latest" : "") + '" role="tab" data-i="' + i + '" aria-selected="false">' +
        '<span class="hdoc-gen__name">' + esc(h.gen) + "</span>" +
        '<span class="hdoc-gen__meta"><em>' + esc(h.year || "") + "</em>" + esc(h.slogan || "") + "</span>" +
        (i === last ? '<span class="hdoc-gen__now">NOW</span>' : "") +
      "</button></li>";
    }).join("");
    var tabs = $$(".hdoc-gen", tabsBox);

    function genCat(h) { return { label: h.gen, color: GEN_COLOR, icon: "◆" }; }

    function execHTML(e, i) {
      var initial = esc((e.role || "").charAt(0));
      return '<li><button type="button" class="exec" aria-expanded="false" data-e="' + i + '">' +
        '<span class="exec__photo">' +
          (e.photo ? '<img class="exec__img" src="' + esc(e.photo) + '" alt="' + esc(e.role + " " + e.name) + '" loading="lazy">' : "") +
          '<span class="exec__ph" aria-hidden="true">' + initial + "</span>" +
        "</span>" +
        '<span class="exec__role">' + esc(e.role) + "</span>" +
        '<strong class="exec__name">' + esc(e.name) + "</strong>" +
        '<span class="exec__info">' + esc(e.info || "") + "</span>" +
        '<span class="exec__more">소개 열기 <i aria-hidden="true">+</i></span>' +
        '<span class="exec__comment">' + esc(e.comment || "") + "</span>" +
      "</button></li>";
    }

    function photoHTML(p, i, h) {
      var item = { _cat: genCat(h), title: p.caption };
      return '<li><button type="button" class="hphoto" data-p="' + i + '">' +
        '<span class="arc-thumb">' + (p.src ? thumbHTML(item, p.src) : placeholderHTML(item, false)) + "</span>" +
        '<span class="hphoto__cap">' + esc(p.caption || "") + "</span>" +
      "</button></li>";
    }

    function section(no, id, title, inner) {
      return '<details class="hdoc__sec" id="' + id + '" open>' +
        '<summary><span class="hdoc__no">' + no + "</span>" + title + '<i class="hdoc__fold" aria-hidden="true"></i></summary>' +
        '<div class="hdoc__body">' + inner + "</div>" +
      "</details>";
    }

    function show(i, focusDoc) {
      var h = hist[i];
      var execs = h.executives || [];
      var photos = h.photos || [];
      tabs.forEach(function (t, k) {
        t.classList.toggle("is-active", k === i);
        t.setAttribute("aria-selected", String(k === i));
      });

      doc.innerHTML =
        '<header class="hdoc__head">' +
          '<p class="hdoc__path">런타임의 역사 <span>›</span> ' + esc(h.gen) + "</p>" +
          '<h2 class="hdoc__title"><b>' + esc(h.gen) + "</b> " + esc(h.slogan || "") +
            (i === last ? ' <span class="gen-now">NOW</span>' : "") +
            (h.sample ? ' <span class="arc-sample">예시</span>' : "") + "</h2>" +
          '<dl class="hdoc__meta">' +
            "<div><dt>연도</dt><dd>" + esc(h.year || "-") + "</dd></div>" +
            "<div><dt>활동 기간</dt><dd>" + esc(h.period || "-") + "</dd></div>" +
            "<div><dt>임원진</dt><dd>" + execs.length + "명</dd></div>" +
            "<div><dt>활동 사진</dt><dd>" + photos.length + "장</dd></div>" +
          "</dl>" +
          '<nav class="hdoc__toc" aria-label="문서 목차"><span>목차</span>' +
            '<a href="#doc-intro">1. 개요</a><a href="#doc-exec">2. 임원진 소개</a><a href="#doc-photo">3. 활동 사진</a>' +
          "</nav>" +
        "</header>" +
        section(1, "doc-intro", "개요",
          '<p class="hdoc__intro">' + esc(h.intro || "") + "</p>" +
          ((h.highlights || []).length
            ? '<h4 class="hdoc__sub">주요 활동</h4><ul class="hdoc__list">' + h.highlights.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"
            : "")) +
        section(2, "doc-exec", "임원진 소개",
          execs.length
            ? '<p class="hdoc__hint">카드를 누르면 임원진 소개가 펼쳐져요.</p><ul class="execs">' + execs.map(execHTML).join("") + "</ul>"
            : '<p class="hdoc__empty">등록된 임원진 정보가 없어요.</p>') +
        section(3, "doc-photo", "활동 사진",
          photos.length
            ? '<p class="hdoc__hint">사진을 누르면 크게 볼 수 있어요.</p><ul class="hphotos">' + photos.map(function (p, k) { return photoHTML(p, k, h); }).join("") + "</ul>"
            : '<p class="hdoc__empty">등록된 사진이 없어요.</p>') +
        '<footer class="hdoc__foot">' +
          (i > 0 ? '<button type="button" class="hdoc__step" data-go="' + (i - 1) + '">← ' + esc(hist[i - 1].gen) + " 문서</button>" : "<span></span>") +
          (i < last ? '<button type="button" class="hdoc__step hdoc__step--next" data-go="' + (i + 1) + '">' + esc(hist[i + 1].gen) + " 문서 →</button>" : "<span></span>") +
        "</footer>";

      // 문서가 펼쳐지는 효과
      doc.classList.remove("is-opening");
      void doc.offsetWidth;
      if (!reduceMotion) doc.classList.add("is-opening");

      // 이미지 못 찾으면 기본 그림
      $$("img.exec__img", doc).forEach(function (img) {
        img.addEventListener("error", function () { img.classList.add("is-broken"); });
      });
      bindImgFallback(doc);

      // 임원진 카드: 누르면 소개가 펼쳐짐
      $$(".exec", doc).forEach(function (b) {
        b.addEventListener("click", function () {
          var open = b.getAttribute("aria-expanded") !== "true";
          b.setAttribute("aria-expanded", String(open));
          $(".exec__more", b).firstChild.textContent = open ? "소개 닫기 " : "소개 열기 ";
        });
      });
      // 활동 사진: 누르면 크게 보기
      $$(".hphoto", doc).forEach(function (b) {
        b.addEventListener("click", function () {
          openGallery({
            _cat: genCat(h), title: h.gen + " 활동 사진", date: h.year, sample: h.sample,
            images: photos.map(function (p) { return p.src || ""; }),
            captions: photos.map(function (p) { return p.caption || ""; })
          }, +b.getAttribute("data-p"));
        });
      });
      $$(".hdoc__step", doc).forEach(function (b) {
        b.addEventListener("click", function () { go(+b.getAttribute("data-go"), true); });
      });
      // 목차 링크: 접힌 단락이면 펼친 뒤 이동
      $$(".hdoc__toc a", doc).forEach(function (a) {
        a.addEventListener("click", function () { var t = $(a.getAttribute("href")); if (t) t.open = true; });
      });
      if (focusDoc) doc.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }

    function go(i, scroll) {
      show(i, scroll);
      try { history.replaceState(null, "", "#gen-" + (i + 1)); } catch (e) { /* 무시 */ }
    }

    tabs.forEach(function (t) {
      t.addEventListener("click", function () { go(+t.getAttribute("data-i"), window.innerWidth <= 900); });
    });
    // history.html#gen-2 처럼 들어오면 해당 기수부터, 아니면 가장 최근 기수
    var m = /^#gen-(\d+)$/.exec(location.hash || "");
    var start = m ? Math.min(Math.max(+m[1] - 1, 0), last) : last;
    show(start, false);
  }

  /* ---------------- 아카이브 사진 보기 (라이트박스) ---------------- */
  var lb = null, lbItem = null, lbIndex = 0, lastFocus = null;
  function openLightbox(id) {
    var item = (DATA.archive || []).filter(function (it) { return it.id === id; })[0];
    if (item) openGallery(item, 0);
  }
  // item: { title, desc, date, images[], captions[], sample, category 또는 _cat }
  function openGallery(item, start) {
    lb = lb || $("#lightbox");
    if (!lb || !item) return;
    lbItem = item;
    lbIndex = start || 0;
    lastFocus = document.activeElement;
    var c = catOf(lbItem);
    lb.style.setProperty("--c", c.color);
    $("#lbCat").textContent = c.label;
    $("#lbDate").textContent = lbItem.date || "";
    $("#lbTitle").textContent = lbItem.title || "";
    $("#lbDesc").textContent = lbItem.desc || "";
    $("#lbSample").hidden = !lbItem.sample;
    renderLbImage();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    setTimeout(function () { $(".lb__close", lb).focus(); }, 50);
  }
  function renderLbImage() {
    var imgs = lbItem.images || [];
    var stage = $("#lbStage");
    var src = imgs[lbIndex];
    stage.innerHTML = src
      ? '<img class="lb__img" src="' + esc(src) + '" alt="' + esc(lbItem.title) + " 사진 " + (lbIndex + 1) + '">' + placeholderHTML(lbItem, true)
      : placeholderHTML(lbItem, false);
    if (lbItem.captions) $("#lbDesc").textContent = lbItem.captions[lbIndex] || "";
    bindImgFallback(stage);
    var multi = imgs.length > 1;
    $("#lbPrev").hidden = !multi;
    $("#lbNext").hidden = !multi;
    $("#lbCounter").textContent = imgs.length ? (lbIndex + 1) + " / " + imgs.length : "사진 준비 중";
    $("#lbThumbs").innerHTML = multi ? imgs.map(function (src, i) {
      return '<button type="button" class="lb__thumb' + (i === lbIndex ? " is-active" : "") + '" data-i="' + i + '" aria-label="' + (i + 1) + '번째 사진">' +
        (src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : "") + "</button>";
    }).join("") : "";
    bindImgFallback($("#lbThumbs"));
    $$(".lb__thumb", lb).forEach(function (b) {
      b.addEventListener("click", function () { lbIndex = +b.getAttribute("data-i"); renderLbImage(); });
    });
  }
  function moveLb(d) {
    var n = (lbItem.images || []).length;
    if (n < 2) return;
    lbIndex = (lbIndex + d + n) % n;
    renderLbImage();
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }
  function setupLightbox() {
    lb = $("#lightbox");
    if (!lb) return;
    $$("[data-close]", lb).forEach(function (el) { el.addEventListener("click", closeLightbox); });
    $("#lbPrev").addEventListener("click", function () { moveLb(-1); });
    $("#lbNext").addEventListener("click", function () { moveLb(1); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") moveLb(-1);
      if (e.key === "ArrowRight") moveLb(1);
    });
  }

  /* ---------------- FAQ ---------------- */
  function setupFaq() {
    var box = $("#faqList");
    if (!box) return;
    (DATA.faq || []).forEach(function (f, i) {
      var d = document.createElement("details");
      d.className = "faq-item";
      if (i === 0) d.open = true;
      d.innerHTML = "<summary>" + esc(f.q) + '</summary><p class="faq-item__a">' + esc(f.a) + "</p>";
      box.appendChild(d);
    });
  }

  /* ---------------- 실행 ---------------- */

  setupHeader();
  setupDots();
  setupProfile();
  setupHomeActivities();
  setupActivities();
  setupSchedule();
  setupRecruit();
  setupHomeArchive();
  setupArchive();
  setupGenChips();
  setupHistoryDoc();
  setupLightbox();
  setupFaq();
  setupLinks();   // 동적으로 만든 인스타 링크까지 적용
  setupTyping();
  setupReveal();  // 동적으로 만든 요소까지 포함하도록 마지막에 실행
})();
