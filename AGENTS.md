# Agent Operations Guide
This document is for automated agents that work on `jonkohlmeier.com`. It is not a user README.

## 0. Repository Context
- Site: **Puffs of Smoke** at `jonkohlmeier.com`.
- Stack: Astro (content collections), Tailwind CSS layered on `src/styles/global.css`, TypeScript utilities/tests, Playwright specs in `tests/`, static deploy from `dist/` via GitHub Actions + GitHub Pages.
- Runtime: Node 18+ (follow the version declared in `package.json`/README to avoid mismatched toolchains).
- Key paths:
  - Pages & routes: `src/pages/`
  - Components & layouts: `src/components/`, `src/layouts/`
  - Content collections: `src/content/` (`src/content/blog/` is most active)
  - Blog images/assets: `src/assets/blog/`
  - Global styles & tokens: `src/styles/global.css`
  - CI/workflows: `.github/workflows/`
- Generated/external directories: `dist/`, `.astro/`, `.vercel/`, `node_modules/`. Never commit them.

## 1. Purpose
Agents exist in this repo to:
- Keep the Astro/Tailwind codebase healthy, reproducible, and aligned with the writing-first experience.
- Automate repetitive work (linting, building, verifying content collections, refreshing snapshots, nudging humans when a decision is needed).
- Maintain internal hygiene docs (including this file) as workflows evolve.

Agents must not:
- Invent roadmap items or features.
- Rewrite author copy, essays, or tone without explicit instruction.
- Touch DNS, deployment secrets, or `CNAME` records.
- Proceed when intent is unclear—stop and request human input.

## 2. Agent Roster and Scope
### Build & Release Agent
- **Responsibility:** Trigger on pushes/PRs targeting the default branch (currently `master`). Run `npm install`, `npm run build`, and configured smoke checks. Ensure the static build in `dist/` completes cleanly.
- **Boundaries:** May update build artifacts (e.g., image caches) in CI storage but never commit `dist/` or `node_modules/`. If CI fails twice on the same commit, stop and alert humans instead of looping retries.
- **When to act:** On PRs into `master`, merges into `master`, and manual workflow dispatches.

### Content Curator Agent
- **Responsibility:** Watch `src/content/`, `src/pages/writing/` and related blog routes, and `src/assets/blog/`. Enforce frontmatter rules from `src/content.config.ts` and keep slugs/file names normalized.
- **Allowed actions:** Add/update Markdown or MDX in `src/content/blog/`. Add/update supporting images in `src/assets/blog/` when referenced.
- **Boundaries:** Do not modify `public/` static files without explicit instruction. Do not rewrite longform content for style—only safe typo/link fixes.

### QA & Guardrail Agent
- **Responsibility:** Monitor PRs for regressions, enforce style/structure rules, and run automated checks (`npm run lint`, `npm run test`, Playwright specs in `tests/` when UI changes).
- **Boundaries:** Only auto-fix style/formatting. Never commit logic or content changes without humans. Run after Build/Content agents to avoid duplicate fixes.
- **When to act:** Every PR or when requested via comments/workflow triggers.

### Docs & Metadata Agent
- **Responsibility:** Keep internal operational docs aligned with reality, focusing on `AGENTS.md` and other automation guides. Sync supporting metadata such as `.github/workflows/`, `.github/ISSUE_TEMPLATE*`, `.github/CODEOWNERS`, or similar automation-facing files when processes change.
- **Boundaries:** Do not alter `README.md` or other public-facing docs unless explicitly instructed. For meaningful workflow/branch/stack changes, branch + PR instead of direct commits.
- **When to act:** Whenever `.github/workflows/`, `astro.config.mjs`, `package.json`, `package-lock.json`, `src/content.config.ts`, deployment settings, or automation-related templates change; also when a new agent is added or scope shifts.

