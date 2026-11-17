# Agent Operations Guide
This document is for automated agents that work on `jonkohlmeier.com`. It is not a user README.

## 0. Repository Context
- Site: **Puffs of Smoke** at `jonkohlmeier.com`.
- Stack: Astro 7 static output with content collections, Tailwind CSS 4 layered on `src/styles/global.css`, TypeScript utilities/tests, Playwright browser tests, and GitHub Pages deployment.
- Runtime: Node 22.23.4+ (follow the version declared in `package.json`/README to avoid mismatched toolchains).
- Key paths:
  - Pages & routes: `src/pages/`
  - Components & layouts: `src/components/`, `src/layouts/`
  - Content collections: `src/content/` (`src/content/blog/` is most active)
  - Blog images/assets: `src/assets/blog/`
  - Editorial taxonomy and sorting: `src/data/editorial.ts`, `src/utils/taxonomy.ts`
  - Global styles & tokens: `src/styles/global.css`
  - Browser tests: `tests/`, configured by `playwright.config.ts`
  - CI/workflows: `.github/workflows/`
- Generated/external directories: `dist/`, `.astro/`, `.vercel/`, `node_modules/`, `playwright-report/`, `test-results/`. Never commit them.
- Public URLs: canonical articles live at `/blog/<slug>/`; `/writing/<slug>/` remains a supported alternate route with the `/blog/` URL as canonical.
- Generated endpoints: RSS is `/rss.xml`; Astro Sitemap generates `/sitemap-index.xml` and child sitemap files.

## 1. Purpose
Agents exist in this repo to:
- Keep the Astro/Tailwind codebase healthy, reproducible, and aligned with the writing-first experience.
- Automate repetitive work (building, browser testing, verifying content collections, dependency auditing, and nudging humans when a decision is needed).
- Maintain internal hygiene docs (including this file) as workflows evolve.

Agents must not:
- Invent roadmap items or features.
- Rewrite author copy, essays, or tone without explicit instruction.
- Touch DNS, deployment secrets, or `CNAME` records.
- Proceed when intent is unclear—stop and request human input.

## 2. Agent Roster and Scope
### Build & Release Agent
- **Responsibility:** Trigger on pushes/PRs targeting the default branch (currently `master`). Run `npm ci` and `npm test`. Ensure the static build in `dist/` completes cleanly before deployment.
- **Boundaries:** May update build artifacts (e.g., image caches) in CI storage but never commit `dist/` or `node_modules/`. If CI fails twice on the same commit, stop and alert humans instead of looping retries.
- **When to act:** On PRs into `master`, merges into `master`, and manual workflow dispatches.
- **Current CI note:** `npm test` already runs `npm run build`; the additional build step in `.github/workflows/deploy.yml` is redundant and may be removed in a focused workflow change.

### Content Curator Agent
- **Responsibility:** Watch `src/content/`, `src/pages/writing/` and related blog routes, and `src/assets/blog/`. Enforce frontmatter rules from `src/content.config.ts` and keep slugs/file names normalized.
- **Allowed actions:** Add/update Markdown or MDX in `src/content/blog/`. Add/update supporting images in `src/assets/blog/` when referenced.
- **Boundaries:** Do not modify `public/` static files without explicit instruction. Do not rewrite longform content for style—only safe typo/link fixes.
- **Taxonomy:** Editorial categories are `work-and-ideas`, `life-and-reflection`, and `the-finer-things`. Formats are `essay`, `note`, and `roundup`; omitted formats default to `essay`.
- **URL safety:** Never rename a published content file or change a published slug without an explicit redirect and canonical-URL plan.

### QA & Guardrail Agent
- **Responsibility:** Monitor PRs for regressions, enforce style/structure rules, and run `npm test`. The repository does not currently configure a separate lint, formatter, or `astro check` script; do not report those checks as completed.
- **Boundaries:** Only auto-fix style/formatting. Never commit logic or content changes without humans. Run after Build/Content agents to avoid duplicate fixes.
- **When to act:** Every PR or when requested via comments/workflow triggers.
- **Coverage baseline:** Playwright protects compiled CSS delivery, archive rendering/filtering, canonical legacy routes, featured content, analytics consent, WCAG AA contrast, desktop/mobile navigation, persisted theme choice, RSS/sitemap output, privacy controls, failed local assets, and mobile horizontal overflow.

