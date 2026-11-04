# Webnion School & College — Frontend

A complete, frontend-only website for **Webnion School & College**, a fictional school and college in Sylhet, Bangladesh. It is built as a realistic client presentation and portfolio project: Bangla/English content, a Bangladeshi school context (NCTB curriculum, SSC/HSC, morning and day shifts, Shaheed Minar, notice board), and working client-side interactions.

> **Demonstration content.** The institution, people, notices, results, fees and contact details are fictional. Forms validate and confirm in the browser only — nothing is sent to a server.

## Features

- **Home** — top information bar, sticky header with dropdowns, hero with Bangla tagline, pausable scrolling notice strip, quick-access tiles, principal's message, academic levels, recent notices, admission steps, facilities, sample SSC/HSC results with animated counters, news, gallery preview, faculty, testimonials, FAQ and contact form.
- **About** — overview, mission/vision/values, history timeline, principal's message, campus facilities, managing committee, staff overview.
- **Academic** — levels and groups, subjects by level, upcoming calendar dates, sample class routine, examination system, grading scale, syllabus downloads, policies.
- **Admission** — circular (Bangla + English), important dates, eligibility table, procedure, required documents, sample fees, admission FAQ and a validated application form with a confirmation state.
- **Notice Board** — search (Bangla or English), category filters, sorting, empty state, detail pages with PDF attachments and print, plus a "Forms & downloads" section with sample PDFs.
- **Results & Examinations** — mock result lookup (loading, found, not-found states), exam schedule, exam notices, board summary — all labelled as sample data.
- **Teachers & Staff** — directory filtered by department, section, name or subject (initials instead of invented photos).
- **Gallery** — category filters and an accessible lightbox (keyboard arrows, Esc, focus trap, focus return).
- **News & Events** — featured story, upcoming events, search/filter and detail pages.
- **Contact** — contact cards, validated form with success state, sketch map placeholder, social links.
- **Extras** — Students & Guardians, Academic Calendar, School Policies, FAQ, Privacy, Terms, custom 404 and error pages, sitemap and robots.

## Admin panel (frontend demo)

Open `/admin` and pick a role (Super Admin, Admin or Editor) to explore the content management panel:
dashboard, homepage/website pages, notices, admissions, students, teachers, examinations and results
(with CSV import/export), news & events, gallery, downloads, media library, contact messages,
users, roles & permissions, activity log and site settings.

**This is frontend-only.** All admin data lives in the browser's `localStorage`
(`src/components/admin/demo-store.ts`); nothing is sent to a server, changes do not alter the
public website, and the roles are simulated — they are not security. A real deployment would need
a backend (database, server-side authentication with secure cookies, server-side permission checks
and file storage). The field definitions in `src/cms/` are shared by the public site's content
module (`src/content/`) and the admin forms, so they can be reused when a backend is added.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with design tokens in `src/app/globals.css` |
| Animation | Motion for React (`motion/react`), respecting `prefers-reduced-motion` |
| Icons | Lucide React |
| Fonts | Inter, Source Serif 4, Noto Sans Bengali, Noto Serif Bengali — bundled via `next/font/local` from `@fontsource` packages (no font CDN at build or runtime) |

No backend, database, authentication or payment integration.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
npm run build      # production build
npm run start      # serve the production build
npm run check      # lint + typecheck + build
```

## Project structure

```
src/
  app/                 # routes (one folder per page), layout, 404, error, sitemap, robots, icon
  components/
    brand/             # original SVG logo
    layout/            # top bar, header (dropdowns + mobile menu), footer, back-to-top
    home/              # homepage sections and small motion components
    explorers/         # client-side search/filter UIs: notices, news, teachers, gallery, results
    forms/             # contact and admission forms
    shared/ ui/        # cards, page header, accordion, fields, primitives, Picture wrapper
  data/                # typed mock data — notices, news, teachers, results, fees, calendar, images…
  lib/                 # fonts, small utilities (Bangla digits/dates, cn)
  types/               # shared TypeScript types
public/
  downloads/           # sample PDFs (marked “for website demonstration only”)
```

All content lives in `src/data`, so sample data is defined once and reused across pages.

## Images

Photographs are free images from [Unsplash](https://unsplash.com) used under the [Unsplash License](https://unsplash.com/license). They are representative photos from schools and places in Bangladesh and India, are served from `images.unsplash.com` through `next/image`, and are credited on the `/credits` page. None of them shows Webnion School & College.

All images are defined once in `src/data/images.ts`. To use the institution's own photos, put them in `public/images` and point the entries there.

## Accessibility & performance

- Semantic landmarks, one `<h1>` per page, skip link, visible focus styles, labelled form controls with inline errors.
- Keyboard-accessible dropdowns, mobile menu, accordion and lightbox.
- Pausable notice ticker; all motion reduced or disabled for `prefers-reduced-motion`.
- Static generation for every page, self-hosted fonts, responsive, lazily loaded images and no heavy UI libraries.

## Licence

Project code: all rights reserved by the repository owner unless a licence is added. Sample PDFs were created for this project; photographs belong to their Unsplash photographers.
