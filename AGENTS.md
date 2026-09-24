# Repository Guidelines

## Project Overview

Sanity Studio v6 content backend for **KVC GLOBAL** — the CMS half of a two-repo system. This repo owns the content schema and authoring studio for Sanity project `eh8b0fvx`, dataset `production`. **`production` is the only dataset — there is no staging; every script and deploy writes live content.** The Next.js frontend is a separate git repo at `../kvc-website` that consumes this content via GROQ; schema changes propagate there through the typegen bridge (below).

## Architecture & Data Flow

- **Studio app**: `sanity.config.ts` (plugins: `structureTool`, `customColorPicker` with 4 brand colors, `visionTool`, `documentInternationalization`) → `structure.ts` (root structure resolver) → `structures/*` (11 per-page structure builders) → `schemaTypes/` (schema registry).
- **Document-level i18n** (not field-level): each localized type has one document per language (`vi`/`en`) with a hidden, readOnly `language` field; per-language initial value templates set `{language}`. Exceptions: `companyInfo` (single doc, field-level `addressVi`/`addressEn`), `lead` (not localized).
- **Desk structure** is static (identical for all users, no role branching). Four groups in `structure.ts`: **Pages** (16 page types, each a parent item whose children are fixed vi/en documents pinned by `documentId` + `initialValueTemplate`), **Website** (`siteSettings` vi/en + `companyInfo` singletons with delete/duplicate actions removed), **Shared content** (document-type lists for `partner`, `service`, `relatedService`, `testimonial`, `faq`), **Leads** (read-only `lead` inbox, `submittedAt` desc). A fallback filter (`allStructuredDocumentTypes` / `sharedDocumentTypes` sets) hides these from the ungrouped root list — **a new document type not added to one of these sets leaks to the desk root**.
- **Page documents are thin**: hidden `language` field + one object field per section + field groups (`hero` first, `seo` last) + language-aware `preview.prepare`. All section objects live in `schemaTypes/objects/*Sections.ts`, grouped by page family; each file exports an aggregated `*Objects` array that `schemaTypes/index.ts` spreads into the registered `schemaTypes`.
- **Shared content pattern**: page sections reference shared documents via sortable `reference` arrays (some dual-member with inline `*ServiceItem`); editing a referenced record changes it everywhere.
- **Cross-repo typegen bridge**: schema change → `sanity schema extract` (regenerates committed `schema.json`) → `sanity typegen generate` (scans GROQ queries in `../kvc-website/sanity/**`, writes `../kvc-website/sanity.types.ts`). Every schema change requires re-running both **and a commit in the kvc-website repo**.
- **Data operations**: ad-hoc scripts in `scripts/` write directly to the production Content Lake (see Scripts).

## Key Directories

| Directory | Purpose |
|---|---|
| `schemaTypes/documents/` | 24 registered document types (pages, shared content, `siteSettings`, `companyInfo`, `lead`) |
| `schemaTypes/objects/` | ~160 section/item object types, grouped by page family (`homeSections.ts`, `studyAbroadSections.ts`, …) |
| `schemaTypes/shared/` | Cross-page field arrays (`partnersFields` — not a type, spread into section objects) |
| `structures/` | 11 desk-structure builders, one pattern per page family |
| `scripts/` | 10 data seed/migration/verify scripts — **excluded from tsconfig and not covered by lint** |
| `patches/` | pnpm patch for `sanity-plugin-color-input@1.4.1` (`useToast` import moved to `@sanity/ui/toast` for @sanity/ui v4 compat) |
| `static/` | Assets copied into `dist/static/` on build (currently empty) |

`sanity_research_report.md` is pre-adoption Vietnamese vendor research (Sanity case studies) — not codebase documentation.

## Development Commands