### Docs & Metadata Agent
- **Responsibility:** Keep internal operational docs aligned with reality, focusing on `AGENTS.md` and other automation guides. Sync supporting metadata such as `.github/workflows/`, `.github/ISSUE_TEMPLATE*`, `.github/CODEOWNERS`, or similar automation-facing files when processes change.
- **Boundaries:** Do not alter `README.md` or other public-facing docs unless explicitly instructed. For meaningful workflow/branch/stack changes, branch + PR instead of direct commits.
- **When to act:** Whenever `.github/workflows/`, `astro.config.mjs`, `package.json`, `package-lock.json`, `src/content.config.ts`, deployment settings, or automation-related templates change; also when a new agent is added or scope shifts.

## 3. Workflow Rules
- **Branches:** `feature/<slug>` for new work, `fix/<issue>` for bug fixes, `content/<topic>` for publishing/editorial, `chore/<task>` for maintenance.
- **Default branch:** Treat `master` as protected. Never push directly—open a PR.
- **Pull requests:** Include a short intent summary, checklist of validations run, and linked issues if available. Agents must not auto-merge into `master` without human approval.
- **Commit scope:** Keep commits focused; split config, content, and build pipeline changes where practical.
- **Ignore:** `dist/`, `.astro/`, `.vercel/`, `node_modules/`, `playwright-report/`, and `test-results/`. Respect `.gitignore` and file casing (Astro routing is case-sensitive).

## 4. Coding Style & Content Rules
- **Astro/components:** One component per file in `src/components/`. Use PascalCase filenames. Only co-locate CSS when it is scoped; shared styles live in `src/styles/global.css` or dedicated partials.
- **Astro 7 frontmatter:** The compiler does not accept an interface extending an indexed-access type such as `CollectionEntry<'blog'>['data']`; use a type alias intersection instead.
- **TypeScript:** Use strict imports, prefer `const`, annotate exported functions/components, and keep shared types in `src/types/` when present.
- **Tailwind:** Prefer tokens/utilities defined in `src/styles/global.css` and the Tailwind config. Arbitrary values require justification via brief code comments.
- **Markdown/content collections:** Posts in `src/content/blog/` must include `title`, `description`, `pubDate`, and taxonomy fields required by `src/content.config.ts`. Use relative image paths under `src/assets/blog/`.
- **Editorial UI:** Favor typography, whitespace, and subtle separators over card-heavy or marketing-oriented patterns. Preserve both light and dark themes.
- **Typography/assets:** The current design uses system font stacks. Do not add `@font-face` declarations unless the referenced font files are committed and tested. Do not add external font requests without a clear privacy/performance justification.
- **Accessibility:** Preserve semantic landmarks, visible focus styles, keyboard-operable menus and filters, reduced-motion behavior, and WCAG AA text contrast in both themes.
- **Analytics/privacy:** Google Analytics must remain disabled until the visitor explicitly opts in. Preserve the consent banner, stored choice, privacy page, and “Manage cookies” control.
- **File naming:** New routes in `src/pages/` use kebab-case (`src/pages/new-page.astro`); utilities use camelCase. Avoid introducing `snake_case`.
- **General:** Follow existing repo patterns rather than inventing new style rules without a proposal.

