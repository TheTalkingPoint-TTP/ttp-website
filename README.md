# The Talking Point — Website

> Real humans. Real support. 24/7.

A single-page editorial site for **The Talking Point Group** — mental health, mediation, and trauma response across all nine provinces of South Africa.

---

## What's in this folder

```
ttp-website/
├── index.html          ← the whole site (HTML + CSS + JS, all inline)
├── README.md           ← this file
├── .gitignore
└── assets/
    ├── favicon.svg     ← TTP semicolon mark
    └── img/            ← drop your own photos here if/when you want to host locally
```

Right now the site is a **single file**. All styling and behaviour live inside `index.html` — easy to edit, easy to deploy, nothing to "build".

---

## Run it locally

Just **double-click `index.html`**. It opens in your browser. Done.

(Internet is needed for the Google Fonts and the Unsplash photos to load. Everything else is local.)

---

## Push to GitHub (first time)

Open Terminal (Mac) or Git Bash (Windows). `cd` into this folder, then:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/TheTalkingPoint/ttp-website.git
git push -u origin main
```

> Replace the remote URL with whatever the actual repo name is on `github.com/TheTalkingPoint`. If the repo is called `website` or just `talkingpoint`, swap that in.

### After the first push, to push changes:

```bash
git add .
git commit -m "What you changed"
git push
```

---

## Deploy to GitHub Pages (free public URL)

Once the repo is on GitHub:

1. Open the repo on github.com
2. Go to **Settings → Pages**
3. Under **Source**, pick the `main` branch and the `/ (root)` folder
4. Click **Save**

Within a minute or two GitHub gives you a public URL like:

```
https://thetalkingpoint.github.io/ttp-website/
```

That's the link you can share with the team or use as a staging site. Any time you push a new commit, the live site updates automatically.

If you later want to use `thetalkingpoint.co.za` instead, that's a DNS change at your registrar (we can sort that separately).

---

## Design principle: this site needs to be safe to land on at 3am

TTP's audience includes people having suicidal thoughts. The visual and motion choices on this site are deliberately calmer than a standard marketing site:

- **Display font: Newsreader** (warm, calm serif — was Fraunces, which is too literary/quirky for a crisis-context site)
- **Crisis strip is deep navy**, not red — visible but not anxiety-spiking
- **Minimal motion** — pulse animations on dots removed, scroll-reveals are gentler (14px translate, 1.1s ease, no slide-from-distance)
- **`prefers-reduced-motion` honoured** — anyone with the OS setting enabled sees no animation at all
- **Hero headline is smaller** than max-bombast — greets, doesn't shout
- **Marquee runs ~40% slower** and the most graphic items (specific hijacking, specific funeral) were removed; the gentler-but-still-real ones stayed
- **Grain overlay opacity halved** — less visual noise for an already-overloaded brain

Any future edits should pass the same test: *Would this make a person quietly googling "I can't keep doing this" feel safer, or more agitated?* If unsure, default to calmer.

---

## What to update before showing this to the world

### 0. Crisis support numbers (new — top strip)
The persistent dark-red strip above the nav shows two crisis lines:
- **SADAG** — `0800 567 567`
- **Lifeline SA** — `0861 322 322`

If TTP wants different numbers (e.g. their own after-hours line, or a province-specific Lifeline branch), search `index.html` for `0800 567 567` and `0861 322 322` and swap.

### 0b. Real credentials (new — placeholder reg numbers)
Each of the 5 team cards now shows a registration body + placeholder number (all zeros, clearly fake):
- HPCSA · REG 000000 / PS 0000000  → swap for real HPCSA reg numbers
- DiSAC accredited · REG 000000     → swap for real DiSAC accreditation number
- SACSSP · 10 00000                 → swap for real SACSSP registration

Reg-body links are wired to the respective lookup pages (HPCSA iRegister, SACSSP, DiSAC). When real numbers arrive, find each `.credential` block in `index.html` and swap the number + link's display text.

### 0c. Quick-exit button (new — privacy escape)
A floating "Quick exit" button bottom-right of every page. Clicking it (or pressing **Esc**) redirects to `bbc.com/weather` and clears the page from browser history. Useful for DV-mediation and sensitive-case visitors. If TTP wants the exit URL changed, search for `'https://www.bbc.com/weather'` in the inline `<script>`.

### 0d. Professional memberships row (new — text-badge placeholders)
The "Memberships" row in the trust band lists 7 bodies as styled text badges: **ASCHP, DiSAC, FAMAC, SACSSP, HPCSA, NABFAM, SAAM** (same set as the existing live site at thetalkingpoint.co.za).

Closer to launch, swap each `<span class="badge">…</span>` for the real logo (inline SVG or `<img>`). An HTML comment in `index.html` lists the website for each body so logos can be sourced + linked. Suggested format:

```html
<a href="https://www.hpcsa.co.za/" target="_blank" rel="noopener" class="badge">
  <img src="assets/img/memberships/hpcsa.svg" alt="HPCSA" />
