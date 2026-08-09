/* ═══════════════════════════════════════════════════════════
   Breathe with me — site-wide persistent FAB + overlay.

   Self-contained. Inject this script on any page and it adds:
     1. A small pulsing "Breathe" pill in the bottom-left,
        stacked above the Tonight FAB.
     2. A full-screen navy overlay that opens on click and
        runs the 4-4-6 breathing cycle until dismissed.

   The overlay layout:
       Breathe with me · Round 1 of 3         (eyebrow)
       Breathe in / Hold / Breathe out        (phase text — above pulse)
       (large green pulsing orb)              (with the countdown digit
                                               centred inside)

   Skipped on tonight.html — that page has its own breathing
   tile (Option 03) with an identical overlay design.

   Honours prefers-reduced-motion via the site-wide media query
   in each page's <style>, which neutralises animation-duration
   for *, *::before, *::after.
   ═══════════════════════════════════════════════════════════ */

(function () {
  if (document.getElementById('breatheFab')) return;

  const css = `
    .breathe-fab {
      position: fixed;
      bottom: 76px;
      left: 18px;
      z-index: 199;
      background: rgba(14, 30, 58, 0.92);
      color: #FAF7F2;
      border: 1px solid rgba(139, 197, 63, 0.45);
      border-radius: 999px;
      padding: 9px 16px 9px 13px;
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 10.5px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: background 0.2s, transform 0.15s, border-color 0.2s;
    }
    .breathe-fab:hover, .breathe-fab:focus-visible {
      background: #0E1E3A;
      border-color: #8BC53F;
      transform: translateY(-2px);
      outline: none;
    }
    .breathe-fab .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #8BC53F;
      animation: breathe-fab-dot 5.5s ease-in-out infinite;
    }
    @keyframes breathe-fab-dot {
      0%, 100% { transform: scale(0.5); opacity: 0.5; }
      50%      { transform: scale(1.3); opacity: 1; }
    }
    @media (max-width: 720px) {
      .breathe-fab { bottom: 64px; padding: 8px 14px 8px 11px; font-size: 10px; }
      .breathe-fab .dot { width: 7px; height: 7px; }
    }

    /* ── Full-screen navy breathing overlay ── */
    .breathe-overlay {
      display: none;
      position: fixed; inset: 0;
      background: #0E1E3A;
      z-index: 300;
      padding: 32px 24px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      overflow: hidden;
    }
    .breathe-overlay.show { display: flex; }
    .breathe-overlay .eyebrow {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(250, 247, 242, 0.55);
      margin: 0 0 40px;
    }
    .breathe-overlay .eyebrow .sep { margin: 0 10px; color: rgba(139,197,63,0.7); }
    .breathe-overlay .eyebrow .round strong { color: #8BC53F; font-weight: 500; }
    .breathe-overlay .phase {
      font-family: "Newsreader", "Source Serif Pro", serif;
      font-style: italic;
      font-weight: 380;
      font-size: clamp(36px, 6.5vw, 68px);
      letter-spacing: -0.02em;
      color: #FAF7F2;
      margin: 0 0 36px;
      min-height: 1.1em;
      font-variation-settings: "opsz" 60;
      transition: opacity 0.4s ease;
    }
    .breathe-overlay .pulse-wrap {
      position: relative;
      width: clamp(220px, 40vw, 340px);
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .breathe-overlay .pulse {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(164, 220, 78, 0.85) 0%,
        rgba(139, 197, 63, 0.45) 42%,
        rgba(139, 197, 63, 0.1) 74%,
        transparent 100%
      );
      animation: breathe-pulse 14s ease-in-out infinite;
    }
    @keyframes breathe-pulse {
      0%, 100% {
        transform: scale(0.62);
        box-shadow: 0 0 30px rgba(139, 197, 63, 0.18);
        filter: brightness(0.85);
      }
      28% {
        transform: scale(1.3);
        box-shadow: 0 0 110px rgba(139, 197, 63, 0.6);
        filter: brightness(1.18);
      }
      57% {
        transform: scale(1.3);
        box-shadow: 0 0 110px rgba(139, 197, 63, 0.6);
        filter: brightness(1.18);
      }
    }
    .breathe-overlay .count {
      position: relative;
      z-index: 2;
      font-family: "Newsreader", "Source Serif Pro", serif;
      font-style: italic;
      font-weight: 500;
      font-size: clamp(120px, 20vw, 200px);
      line-height: 1;
      color: #FAF7F2;
      letter-spacing: -0.04em;
      font-variation-settings: "opsz" 72;
      text-shadow: 0 4px 24px rgba(14, 30, 58, 0.5);
      min-width: 1ch;
      text-align: center;
    }
    .breathe-overlay .count.pop { animation: breathe-count-pop 1s ease-out; }
    @keyframes breathe-count-pop {
      0%   { opacity: 0.45; transform: scale(0.78); }
      22%  { opacity: 1;    transform: scale(1.14); }
      100% { opacity: 1;    transform: scale(1); }
    }
    .breathe-overlay .close-btn {
      margin-top: 44px;
      background: transparent;
      color: #FAF7F2;
      border: 1px solid rgba(250, 247, 242, 0.22);
      padding: 11px 26px;
      border-radius: 999px;
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .breathe-overlay .close-btn:hover,
    .breathe-overlay .close-btn:focus-visible {
      border-color: #FAF7F2;
      background: rgba(250, 247, 242, 0.05);
      outline: none;
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.id = 'breatheStyles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // FAB (skip if a nav trigger already exists)
  const hasExistingTrigger = document.querySelector('[data-breathe-trigger]');
  let fab = null;
  if (!hasExistingTrigger) {
    fab = document.createElement('button');
    fab.id = 'breatheFab';
    fab.className = 'breathe-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Take 90 seconds to breathe with us');
    fab.title = 'Take 90 seconds to breathe';
    fab.innerHTML = '<span class="dot" aria-hidden="true"></span>Breathe';
    document.body.appendChild(fab);
  }

  // Overlay markup — phase text ABOVE the pulse, countdown INSIDE the pulse
  const overlay = document.createElement('div');
  overlay.id = 'breatheOverlay';
  overlay.className = 'breathe-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Breathing exercise');
  overlay.innerHTML = `
    <p class="eyebrow">
      Breathe with me<span class="sep">·</span><span class="round">Round <strong id="breatheRound">1</strong> of 3</span>
    </p>
    <p class="phase" id="breathePhase">Breathe in</p>
    <div class="pulse-wrap" aria-hidden="true">
      <div class="pulse"></div>
      <div class="count" id="breatheCount">4</div>
    </div>
    <button class="close-btn" type="button">Close</button>
  `;
  document.body.appendChild(overlay);

  const phaseEl = overlay.querySelector('#breathePhase');
  const countEl = overlay.querySelector('#breatheCount');
  const roundEl = overlay.querySelector('#breatheRound');
  const closeBtn = overlay.querySelector('.close-btn');
  const phases = ['Breathe in', 'Hold', 'Breathe out'];
  const durations = [4000, 4000, 6000];
  let i = 0;
  let round = 1;
  let phaseTimer = null;
  let countTimer = null;

  function setCount(n) {
    countEl.textContent = String(n);
    countEl.classList.remove('pop');
    void countEl.offsetWidth;
    countEl.classList.add('pop');
  }

  function startCountdown(durMs) {
    if (countTimer) clearInterval(countTimer);
    let n = Math.round(durMs / 1000);
    setCount(n);
    countTimer = setInterval(function () {
      n -= 1;
      if (n < 1) { clearInterval(countTimer); countTimer = null; return; }
      setCount(n);
    }, 1000);
  }

  function stopTimers() {
    if (phaseTimer) { clearTimeout(phaseTimer); phaseTimer = null; }
    if (countTimer) { clearInterval(countTimer); countTimer = null; }
  }

  function tick() {
    if (!overlay.classList.contains('show')) return;
    i = (i + 1) % 3;
    if (i === 0) {
      round += 1;
      if (round > 3) { close(); return; }
      roundEl.textContent = String(round);
    }
    phaseEl.textContent = phases[i];
    startCountdown(durations[i]);
    phaseTimer = setTimeout(tick, durations[i]);
  }

  function open() {
    i = 0;
    round = 1;
    roundEl.textContent = '1';
    phaseEl.textContent = phases[0];
    overlay.classList.add('show');
    startCountdown(durations[0]);
    phaseTimer = setTimeout(tick, durations[0]);
  }
  function close() {
    overlay.classList.remove('show');
    stopTimers();
  }

  if (fab) fab.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  document.querySelectorAll('[data-breathe-trigger]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      e.stopImmediatePropagation();
      e.preventDefault();
      close();
    }
  }, true);
})();
