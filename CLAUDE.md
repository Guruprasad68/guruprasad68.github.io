# CLAUDE.md

Orientation for future Claude Code sessions in this repo.

## What this is

A minimal academic personal site for **Guruprasad Viswanathan Ramesh** — PhD
student, ECE @ UW–Madison. Hosted on GitHub Pages. Designed so the owner only
edits **YAML data files** day-to-day; layout, CSS, and Liquid templating
shouldn't need to change for normal updates (new news item, new paper, new
internship).

## Stack

- **Jekyll** (4.x) — static site generator that GitHub Pages builds with.
- **Remote theme:** `pages-themes/minimal@v0.2.0` (the GitHub Pages fork of
  [orderedlist/minimal](https://github.com/orderedlist/minimal)).
  - Used via `jekyll-remote-theme` plugin — *not* the `jekyll-theme-minimal`
    gem, because that gem pins Jekyll to 3.x which breaks on modern Ruby.
- **Fonts:** Inter (body), Fraunces (display/serif for name, titles, venues),
  JetBrains Mono (code). Loaded from Google Fonts in `_layouts/default.html`.
- **No JS framework.** One small vanilla script (`assets/js/theme.js`)
  drives the Light/Auto/Dark toggle.

## File map

```
.
├── _config.yml                # site title, profile fields, social links, footer note
├── _data/
│   ├── news.yml               # newest-first list of news items
│   ├── experience.yml         # brief internship/role list
│   └── publications.yml       # split into conference/workshop/(preprint)
├── _includes/
│   ├── news.html              # scrollable news box
│   ├── experience.html        # flat experience list
│   └── publications.html      # renders Conference + Workshop + Preprints groups
├── _layouts/
│   └── default.html           # overrides the remote theme's layout (sidebar + main)
├── assets/
│   ├── css/style.scss         # imports remote theme SCSS + all custom styling
│   ├── js/theme.js            # theme toggle (localStorage-backed, applied pre-paint)
│   ├── img/profile.svg        # placeholder; replace with a real photo
│   └── cv/guruprasad_cv.pdf   # CV linked from sidebar
├── index.md                   # single page (About + News + Experience + Publications)
├── Gemfile                    # jekyll 4.x + jekyll-remote-theme + jekyll-seo-tag
├── .gitignore
└── guruprasad_resume.pdf      # source resume (kept at repo root; not served)
```

## Page architecture

The default layout has two regions, matching the `pages-themes/minimal`
structure:

- **`<header>` (left sidebar, fixed on desktop):** profile photo, name, role,
  affiliation, social link pills, CV button, theme toggle.
- **`<section>` (right main column):** renders `index.md` content. Order:
  About → News → Experience → Publications.
- **`<footer>`:** single line — `{{ site.footer_note }}` ("Vibe Coded FTW!!").

`index.md` is intentionally thin — section headings + `{% include %}` calls.
All variable content lives in `_data/*.yml`; templates do the rendering.

## Theming

CSS variables in `assets/css/style.scss` drive everything. Three "modes":

1. **Light** (default `:root`) — soft sky/blue accent (`#60a5fa`), warm
   off-white background, faint blue radial glow in the top-right.
2. **Dark** (`html[data-theme="dark"]`) — desaturated sky-300 accent
   (`#7dd3fc`) chosen because saturated blues were "flashing" the user's eyes
   in dark mode. Keep dark tones gentle.
3. **Auto** — neither attribute set; `@media (prefers-color-scheme: dark)`
   re-declares the dark tokens.

`theme.js` writes `localStorage['theme'] = 'light' | 'dark' | 'auto'` and
sets `data-theme` on `<html>` before paint to avoid flash. Buttons reflect
state via `aria-pressed`.

### Accent rules of thumb
- Light mode: blue-500 link, blue-400 accent, blue-50 soft wash.
- Dark mode: sky-200 link, sky-300 accent, ~8% opacity soft wash.
- If asked to make it "less intense," reduce saturation and opacity of
  `--accent-soft` before touching `--accent` itself.

## How to add content

### A news item
Edit `_data/news.yml`. Newest at the top. The container scrolls when it
overflows (`max-height: 380px`). Markdown allowed in `text`.

```yaml
- date: Jun 2026
  text: "Started internship at **Company X**."
```

### A paper
Edit `_data/publications.yml`. Pick the right key:
- `conference:` — peer-reviewed conference proceedings (AAAI, FAccT, PETS…).
- `workshop:` — workshop papers (e.g. gem5 Workshop @ ISCA, SPSC @ Interspeech).
- `preprint:` — arXiv / under-submission. Section auto-hides when empty.

Wrap the owner's own name with `**...**` so it renders bold. `links:` is
optional; each entry becomes a rounded pill ("Paper", "Code", "Long Report").

### An experience entry
Edit `_data/experience.yml`. Keep `brief` to one line — intent is "what
team/lab + one phrase about what they did," not resume-style bullets. PhD
lab is deliberately not listed here; it's covered in the About paragraph.

### Social links
`_config.yml > links` — array of `{ name, url }`. Rendered as pill buttons
in display order.

## Local preview

User is on macOS with Homebrew Ruby. The Gemfile already includes
`base64`, `csv`, `logger`, `bigdecimal` because Ruby 3.4+ removed them
from stdlib.

```sh
bundle install
bundle exec jekyll serve
# http://127.0.0.1:4000 — Jekyll watches files, no restart on edits
```

If Jekyll 4 ever breaks on a newer Ruby, fallback is `brew install ruby@3.3`
and re-bundle under that.

## Deploy

Push `main` to a GitHub repo named `<username>.github.io` (or any repo with
Pages enabled on `main`). GitHub builds the site server-side with its own
toolchain — it does not use the local Gemfile, so version mismatches there
don't block deploys.

## Conventions / gotchas

- **Don't** switch back to `theme: jekyll-theme-minimal` — that gem pins
  Jekyll 3.x and breaks `bundle install` on Ruby 3.4+/4.x.
- **Don't** drop `gem "jekyll-seo-tag"` from the Gemfile — `pages-themes/minimal`
  declares it as a runtime dependency.
- The "PhD student" string lives in `_config.yml > profile.role` and again in
  `index.md` (About paragraph). Update both if the title changes.
- Profile photo: `assets/img/profile.svg` is a placeholder. To swap,
  drop `profile.jpg` in `assets/img/` and update `_config.yml > profile.photo`.
- CV: `assets/cv/guruprasad_cv.pdf`. The user updates this PDF directly;
  no template change needed.
- The footer note (`Vibe Coded FTW!!`) is intentional and configurable via
  `_config.yml > footer_note` — don't remove it without asking.

## Things to ask before changing

- Removing the advisor mention from the About paragraph (sidebar mention is
  already gone, deliberately).
- Adding the current PhD lab to Experience.
- Switching the accent away from blue (user prefers blue; toned-down
  versions only).