</a>
```

### 0e. Phone numbers (now both visible — verify which is which)
The CTA shows two numbers and the footer shows two phone lines:
- `021 300 2053` — labelled "office"
- `072 565 9255` — labelled "24/7 line"

Both came from the existing live site. Closer to launch, confirm which is which (and whether 072 is the actual ListenUp dedicated number or a personal cell).

### 0f. Email — now `bianca@thetalkingpoint.co.za`
Footer was `info@…` (aspirational), now matches the live site's `bianca@…`. Swap if a generic `info@` mailbox is preferred for inbound enquiries.

### 1. Social media links
All four social icons in the footer are already wired:
- LinkedIn → `linkedin.com/company/the-talking-point`
- Facebook → `facebook.com/TTPTALK`
- Instagram → `instagram.com/thetalkingpointgroupsa`
- WhatsApp → `wa.me/27829089319`

If any of these are wrong, search the file for the URL and replace it.

### 2. The WhatsApp number
Used in two places: the "WhatsApp ListenUp now" button in the CTA, and the WhatsApp social icon in the footer. Both use `wa.me/27829089319` (Maryke's mobile from the Project Help proposal). If you'd prefer a different number, find and replace in `index.html`.

### 3. The phone number
Used in two places — the "Call 021 300 2053" button and the footer. Currently `+27 21 300 2053`.

### 4. The "Real humans" portrait strip
Five named cards under the marquee. **Both the photos AND the names are placeholders** (Nomvula M., Lerato D., Thando K., Ayesha P., Sipho N.) — they're not real TTP team members. The cards are designed to look great with or without the photos loading.

Three options:

- **Best**: Replace placeholder names with real TTP team first names + initial, and drop real team headshots into `assets/img/`. Then change each `src=` from `https://images.unsplash.com/...` to `assets/img/team-firstname.jpg`. Highest authenticity.
- **OK**: Keep the placeholder names + swap to better Unsplash photos. Go to unsplash.com, find a photo, right-click → "Copy image address", paste over the existing `src=`.
- **Acceptable as-is**: The cards work without any photos at all — each has a distinct gradient, initial, name, and role. If the Unsplash photos fail to load (their CDN sometimes blocks hotlinks), you'll see the styled fallback, which still looks intentional.

### 5. The service card images
Three small accompanying images on the Mental Health / Mediation / Response cards. Same swap rules as above — these are also Unsplash hot-links with a graceful fallback if they fail to load.

### 5. The anonymised case study
Section 04 ("From a conversation to a vehicle in the driveway") contains a 7-minute response case. Read it, sanity-check it, and either approve it or swap it for a real anonymised case Maryke or Ella is comfortable with.

---

## Brand reference (already baked in)

| Token | Value | Where it's used |
|---|---|---|
| Navy | `#0E1E3A` | Primary background, body text on light sections |
| Lime | `#8BC53F` | Accent, semicolon, highlights, primary CTA |
| Ivory | `#FAF7F2` | Content backgrounds |
| Coral | `#FF5C39` | Urgency / response moments only |
| Display font | **Fraunces** (variable serif) | Headlines |
| Body font | **Outfit** | Paragraphs, UI |
| Mono | **JetBrains Mono** | Metadata, eyebrows, governance language |

---

## Image attribution

All photos hot-linked from [Unsplash](https://unsplash.com). The Unsplash License grants free use, including commercial — see [unsplash.com/license](https://unsplash.com/license). No attribution required, but appreciated.

---

## Questions?

This site is intentionally **one file**. No frameworks, no build step, no dependencies beyond Google Fonts and Unsplash. That means it'll still work in five years and any developer can pick it up in ten minutes.

If you want a second page (e.g. a dedicated "For Insurers" page using the same design system), it's a copy of `index.html` with the body content swapped — happy to build that next.