```bash
pnpm install                    # NEVER npm install (package-lock.json is a stale leftover)
pnpm dev                        # local studio at :3333, regenerates .sanity/runtime/ each start
pnpm build                      # bundle to dist/ — type errors surface here
pnpm deploy                     # deploy to Sanity-hosted studio (appId n5xqnmnp39dirkndgltioio7)
pnpm deploy-graphql            # publish GraphQL API to the dataset
pnpm exec tsc --noEmit          # typecheck — pass --noEmit explicitly (bare tsc emits JS)
pnpm exec eslint .              # lint (@sanity/eslint-config-studio, zero custom rules)
npx prettier --check .          # format check (--write to fix)
npx sanity schema extract       # after schema changes → schema.json
npx sanity typegen generate     # → ../kvc-website/sanity.types.ts (commit in sibling repo)
node .gitnexus/run.cjs analyze  # refresh the (currently stale) GitNexus index
```

### Scripts (production dataset — verify before running)

Two auth patterns: `getCliClient()` from `sanity/cli` → run via `npx sanity exec scripts/<name>.ts` (inherits `sanity login`); `createClient()` from `@sanity/client` → run via `tsx scripts/<name>.ts` with `SANITY_TOKEN` set. Pass `-- --dry-run` where supported.

| Script | Run | Safety |
|---|---|---|
| `seedHomepages.ts` | `npx sanity exec` (+ dry-run) | Non-destructive (`setIfMissing`); reads dictionaries/images from `../kvc-website` |
| `seedContentPages.ts` | `npx sanity exec` (+ dry-run) | Non-destructive (`createIfNotExists` + `setIfMissing`) |
| `seedCountryStudyPages.ts` | `npx sanity exec` (+ dry-run) | **Destructive** — `createOrReplace` published docs, patches live nav |
| `seedOnlineSubpages.ts` | `pnpm seed-subpages` | **Destructive** — `createOrReplace`, no dry-run |
| `seedAboutStats.ts` | `tsx` + `SANITY_TOKEN` | Idempotent (skips if present) |
| `patch-kvc-support.mjs` | `node` + `SANITY_TOKEN` | Idempotent (fills empty fields only) |
| `migrateServicesToRelated.ts`, `migrateServicesWithToken.ts` | one-off, already run | Archive candidates |
| `fixDrafts.ts` | — | **Bulk-deletes all drafts + all `onlineProgramPage` docs. Do not run.** |
| `verifyHomepages.ts` | `npx sanity exec` | Read-only — use this pattern for verification |

Script conventions: sequential per-document commits (no transactions/batching — one failure aborts mid-run); `data(lang)` bilingual content factories; uniform `main().catch(err => { console.error(err); process.exitCode = 1 })`. Duplicated `ensureKeys`/`slugify` helpers exist in 2 files each — extract to a shared module before adding a third copy. **Never hardcode tokens** (3 legacy scripts contain committed hardcoded fallback tokens that need rotation; prefer `getCliClient` or `SANITY_TOKEN` env var).

## Code Conventions & Common Patterns

- **Prettier** (config in `package.json`): no semicolons, single quotes, `printWidth: 100`, `bracketSpacing: false`.
- Schema APIs: `defineType` / `defineField` / `defineArrayMember` everywhere. Object files start with file-local helpers (`string(name, title)`, `text`, `image`) — reuse them instead of verbose inline fields.
- **Naming**: camelCase type names; section objects prefixed by page family (`studyAbroad*`, `onlineProgram*`); item objects suffixed `Item`/`Step`/`Card`. Reuse the per-family SEO object (`workPassSeo` etc.; `sharedSeo` for dichVu/online pages) rather than inventing new ones.
- **Validation**: `Rule.required()` on core fields; `Rule.max(n)` array caps; custom regex/`Rule.custom()` (e.g. `siteLink.customHref`); conditional fields via `hidden: ({parent}) => …`.
- **Images**: always `options: {hotspot: true}` paired with a sibling `*Alt` string. Portable Text only in `service.details`.
- **Buttons**: plain `primaryButtonLabel`/`primaryButtonHref` string pairs (except `siteSettings`, which routes through `siteCtaButton` → `siteLink`).

### Adding a new page document (full checklist)