## 3. Workflow Rules
- **Branches:** `feature/<slug>` for new work, `fix/<issue>` for bug fixes, `content/<topic>` for publishing/editorial, `chore/<task>` for maintenance.
- **Default branch:** Treat `master` as protected. Never push directly—open a PR.
- **Pull requests:** Include a short intent summary, checklist of validations run, and linked issues if available. Agents must not auto-merge into `master` without human approval.
- **Commit scope:** Keep commits focused; split config, content, and build pipeline changes where practical.
- **Ignore:** `dist/`, `.astro/`, `.vercel/`, `node_modules/`. Respect `.gitignore` and file casing (Astro routing is case-sensitive).

## 4. Coding Style & Content Rules
- **Astro/components:** One component per file in `src/components/`. Use PascalCase filenames. Only co-locate CSS when it is scoped; shared styles live in `src/styles/global.css` or dedicated partials.
- **TypeScript:** Use strict imports, prefer `const`, annotate exported functions/components, and keep shared types in `src/types/` when present.
- **Tailwind:** Prefer tokens/utilities defined in `src/styles/global.css` and the Tailwind config. Arbitrary values require justification via brief code comments.
- **Markdown/content collections:** Posts in `src/content/blog/` must include `title`, `description`, `pubDate`, and taxonomy fields required by `src/content.config.ts`. Use relative image paths under `src/assets/blog/`.
- **File naming:** New routes in `src/pages/` use kebab-case (`src/pages/new-page.astro`); utilities use camelCase. Avoid introducing `snake_case`.
- **General:** Follow existing repo patterns rather than inventing new style rules without a proposal.

## 5. Communication Expectations
- **Commit messages:** `[agent-name] action: concise summary` (e.g., `[build-agent] fix: rerun astro build after lockfile update`).
- **PR descriptions:** State intent, list validation commands executed (`npm run lint`, `npm run test`, `npm run build`, Playwright if applicable), and flag manual review needs (design, copy, etc.).
- **Comments/warnings:** Cite file paths and line numbers from the diff. Offer concrete fixes. When skipping work, explain clearly (`dependency missing`, `build already failed upstream`, `awaiting human input`).

## 6. Safety & Constraints
- Never modify secrets, deployment configs, or DNS-related files such as `CNAME` without written human approval.
- Do not reformat/restyle large areas purely for aesthetics—limit churn to touched files/features.
- Require human review for schema changes (`src/content.config.ts`), dependency upgrades (`package.json`, `package-lock.json`), and additions/removals under `public/` or other static roots.
- Before marking work complete: run `npm run build`; if UI or routing changed, run Playwright tests (and report their output). Paste actual failure logs instead of paraphrasing.
- If unexpected files change mid-run, or the branch diverges (non fast-forward) from `master`, stop, report, and wait for humans.

## 7. Examples
- **New feature branch:** Create `feature/hero-animation`, add `src/components/HeroAnimation.astro`, run `npm run build` + relevant tests, then open a PR describing the visual change with screenshots if helpful.
- **Content-focused branch:** Create `content/writing-routine`, update posts in `src/content/blog/`, ensure frontmatter matches `src/content.config.ts`, verify builds/routing, and open a PR summarizing the editorial change.
- **Updating AGENTS.md:** Branch `chore/update-agent-guide`, edit this file to reflect new behavior, document the rationale in the PR, and tag a human reviewer. Do not auto-merge.
- **Broken build reaction:** Build Agent runs `npm run build`, hits an error, posts a PR status with the log excerpt and failing file/config pointer, and stops. QA Agent blocks the PR until the failure is resolved—no partial fixes or dependency edits.

## 8. Maintaining This File
`AGENTS.md` is the operational source of truth for automation behavior. Keep it current.
- **Agents should:** Detect changes to `.github/workflows/`, `astro.config.mjs`, `package.json`, `package-lock.json`, `src/content.config.ts`, deployment scripts, and automation templates. Propose updates here when those changes affect responsibilities, workflow rules, or safety policies. Always update the “Last updated” stamp and describe the change in the PR.
- **Humans should:** Review and approve every change to this file, edit it when new patterns become standard, and keep `README.md` focused on user onboarding.

Last updated: 2025-11-12  
Maintainer: Human reviewers of the `jonkohlmeier.com` repository
