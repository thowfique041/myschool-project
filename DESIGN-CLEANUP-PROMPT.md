# Prompt: Remove the "AI-generated" look from Webnion School & College

> Paste everything below into Claude Code (or any coding agent) from the root of the
> `webnion-school-college` repo.

---

## Role and goal

You are a senior front-end engineer and visual designer. This repo is a Next.js 16 +
Tailwind v4 website for a fictional Bangladeshi school, **Webnion School & College,
Upashahar, Sylhet** (Play to Class 12, NCTB curriculum, Bangla + English).

The site works, but it reads as AI-generated: the same section template repeated
everywhere, scroll fade-ins on every block, Inter font, generic marketing copy,
reused stock photos. Your job is to make it look and read like a site that a real
Bangladeshi school's own web team designed and maintains: confident, institutional,
a little plain where plainness is honest, and clearly local.

Do **not** redesign from scratch. Keep the information architecture, routes, i18n,
data model, dark mode and accessibility. Change the presentation, motion, type and copy.

Before writing code, read `AGENTS.md` (this Next.js version has breaking changes; check
`node_modules/next/dist/docs/` when unsure about an API).

---

## Design direction

Think "a well-run school's official site", not "a SaaS landing page".

- Reference feel: a printed school prospectus and the office notice board. Clear
  hierarchy, ruled lines, dated notices, tables, real names, real numbers.
- Density over air: Bangladeshi guardians come for notices, results, admission dates
  and phone numbers. Put information first; decoration second.
- Variety: sections should not all share one layout. Some are lists, some tables, some
  a single strong photo with a caption, some just text with a rule above it.
- Restraint in motion: the page should feel still. Motion only where it carries meaning
  (the notice ticker, opening an accordion, a gallery lightbox).
- Bangla is a first-class language, not a translation layer. The `/bn` version should
  look designed for Bangla, not like English with Bangla glyphs swapped in.

---

## Required changes

### 1. Break the repeated section template
Files: `src/components/ui/primitives.tsx` (`SectionHeading`), `src/components/home/sections.tsx`

Every home section currently uses: small green kicker → large serif H2 → grey
description → "All X →" link on the right. Change this:

- Remove the kicker from most sections. Keep it on at most one or two where it adds
  real information (e.g. "Admission open" as a status badge, which is data, not decoration).
- Delete kickers that just repeat the heading ("News & events / News & events",
  "Why Webnion / Why families choose Webnion").
- Give sections different heading treatments, for example:
  - Notice board: a plain bold heading with a thick top rule, like a notice board header.
  - Results: a heading inside a table caption.
  - Teachers: a short heading, no description.
- Vary where the "see all" link sits (under the list, inside a footer row of a card,
  as a plain text link). Not always top-right.
- Drop descriptions that say nothing ("A summary of recent SSC and HSC results.").

### 2. Remove most scroll animation
Files: `src/components/ui/Reveal.tsx`, `src/components/home/motion-bits.tsx`, every `<Reveal>` usage

- Remove `Reveal` fade-up wrappers from home sections, cards, list items and grids.
  Replace with plain elements. If `Reveal` ends up unused, delete it.
- Remove the staggered `delay={i * 0.05}` patterns entirely.
- Hero: remove `HeroIntro` stagger, or reduce it to a single quick opacity fade on the
  whole hero text block (no translate). Prefer removing it.
- Remove hover `scale-[1.02]` / `scale-[1.04]` zooms on images. A subtle underline on
  the title link is enough.
- Keep: the notice ticker (with its pause control), accordion open/close, gallery lightbox.

### 3. Fix and replace the count-up stat counter (real bug)
Files: `StatCounter` in `motion-bits.tsx`, `ResultsSection` in `sections.tsx`

- The counter server-renders `0`, so without JS (and for crawlers and link previews)
  the page says "SSC 2026 pass rate 0.0%". Remove the count-up animation entirely and
  render the final number on the server.
- Present results the way Bangladeshi schools actually do: a small table with columns
  Exam | Year | Examinees | Passed | Pass rate | GPA 5.00, for the last 2–3 years of SSC
  and HSC. Use `tabular-nums`, right-align numbers, Bangla digits on `/bn`.
