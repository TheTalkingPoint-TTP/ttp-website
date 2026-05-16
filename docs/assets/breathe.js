/* ═══════════════════════════════════════════════════════════
   Breathe with me — site-wide persistent FAB.

   Self-contained. Inject this script on any page and it adds:
     1. A small pulsing "Breathe" pill in the bottom-left,
        stacked above the Tonight FAB.
     2. A full-screen overlay (same design as tonight.html
        Option 03) that opens on click and runs the 4-4-6
        breathing cycle until dismissed.

   Skipped on tonight.html — that page already has its own
   breathing tile (Option 03) so a second affordance would
   be redundant.

   Honours prefers-reduced-motion via the site-wide media query
   in each page's <style>, which neutralises animation-duration
   for *, *::before, *::after.
   ═══════════════════════════════════════════════════════════ */

(function () {
  // Don't double-inject if the script loads more than once
  if (document.getElementById('breatheFab')) return;

  // ── Inject styles ──
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
    }
    .breathe-overlay.show { display: flex; }
    .breathe-overlay .label {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(250, 247, 242, 0.55);
      margin-bottom: 24px;
    }
    .breathe-overlay .circle {
      width: clamp(140px, 30vw, 220px);
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 197, 63, 0.4) 0%, rgba(139, 197, 63, 0.05) 70%);
      margin-bottom: 32px;
      animation: breathe-overlay-big 14s ease-in-out infinite;
    }
    @keyframes breathe-overlay-big {
      0%, 100% { transform: scale(0.7); }
      28%      { transform: scale(1.3); }
      57%      { transform: scale(1.3); }
    }
    .breathe-overlay .phase {
      font-family: "Newsreader", "Source Serif Pro", serif;
      font-size: clamp(28px, 6vw, 48px);
      font-weight: 380;
      letter-spacing: -0.02em;
      color: #FAF7F2;
    }
    .breathe-overlay .rhythm {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(250, 247, 242, 0.55);
      margin-top: 36px;
    }
    .breathe-overlay .close-btn {
      margin-top: 32px;
      background: transparent;
      color: #FAF7F2;
      border: 1px solid rgba(250, 247, 242, 0.18);
      padding: 10px 24px;
      border-radius: 999px;
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .breathe-overlay .close-btn:hover {
      border-color: #FAF7F2;
      background: rgba(250, 247, 242, 0.04);
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.id = 'breatheStyles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Inject FAB ──
  const fab = document.createElement('button');
  fab.id = 'breatheFab';
  fab.className = 'breathe-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Take 90 seconds to breathe with us');
  fab.title = 'Take 90 seconds to breathe';
  fab.innerHTML = '<span class="dot" aria-hidden="true"></span>Breathe';
  document.body.appendChild(fab);

  // ── Inject overlay ──
  const overlay = document.createElement('div');
  overlay.id = 'breatheOverlay';
  overlay.className = 'breathe-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Breathing exercise');
  overlay.innerHTML = `
    <p class="label">Breathe with me</p>
    <div class="circle" aria-hidden="true"></div>
    <p class="phase" id="breathePhase">Breathe in…</p>
    <p class="rhythm">In 4 · hold 4 · out 6</p>
    <button class="close-btn" type="button">Close</button>
  `;
  document.body.appendChild(overlay);

  // ── Wire up ──
  const phaseEl = overlay.querySelector('#breathePhase');
  const closeBtn = overlay.querySelector('.close-btn');
  const phases = ['Breathe in…', 'Hold…', 'Breathe out…'];
  const durations = [4000, 4000, 6000];
  let i = 0;
  let timer = null;

  function tick() {
    if (!overlay.classList.contains('show')) return;
    i = (i + 1) % 3;
    phaseEl.textContent = phases[i];
    timer = setTimeout(tick, durations[i]);
  }
  function open() {
    i = 0;
    phaseEl.textContent = phases[0];
    overlay.classList.add('show');
    timer = setTimeout(tick, durations[0]);
  }
  function close() {
    overlay.classList.remove('show');
    if (timer) { clearTimeout(timer); timer = null; }
  }

  fab.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  // Escape closes the breathing overlay first (if open) — before
  // the page's Quick Exit handler can fire and redirect away.
  // Use capture phase + stopImmediatePropagation to win the race.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      e.stopImmediatePropagation();
      e.preventDefault();
      close();
    }
  }, true);
})();
