# Dependency upgrade checklist

Run `pnpm build` after each section. Tick items as they land.

## 0. pnpm strictness (needed even without upgrades)

pnpm doesn't hoist transitive deps, so these imports currently fail to resolve:

- [x] Add `@sanity/client` as a direct dependency (imported in `app/sanity-api/sanity.client.ts`)
- [ ] Add `lottie-web` as a direct dependency (imported in `app/components/ui/LogoReverse/usePreloadLottie.tsx`)
- [ ] Remove unused `lottie-react` (never imported)
- [ ] Remove unused `cookies-next` (only in commented code in `app/components/ui/CookieConsent.tsx`)

## 1. Node / tooling

- [ ] `@types/node`: pin to the Node major in `.nvmrc` (currently 24 → `^24`, not 26)
- [ ] Restore `"engines": { "node": ">=20.9.0" }` in `package.json` (Next 16 minimum)
- [ ] `typescript` 7 (native Go compiler): confirm `next build` type-checking supports it; otherwise stay on `^5`

## 2. Next 16 + ESLint 10 + next-sanity 13 (upgrade together)

**Next 16**
- [ ] `package.json`: `"lint": "next lint"` → `"lint": "eslint ."` (`next lint` removed)
- [ ] `package.json`: `"dev": "next dev --turbopack"` → `"next dev"` (Turbopack is default)
- [ ] Verify async request APIs: `params`, `draftMode()` are already awaited in
  `app/layout.tsx`, `app/page.tsx`, `app/(pages)/[slug]/page.tsx`, `app/(pages)/news/[slug]/page.tsx`,
  `app/api/preview/route.ts`, `app/api/exit-preview/route.ts` ✓
- [ ] `next.config.ts`: check `images` (`remotePatterns`, `dangerouslyAllowSVG`) still valid; remove empty `compiler` block
- [ ] Check `NextPage<PageProps>` typing on async page components still compiles

**ESLint 10 + eslint-config-next 16**
- [ ] Rewrite `eslint.config.mjs` as native flat config, drop `FlatCompat` / `@eslint/eslintrc`:
  ```js
  import nextVitals from "eslint-config-next/core-web-vitals";
  export default [
    ...nextVitals,
    { rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@typescript-eslint/no-explicit-any": "off",
    } },
  ];
  ```
- [ ] Remove `@eslint/eslintrc` from devDependencies
- [ ] `pnpm lint` passes (new React Hooks rules may flag code)

**next-sanity 13**
- [ ] Read changelog for v10 → v13 breaking changes
- [x] `VisualEditing` in `app/layout.tsx`: now imported from `next-sanity/visual-editing`
- [ ] `PortableText` in `ContentArticle.tsx`, `Footer.tsx`, `TextIndentedAndAnimated.tsx`
- [ ] `groq` in `app/sanity-api/sanity-queries.tsx` (may need `defineQuery` or the `groq` package)
- [ ] Test draft mode: `/api/preview` → visual editing overlay → `/api/exit-preview`

## 3. Sanity / content libs

- [x] `@sanity/image-url` 2: in `app/sanity-api/sanity-utils.ts`
  `import createImageUrlBuilder from "@sanity/image-url"` → `import { createImageUrlBuilder } from "@sanity/image-url"`
- [ ] `@portabletext/react` 8: check `PortableText` in `modules/KeyPointItem.tsx`, `modules/TextUI.tsx`
  and `PortableTextComponents` type in `app/sanity-api/portableTextComponents.tsx`
- [x] `sanity-codegen` (`SanityImageAsset` type): still compatible with new `@sanity/image-url` types

## 4. Animation / UI libs

- [ ] `framer-motion` 14: read changelog; check usage in
  `ui/PageTransition.tsx` (`motion`, `AnimatePresence`),
  `ui/SummaryDetailFramer.jsx` (`useAnimation`),
  `ui/player/index.tsx` (`animate`), `ui/FaviconLetter.tsx`
- [ ] Test page transitions visually
- [ ] `react-intersection-observer` 11: `useInView` in `modules/KeyPointItem.tsx`, `ui/player/index.tsx`
- [ ] `react-lottie` (`ui/LottiePlayer.tsx`): unmaintained, React 19 peer warnings → consider migrating to `react-lottie-player` / `lottie-web` like `LogoReverse`

## 5. react-player 3 (rewrite)

**`app/components/ui/player/index.tsx`**
- [x] Removed `react-player/base` import
- [x] `url` → `src`, `playsinline` → `playsInline`
- [x] Ref typed as `HTMLVideoElement`; `seekTo(seek)` → `currentTime = seek`
- [x] `onDuration` → `onDurationChange` (reads `currentTarget.duration`)
- [x] `onProgress` → `onTimeUpdate`, still builds `{ played, playedSeconds, loaded, loadedSeconds }` for `TimelineControls`
- [x] `config` flattened: YouTube `playerVars` removed (`iv_load_policy` 3, `cc_load_policy`, `rel`, `origin`); Vimeo `title: false`

**`app/components/ui/Embed.tsx`**
- [x] `url` → `src`

- [ ] Test YouTube, Vimeo and file videos: autoplay muted, in-view play/pause, click toggle, end

## 6. Tailwind 4

- [x] `@tailwindcss/postcss` added, `autoprefixer` removed, `postcss.config.mjs` updated
- [x] `app/globals.css`: `@import "tailwindcss"` + `@theme inline` tokens mapped to `_variables.scss` vars (defaults cleared, same as v3 config)
- [x] `app/layout.tsx` imports `./globals.css`; removed `app/styles/tailwind.css` and `tailwind.config.ts`
- [x] Compiled output checked: spacing, colors, text sizes, breakpoints (768 / 1080 / 1600) match v3
- [ ] Visual pass on every page template, mobile + desktop. In v4, utilities sit in `@layer utilities`, so any unlayered SCSS rule on the same element now wins regardless of specificity
- [ ] Decide `lg` breakpoint: Tailwind uses 1600px, SCSS `$lg` / `--screen-lg` use 1441px

## 7. Final

- [ ] `pnpm install` with no warnings about peer deps
- [ ] `pnpm lint`
- [x] `pnpm build`
- [ ] `pnpm start` + smoke test: home, `[slug]`, `news/[slug]`, 404, draft preview
- [ ] Deploy to preprod and check before merging to `main`
- [ ] Delete this file