- Keep the existing "sample data" tag.

### 4. Replace the levels "01 02 03" cards
File: `LevelsSection` in `sections.tsx`

- Remove the huge faded `01 / 02 / 03` numbers.
- Present the three sections (Primary, Secondary, Higher Secondary) as a clear
  comparison: a table or three columns with a consistent row structure
  (Classes, Ages, Shifts, Groups, Section size), so a guardian can scan across.
- Remove the dot bullets; let the rows carry the information.

### 5. Replace the icon-in-a-box "Why families choose Webnion" list
File: `WhyFacilitiesSection` in `sections.tsx`

- Remove the four lucide icons in `bg-white/10` squares.
- Rewrite as concrete, checkable facts, not virtues. Example direction:
  "Primary sections capped at 35 students", "Class tests every week, report cards every
  term", "Guardian meeting at the end of each term". Short lines, maybe a two-column
  definition list. No icons.
- Reconsider the full navy band for this section. One dark band on the page (footer) is
  enough; use a plain or ruled-paper background here.

### 6. Testimonials
File: `PeopleSection` in `sections.tsx`

- Remove the large `Quote` icons and the three equal cards.
- Give each quote a plausible, specific attribution in the data (fictional names are
  fine, e.g. "Farhana Begum, guardian, Class 5, Morning shift"). Anonymous "A guardian"
  reads as fabricated.
- Show them as a simple list of pull-quotes with a left rule, or a single featured quote.
  Two good quotes beat three generic ones.

### 7. Principal's message
- Remove the `Quote` icon. Keep the navy card or move to a portrait-plus-letter layout
  (photo or avatar on the left, a short signed letter on the right, signature line with
  name and title). It should feel like a letter, not a testimonial widget.

### 8. Hero
File: `src/components/home/Hero.tsx` and the home content data

- Replace the generic copy. Remove "Where learning inspires a brighter future." and the
  "nurture curiosity, build confidence, and empower students" triad.
