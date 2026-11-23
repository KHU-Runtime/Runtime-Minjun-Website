(function () {
  "use strict";
  const scene = document.getElementById("catScene");
  const screen = document.getElementById("screenCode");
  const toggle = document.getElementById("autoType");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const source = ['const club = "RUNTIME;";', '', 'function run() {', '  learn();', '  build();', '  share();', '}', '', 'run();'].join("\n");
  let index = motion.matches ? source.length : 6;
  let automatic = !motion.matches;
  let visible = true;
  let nextTimer, releaseTimer;
  function paint() {
    screen.textContent = source.slice(0, index).split("\n").slice(-4).join("\n");
    toggle.textContent = automatic ? "일시정지" : "자동 재생";
  }
  function step() {
    index = index % source.length + 1;
    if (!motion.matches) {
      scene.dataset.paw = index % 2 ? "left" : "right";
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => { delete scene.dataset.paw; }, 115);
    }
    paint();
  }
  function schedule() {
    clearTimeout(nextTimer);
    if (automatic && visible && !document.hidden && !document.querySelector("dialog[open]")) {
      nextTimer = setTimeout(() => { step(); schedule(); }, index === source.length ? 2600 : 220);
    }
  }
  function manual() { step(); schedule(); }
  document.getElementById("typeKey").addEventListener("click", manual);
  toggle.addEventListener("click", () => { automatic = !automatic; paint(); schedule(); });
  document.addEventListener("keydown", event => {
    if (visible && !document.hidden && !document.querySelector("dialog[open], .nav.is-open") &&
        event.key.length === 1 && event.key.trim() && !event.ctrlKey && !event.metaKey &&
        !event.altKey && !event.repeat && !event.target.closest("input,textarea,select,[contenteditable=true]")) manual();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(scene);
  }
  motion.addEventListener("change", () => { automatic = !motion.matches; if (motion.matches) index = source.length; paint(); schedule(); });
  document.addEventListener("visibilitychange", schedule);
  document.getElementById("openEditor").addEventListener("click", schedule);
  document.getElementById("codePreview").addEventListener("close", schedule);
  paint(); schedule();
})();