## 5. Testing and Dependency Maintenance
- **Primary validation:** `npm test` runs the production Astro build and the full Playwright suite. A passing run should build all static routes without warnings and pass every browser test.
- **Focused browser tests:** Use `npx playwright test tests/<file>.spec.ts` after a successful build when iterating on one flow, then run `npm test` before handoff.
- **Astro 7 preview behavior:** Astro may auto-background preview servers when it detects an agent. Playwright must keep `--ignore-lock` in its `webServer.command` so the preview process stays in the foreground and can be supervised.
- **Playwright upgrades:** After changing `@playwright/test`, run `npx playwright install chromium` locally. CI installs browser dependencies with `npx playwright install --with-deps`.
- **Asset integrity:** Keep the failed-local-resource test. Missing fonts, images, stylesheets, scripts, RSS, or sitemap files should fail automated validation rather than ship as silent 404s.
- **Dependency checks:** Use `npm outdated --long` to assess currency and `npm audit` to assess advisories. Update `package.json` and `package-lock.json` together, avoid `--force` unless the migration is understood, and rerun the full suite after every upgrade.
- **Security baseline:** The dependency tree should report zero known vulnerabilities. Treat high or critical production advisories as release blockers.
- **Lockfile hygiene:** Keep `package-lock.json` valid and reproducible with `npm ci`. Do not hand-edit generated dependency entries or allow duplicate root keys to survive a merge.
- **Test hygiene:** Remove `playwright-report/` and `test-results/` before handoff. Use `git diff --check` to catch whitespace errors.

## 6. Communication Expectations
- **Commit messages:** `[agent-name] action: concise summary` (e.g., `[build-agent] fix: rerun astro build after lockfile update`).
- **PR descriptions:** State intent, list the exact validation commands executed (`npm test`, focused Playwright tests, `npm audit`, or `npm outdated` as applicable), and flag manual review needs (design, copy, etc.).
- **Comments/warnings:** Cite file paths and line numbers from the diff. Offer concrete fixes. When skipping work, explain clearly (`dependency missing`, `build already failed upstream`, `awaiting human input`).

## 7. Safety & Constraints
- Never modify secrets, deployment configs, or DNS-related files such as `CNAME` without written human approval.
- Do not reformat/restyle large areas purely for aesthetics—limit churn to touched files/features.
- Require human review for schema changes (`src/content.config.ts`), dependency upgrades (`package.json`, `package-lock.json`), and additions/removals under `public/` or other static roots.
- Before marking work complete: run `npm test`; if dependencies changed, also run `npm audit` and `npm outdated --long`. Paste actual failure logs instead of paraphrasing.
- If unexpected files change mid-run, or the branch diverges (non fast-forward) from `master`, stop, report, and wait for humans.

## 8. Examples
- **New feature branch:** Create `feature/hero-animation`, add `src/components/HeroAnimation.astro`, run focused tests followed by `npm test`, then open a PR describing the visual change with screenshots if helpful.
- **Content-focused branch:** Create `content/writing-routine`, update posts in `src/content/blog/`, ensure frontmatter matches `src/content.config.ts`, verify builds/routing, and open a PR summarizing the editorial change.
- **Updating AGENTS.md:** Branch `chore/update-agent-guide`, edit this file to reflect new behavior, document the rationale in the PR, and tag a human reviewer. Do not auto-merge.
- **Broken build reaction:** Build Agent runs `npm test`, hits an error, posts a PR status with the log excerpt and failing file/config pointer, and stops. QA Agent blocks the PR until the failure is resolved—no partial fixes or dependency edits.

## 9. Known Follow-up Areas
- Add a configured `astro check`/TypeScript validation script and formatter rather than implying lint coverage that does not exist.
- Remove the duplicate production build in the GitHub Pages workflow after confirming artifact behavior is unchanged.
- Review unused legacy advisory components/content and old portrait assets before deleting them; do not remove them opportunistically.
- The Now page still says “Last updated November 2025.” Refresh it only with verified current information from Jon.
- Consider Dependabot or Renovate so dependency currency and advisories are surfaced routinely.

## 10. Maintaining This File
`AGENTS.md` is the operational source of truth for automation behavior. Keep it current.
- **Agents should:** Detect changes to `.github/workflows/`, `astro.config.mjs`, `package.json`, `package-lock.json`, `src/content.config.ts`, deployment scripts, and automation templates. Propose updates here when those changes affect responsibilities, workflow rules, or safety policies. Always update the “Last updated” stamp and describe the change in the PR.
- **Humans should:** Review and approve every change to this file, edit it when new patterns become standard, and keep `README.md` focused on user onboarding.

Last updated: 2026-11-16
Maintainer: Human reviewers of the `jonkohlmeier.com` repository