1. Create `schemaTypes/documents/fooPage.ts` mirroring `homePage.ts`: hidden readOnly `language` field first, one object field per section, groups (`hero` default, `seo` last), language-aware preview.
2. Register in `schemaTypes/index.ts` (documents individually; section objects via the family's `*Objects` array).
3. Add the schema type to `documentInternationalization.schemaTypes` in `sanity.config.ts`.
4. Filter out its default template **and** add a `[id, schemaType, viTitle, enTitle]` tuple so vi/en templates exist.
5. Create `structures/fooStructure.ts` (parent item → vi/en child documents via `.documentId(\`${slug}-${lang}\`)` + `.initialValueTemplate()`), import it in `structure.ts`, and add the type to `allStructuredDocumentTypes` (or the appropriate set).

New shared content type: hidden `language` field, add to `sharedDocumentTypes` + a `S.documentTypeListItem` under Shared content, reference from page sections via sortable reference arrays.

## Important Files

| File | Role |
|---|---|
| `sanity.config.ts` | Studio plugins, i18n config, per-language templates, singleton action filtering |
| `sanity.cli.ts` | projectId/dataset, deploy appId + autoUpdates, **typegen config pointing at `../kvc-website`** |
| `structure.ts` | Desk-tree composition + the two type-coverage sets |
| `schemaTypes/index.ts` | Central schema registry — unregistered types are invisible |
| `schemaTypes/siteSettingsInitialValues.ts` | Full header/footer initial values per language |
| `schema.json` | Extracted schema (typegen input) — regenerate after schema changes |
| `pnpm-workspace.yaml` | Plugin patch + `allowBuilds: esbuild` (not a real workspace — no `packages:` field) |

## Runtime/Tooling Preferences

- **pnpm 12.3.4** (Corepack-enforced via `packageManager`). `pnpm-lock.yaml` is authoritative; `package-lock.json` is stale — ignore it.
- Node 20+ implied (no `engines` pin). React exact-pinned to 19.2.8 with `overrides` forcing transitive deps to match.
- `deployment.autoUpdates: true` — the hosted studio auto-updates and **can run a newer `sanity` than local `node_modules`** (lockfile: 6.12.0). Test breaking changes locally.
- `sanity-plugin-color-input` only works via the pnpm patch; if the version bumps past 1.4.1, regenerate with `pnpm patch`.
- `tsx` is not a declared devDependency (hoisted transitively from the sanity CLI) — the `seed-subpages` alias is fragile under dependency changes.
- `tsconfig.json` excludes `scripts/` — script type errors surface only at runtime.

## Testing & QA

- **No tests, no test runner, no CI.** Verification loop: `pnpm exec tsc --noEmit` (studio code only), `pnpm exec eslint .`, `pnpm build` (compilation proof), and manual `pnpm dev` in the studio.
- Data changes: verify with read-only GROQ scripts (`scripts/verifyHomepages.ts` pattern — `getCliClient`, `perspective: 'drafts'`, print JSON) before and after writes; prefer `--dry-run` where available.
- GitNexus pre-change gates (impact analysis / `detect_changes`) are mandatory — see the block below.
- Schema changes are not "done" until `sanity schema extract` + `sanity typegen generate` run and the kvc-website commit lands.

## Known Quirks (verify before relying on them)

- `schemaTypes/documents/studyService.ts` is defined but **not registered** — dead near-duplicate of `relatedService`.
- `structure.ts` references `initialValueTemplate('company-info')`, but `sanity.config.ts` never creates that template; `companyInfoInitialValue` is imported and unused — company-info initial values silently don't apply.
- `structures/onlineProgramStructure.ts` children lack `.initialValueTemplate()` (unlike every sibling structure).
- `schema.json` currently lags recent `schemaTypes/` edits — re-extract before typegen.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **studio-kvc-global** (563 symbols, 790 relationships, 9 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/studio-kvc-global/context` | Codebase overview, check index freshness |
| `gitnexus://repo/studio-kvc-global/clusters` | All functional areas |
| `gitnexus://repo/studio-kvc-global/processes` | All execution flows |
| `gitnexus://repo/studio-kvc-global/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
