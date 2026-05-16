# Pre-launch checklist

Everything below MUST be cleared before the site goes public on `thetalkingpoint.co.za`
(i.e. before the DNS cutover from the github.io preview to Xneelo). The site can keep
shipping work on the preview URL — `https://thetalkingpoint-ttp.github.io/ttp-website/` —
until each item is closed.

This file lives at the repo root and is NOT deployed.

---

## 1. Clinical sign-off (Ella)

Ella owns the rewrite / final wording of these. Nothing on this list should go public
without her name attached.

- [ ] **Honest Limits** — the "we're not the right fit if…" section in [`docs/index.html`](docs/index.html). Wording currently drafted from general SA mental-health practice limits; Ella may add, soften, or replace.
- [ ] **Check-in result copy** — the four severity blocks in [`docs/index.html`](docs/index.html) inside `renderCheckinResult()` (severe / mod-severe / moderate / mild). Eyebrow + title + body for each.
- [ ] **Check-in WhatsApp openers** — the four pre-filled `wa.me?text=` openers (also in `renderCheckinResult()`). Currently drafted per severity; Ella to confirm the tone is right.
- [ ] **someone-you-love.html "What TTP can / can't do without consent"** — the two-column list of capabilities. Drafted from common-sense supporter-call practice; needs verification against TTP's actual clinical-escalation policy.
- [ ] **Quiet reads — `grief-in-the-body.html`** — contains unverified clinical claims (cortisol, REM, stress cardiomyopathy / Takotsubo). Fact-check against the literature Ella trusts before publish.
- [ ] **Quiet reads — `when-the-3am-thoughts-come.html`** — rewrite/approve.
- [ ] **Quiet reads — `the-tuesday-after.html`** — rewrite/approve.
- [ ] **Quiet reads — `how-to-sit-with-someone-who-cant-talk.html`** — rewrite/approve.

---

## 2. Placeholder content to swap in

- [ ] **Real humans cards** — five cards on the home page with placeholder names (Nomvula M., Lerato D., Thando K., Ayesha P., Sipho N.), placeholder reg numbers (all zeros) and Unsplash stock photos. Replace with real first-name-only + initial, real reg numbers from HPCSA / SACSSP / DiSAC, and either real headshots (with permission) or staged-but-honest photos.
- [ ] **Voices quotes** — three "real, anonymised client quotes" in [`docs/index.html`](docs/index.html). Currently marked "placeholder". Need three actual quotes (anonymised, with client permission).
- [ ] **Membership badges** — seven text-only badges in the trust strip. Replace with real SVG logos (HPCSA, SACSSP, DiSAC, etc.).
- [ ] **Tonight audio clip** — 90-second recording referenced as a future affordance on `tonight.html`. Ella or Elzabé to record. Drop the audio file under `docs/assets/` and wire up.

---

## 3. Quiet reads — per-article release ritual

When Ella signs off on each Quiet read, the same three things need to happen in that
file. Do this PER ARTICLE — don't batch — so partial approvals can ship.

For `docs/blog/posts/<slug>.html`:

- [ ] Remove the `<meta name="robots" content="noindex">` line from `<head>`
- [ ] Remove the visible `.draft-banner` `<div>` block near the top of `<body>`
- [ ] Remove the red `⚠️ DRAFT — NOT FOR PUBLIC LAUNCH ⚠️` comment block at the very top of the file (immediately after `<!DOCTYPE html>`)

When ALL four are approved:

- [ ] Remove `<meta name="robots" content="noindex">` from `docs/blog/quiet-reads.html` (the listing page)
- [ ] Remove `<meta name="robots" content="noindex">` from `docs/feed.xml`'s items if any are still flagged in the feed description (currently each `<description>` starts with `DRAFT —`)
- [ ] Remove the "Draft · placeholder copy · subject to clinical sign-off" footer span from each article and the listing

---

## 4. DNS cutover (Xneelo → thetalkingpoint.co.za)

This is the last step, and it's gated on EVERYTHING above being green AND Danelle being
comfortable pushing edits + previewing on the github.io URL (her training ground).

- [ ] **Re-add `docs/CNAME`** containing the single line `thetalkingpoint.co.za` (was deliberately removed during iteration so the github.io preview URL resolves cleanly)
- [ ] **Xneelo DNS for `thetalkingpoint.co.za`** — delete any existing conflicting A/CNAME records on `@` or `www` first, then add:
  - Apex A records (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - `www` CNAME → `thetalkingpoint-ttp.github.io.`
- [ ] **Wait for DNS propagation** (allow up to 24h, usually much faster)
- [ ] **Enforce HTTPS** — once GitHub provisions the Let's Encrypt cert, toggle "Enforce HTTPS" in repo Settings → Pages

---

## 5. Final pre-cutover sweep

- [ ] **Search the codebase for "DRAFT", "placeholder", "TODO", "FIXME"** — anything still flagged should be either fixed or removed before cutover
- [ ] **Run a full click-through** of every nav link, every CTA, every footer link from a fresh browser session — no 404s
- [ ] **Test the four check-in severity outcomes** — each one should render the right copy and pre-fill the right WhatsApp opener
- [ ] **Test the Quick Exit (Esc key)** on every page — should redirect to weathersa.co.za
- [ ] **Test the WhatsApp links** — the wa.me URL should open WhatsApp with the right pre-filled message
- [ ] **Mobile pass** — 375px-wide viewport check, particularly the hero, the check-in form, and the policy footer strip