- The H1 should simply be the institution, or a plain factual line. Examples of the
  register to aim for (adapt, don't copy blindly):
  - H1: "Webnion School & College" with a line below: "Play to Class 12 · NCTB curriculum · Upashahar, Sylhet · Est. 1998"
  - Then one practical line: "Admission for 2027 is open until 3 December."
- Keep the school motto ("Enter to learn, leave to serve"), but as a small line, not a
  big green serif tagline above the H1.
- Reduce the hero height; a guardian should see the notice ticker and admission dates
  without scrolling on a laptop.
- The left-side dark gradient over the photo can stay, but soften it so it doesn't look
  like a template overlay.
- One primary CTA ("Admission 2027") is enough. The secondary can become a plain text link.

### 9. Typography
Files: `package.json`, `src/components/layout/Document.tsx` (or wherever fonts are
loaded), `src/app/globals.css` (`--font-*` tokens)

- Remove **Inter**. Do not replace it with Geist, Poppins, Manrope or DM Sans either.
- Pick a Bangla-first pairing. Options (choose one coherent set, install via
  `@fontsource`):
  - Bangla body: Hind Siliguri or Anek Bangla; Bangla headings: Tiro Bangla or Noto Serif Bengali.
  - English body: something less ubiquitous than Inter that pairs with the Bangla face
    (e.g. IBM Plex Sans, Public Sans, or Source Sans 3).
  - English headings: keep a serif only if it pairs well with the Bangla heading face;
    otherwise use the sans in a heavier weight.
- Check that Bangla and English mixed in one line share a similar x-height and weight.
- Remove most `tracking-tight` on headings; it is a SaaS habit. Keep default tracking.
- Reduce the number of ad-hoc sizes like `text-[0.95rem]`, `text-[1.02rem]`,
  `text-[0.97rem]`, `text-[0.98rem]`. Use a small, consistent type scale.

### 10. Colour, radius, shadow
File: `src/app/globals.css`, `primitives.tsx`

- Keep navy as the institutional colour. Keep red strictly for urgent notices.
- Replace the cream `paper` background `#f8f6f1` with plain white or a very neutral
  grey. The warm off-white is a current AI-design trend.
- Use green sparingly. Right now it is on every kicker, bullet, quote icon, link hover,
  badge and button. Pick 2–3 places where green means something (e.g. "admission open",
  primary CTA) and use navy or ink elsewhere.
- Reduce radius: `rounded-2xl` → `rounded-md` or `rounded-lg` for most containers;
  tables and notice lists can be square-cornered with rules.
- Reduce or remove the soft double-layer `--shadow-card` / `--shadow-lift`. Prefer
  1px borders and rules. Shadows only for floating elements (sticky header on scroll,
  back-to-top button, lightbox).
- Remove the `leaf → navy` gradient strip in `PageHeader.tsx`; use a solid rule.
- Header: remove `backdrop-blur`; use a solid background.
- Rewrite the token comments in plain technical language (what the token is for), not
  descriptive prose.

### 11. Images
- The same Unsplash photos appear in Facilities, News and Gallery (cricket field,
  computer lab, library). Each photo should appear once on the home page.
- Prefer fewer, larger, honest images. If there aren't enough distinct photos, show
  fewer cards rather than repeating.
- Gallery: replace the bento grid (2×2 first tile + one wide tile) with a plain, even grid.
- Keep alt text and photo credits.

### 12. Copy pass (English and Bangla)
Find where home and section copy lives (`src/content`, `src/data`, `src/i18n`) and
update **both** `en` and `bn`.

Remove or rewrite:
- Three-item virtue lists ("honest, curious and confident" is fine inside the principal's
  letter; it is not fine in headings and intros).
- Clever turn-of-phrase headings: "Teachers who know their subjects, and their students",
  "Rooted in Sylhet, focused on the whole child", "…part of the routine, not extras",
  "Three sections, one continuous journey".
- Replace with plain labels a school office would actually use: "Teachers",
  "About the school", "Classes and sections", "Admission 2027", "Notice board",
  "Public examination results", "Facilities", "Contact the office".
- Bangla copy must read as natural Bangla written by a Bangladeshi school, not a literal
  translation. Use the terms schools here use (ভর্তি বিজ্ঞপ্তি, নোটিশ বোর্ড, পাবলিক
  পরীক্ষার ফলাফল, শাখা, শিফট, অধ্যক্ষের বাণী).

### 13. Things to keep (these already feel local and real)
- The notice ticker with the red "সর্বশেষ" label and pause button.
- The calendar date blocks on notices.
- EIIN in the top bar, office hours, phone and address everywhere.
- Admission steps with real dates; lottery for Play–Class 1.
- Dark mode, language switcher, skip link, focus styles, reduced-motion handling.

### 14. Code hygiene
- Remove poetic/explanatory comments (e.g. "knowledge as the ground growth comes from").
  Keep comments only where they explain a non-obvious decision.
- Delete components and dependencies that become unused (e.g. `Reveal`, `StatCounter`,
  `HeroIntro`, possibly `motion` if nothing else needs it, the Inter fontsource package).

---

## Constraints

- No new UI libraries. Tailwind v4 + existing components only (lucide may stay for
  functional icons: phone, mail, attachment, play/pause, menu, arrows).
- Keep all routes, data shapes and i18n keys working. If you rename or remove a key,
  update every usage in both languages.
- Accessibility must not regress: headings in order, `aria-labelledby` targets exist,
  colour contrast ≥ 4.5:1 for body text in light and dark mode.
- Do not add placeholder lorem ipsum or new fake statistics.

---

## Verification (do all of these before saying you're done)

1. `npm run check` (lint + typecheck + build) passes.
2. Run the dev server and look at `/`, `/bn`, `/about`, `/admission`, `/notices`,
   `/results`, `/teachers`, `/gallery` in light and dark mode, at 375px and 1280px wide.
3. View the home page with JavaScript disabled (or `curl` the HTML): results show the
   real numbers, not 0.
4. `grep -rn "Reveal\|StatCounter\|HeroIntro\|tracking-tight\|rounded-2xl\|backdrop-blur\|Inter" src`
   — confirm what remains is intentional.
5. Write a short summary listing each numbered change above as Done / Partly / Skipped,
   with the reason for anything not done.

Commit in small, logical commits (motion removal, typography, colour/radius, sections,
copy), so each change can be reviewed or reverted on its own.
