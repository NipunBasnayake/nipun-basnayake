# Portfolio Gallery And Mobile Implementation Plan

Repository: `C:\Users\NIPUN\Desktop\nipun-basnayake`  
Requested output: `PORTFOLIO_GALLERY_MOBILE_IMPLEMENTATION_PLAN.md`  
Mode: analysis and implementation plan only. No application source code was modified.

## Summary

This plan covers two production improvements:

1. A maintainable, JSON-driven designer gallery where artwork files live under `public/assets/gallery/` and React components do not need to be edited for each new item.
2. A full mobile/tablet responsiveness plan for `/`, `/developer`, `/designer`, and `/contact` while preserving the existing desktop visual identity.

Current state:

- Existing gallery component files found: 4
- Existing design categories: 14
- Current gallery item count: 0
- Proposed required JSON fields: `id`, `title`, `categoryId`, `image`, `alt`, `width`, `height`, `sortOrder`
- Responsive problem areas found: 18
- HIGH visual-risk files: 8

## Part A - Existing Designer Gallery Analysis

### Current Files

| File | Responsibility |
|---|---|
| `src/data/designPortfolio.ts` | Defines `DesignCategory`, `DesignItem`, category list, designer intro/experience copy, and current `designItems` array |
| `src/pages/DesignerPage.tsx` | Assembles designer route sections and passes `designCategories` / `designItems` into `DesignGallery` |
| `src/components/design/DesignGallery.tsx` | Owns active category state, selected lightbox item state, filtering, empty state, and lightbox wiring |
| `src/components/design/DesignCategoryFilters.tsx` | Renders `All` plus category filter buttons |
| `src/components/design/DesignGalleryItem.tsx` | Renders one gallery card as a clickable image tile |
| `src/components/design/DesignLightbox.tsx` | Renders modal preview, previous/next controls, keyboard handling, body scroll lock, and pointer swipe |

### Current Data Shape

`DesignItem` currently requires:

```ts
id: string;
title: string;
categoryId: string;
image: string;
thumbnail: string;
width: number;
height: number;
alt: string;
```

Optional fields:

```ts
year?: string;
description?: string;
featured?: boolean;
```

Current gallery item count is zero:

```ts
export const designItems: DesignItem[] = [];
```

### Current Filtering

`DesignGallery.tsx` stores `activeCategory` as local state. When `activeCategory === "all"`, every item is shown. Otherwise it filters by `item.categoryId === activeCategory`.

This is simple, predictable, and safe to keep. The category ID should remain the stable source of filtering behavior, not folder names or display labels.

### Current Masonry Behavior

The gallery uses CSS columns:

```tsx
columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4
```

This is good for mixed aspect ratios because cards keep their natural image height and use `break-inside-avoid`. It does not force square crops.

Current breakpoints:

- `<640px`: 1 column
- `640px-1023px`: 2 columns
- `1024px-1279px`: 3 columns
- `1280px+`: 4 columns

### Current Cards

`DesignGalleryItem.tsx` renders:

- a `button`
- thumbnail image
- `width` and `height` attributes
- `loading="lazy"`
- `decoding="async"`
- title
- category label
- optional description
- hover/focus maximize icon

This is already close to the desired architecture.

### Current Lightbox

`DesignLightbox.tsx` supports:

- `role="dialog"`
- `aria-modal="true"`
- initial focus on close button
- Escape key close
- ArrowLeft / ArrowRight navigation
- body scroll lock
- pointer swipe
- full artwork display with `object-contain`

Missing:

- focus trap
- safe-area padding
- explicit image load error fallback
- `useReducedMotion` is not needed now because lightbox has no motion, but future animation should respect it

### Current Empty State

When there are no filtered items, `DesignGallery.tsx` renders a designed empty state saying the gallery is ready for real artwork. This is useful during preparation but should disappear automatically once JSON data contains real work.

### Safest Way To Populate Real Artwork

Keep the existing components and change only the data source:

- Add image files under `public/assets/gallery/`.
- Add JSON entries to a gallery data file.
- Add a typed adapter that validates/normalizes JSON into the existing `DesignItem[]` shape.
- Keep `DesignGallery`, `DesignGalleryItem`, and `DesignLightbox` mostly unchanged.

## Part B - Folder-Based Gallery Architecture

Recommended public folder:

```text
public/
  assets/
    gallery/
      branding/
      social-media/
      web-design/
      print-design/
      motion/
      3d/
      logos/
      posters/
      events/
      thumbs/
      full/
```

Important rule: the folder path must not define category. JSON remains the source of truth.

Examples:

- `/assets/gallery/social-media/post-01.webp` may use category `branding` if the JSON says so.
- `/assets/gallery/branding/logo-board.webp` may use category `logo-design`.
- `/assets/gallery/full/client-poster.webp` may use category `event-designs`.

Folder naming should be for file organization only. Filtering should always use `categoryId`.

## Part C - JSON-Driven Gallery

### Recommended Architecture

Use both:

- `src/data/designGallery.json` for item data
- `src/data/designGallery.ts` as a typed adapter and validator

Then update `src/data/designPortfolio.ts` to import/export validated gallery items, or move categories and items into separate files while preserving the public exports used by `DesignerPage.tsx`.

This keeps component usage unchanged:

```tsx
<DesignGallery categories={designCategories} items={designItems} />
```

### Recommended JSON Schema

```json
[
  {
    "id": "sample-brand-board-01",
    "title": "Sample Brand Identity Board",
    "categoryId": "branding",
    "image": "/assets/gallery/full/sample-brand-board-01.webp",
    "thumbnail": "/assets/gallery/thumbs/sample-brand-board-01.webp",
    "alt": "Brand identity presentation board with logo, colors, and typography.",
    "width": 1600,
    "height": 1200,
    "description": "Brand presentation board for a visual identity concept.",
    "tools": ["Adobe Illustrator", "Adobe Photoshop"],
    "year": "2026",
    "featured": true,
    "sortOrder": 10
  }
]
```

### Required Fields

| Field | Why Required |
|---|---|
| `id` | Stable React key, lightbox identity, future deep-linking |
| `title` | Visible card/lightbox title |
| `categoryId` | Connects item to the category source of truth |
| `image` | Full artwork path |
| `alt` | Accessibility and SEO |
| `width` | Prevents layout shift and supports masonry sizing |
| `height` | Prevents layout shift and supports masonry sizing |
| `sortOrder` | Stable display order independent of file/folder order |

### Optional Fields

| Field | Default / Behavior |
|---|---|
| `thumbnail` | Defaults to `image` initially |
| `description` | Omitted from card if empty |
| `tools` | Useful for designer credibility; omitted if not present |
| `year` | Omitted if not present |
| `featured` | Defaults to `false`; can support featured ordering later |
| `client` | Optional if public/client-approved |
| `format` | Optional, such as `square`, `portrait`, `landscape`, `a4`, `web-screenshot` |

### TypeScript Safety And Validation

Recommended `designGallery.ts` responsibilities:

- Import JSON.
- Define `DesignGalleryJsonItem` input type.
- Validate required fields at module load.
- Validate `categoryId` against `designCategories`.
- Validate `id` uniqueness.
- Validate `image` and optional `thumbnail` start with `/assets/gallery/`.
- Normalize `thumbnail: item.thumbnail ?? item.image`.
- Sort by `sortOrder`, then `title`.
- Export `designItems: DesignItem[]`.

Invalid categories should throw a clear development error instead of silently hiding items.

No package is necessary for the first version. A small local validator is enough. If the gallery later becomes large or externally edited, a schema package can be considered, but this plan intentionally avoids over-engineering.

## Part D - Category Architecture

Existing categories in `src/data/designPortfolio.ts`:

| Order | ID | Display Name | Featured |
|---:|---|---|---|
| 1 | `logo-design` | Logo Design | yes |
| 2 | `branding` | Branding | yes |
| 3 | `posters` | Posters | yes |
| 4 | `flyers` | Flyers | yes |
| 5 | `social-media` | Social Media | yes |
| 6 | `wedding-cards` | Wedding Cards | no |
| 7 | `invitations` | Invitations | no |
| 8 | `business-cards` | Business Cards | no |
| 9 | `certificates` | Certificates | no |
| 10 | `brochures` | Brochures | no |
| 11 | `banners` | Banners | no |
| 12 | `event-designs` | Event Designs | no |
| 13 | `print-designs` | Print Designs | no |
| 14 | `other` | Other | no |

Recommendation: keep these IDs for now. They are already stable and cover the immediate design portfolio. Do not rename them in the first gallery implementation unless there is a content reason.

The `All` filter should remain UI-only. Gallery JSON entries should never use `all` as a category.

Invalid category handling:

- Development: throw an error such as `Invalid design gallery categoryId "x" for item "y"`.
- Production: because the same validated export is used, invalid data should be caught before release during local build/preview.

## Part E - Image Handling

Current masonry is appropriate for:

- 1080x1080
- 1080x1350
- 1080x1920
- 1920x1080
- A4 portrait
- A4 landscape
- web screenshots
- logo presentation boards
- branding boards

Do not crop all images to squares.

### Thumbnail Rendering Plan

Keep:

- `h-auto w-full`
- intrinsic `width` and `height`
- `loading="lazy"`
- `decoding="async"`
- natural aspect ratio

Add later:

- image error fallback in `DesignGalleryItem`
- optional visual skeleton only if loading feels poor
- `sizes` if using responsive `srcSet` later

### Full Image Rendering Plan

Keep lightbox:

- `max-h-full max-w-full object-contain`
- complete artwork visible

Add later:

- safe-area padding
- loading state for large full images
- error fallback
- optional preload of previous/next image only after first gallery version works

### Layout Shift Prevention

Require `width` and `height` in JSON. These values let the browser reserve aspect ratio before image decode. This matters more as the gallery grows.

## Part F - Thumbnail / Full Image Support

Initial data can use:

```json
"image": "/assets/gallery/branding/logo-board.webp"
```

and omit `thumbnail`.

The adapter should normalize:

```ts
thumbnail: item.thumbnail ?? item.image
```

Later data can use:

```json
"thumbnail": "/assets/gallery/thumbs/logo-board.webp",
"image": "/assets/gallery/full/logo-board.webp"
```

No component rewrite should be needed because the existing components already distinguish `thumbnail` and `image`.

## Part G - Gallery Performance

### 50 Images

Current CSS columns plus lazy images should be fine. Filtering with `useMemo` is enough.

### 100 Images

Still acceptable if thumbnails are optimized. Keep DOM cards simple, avoid heavy per-card motion, and ensure full images are not loaded until lightbox open.

### 200+ Images

Potential concerns:

- Initial DOM count becomes large.
- CSS columns can be more expensive to lay out than grid.
- Filter changes can cause large reflow.
- Many images may queue network requests if thumbnails are too close to viewport.

Recommendation: do not add virtualization in the first implementation. Instead:

- optimize thumbnails
- sort once in the data adapter
- memoize filtered items
- keep card rendering light
- consider pagination or "load more" before virtualization if 200+ images becomes real

## Part H - Gallery Mobile UX

The requested structure is close, but current Tailwind breakpoints start two columns at 640px. Recommended gallery columns:

| Width | Columns | Notes |
|---:|---:|---|
| 320 | 1 | Best for readability and tap targets |
| 360 | 1 | Keep full image focus |
| 375 | 1 | Avoid cramped cards |
| 390 | 1 | Avoid cramped cards |
| 412 | 1 | Avoid cramped cards |
| 430 | 1 | Avoid cramped cards |
| 480 | 2 | Optional upgrade point using custom class or Tailwind arbitrary variant |
| 640 | 2 | Current `sm:columns-2` behavior |
| 768 | 2 or 3 | Prefer 3 only if real thumbnails remain readable |
| 820 | 3 | Good tablet portrait target |
| 1024 | 3 | Current `lg:columns-3` |
| 1280 | 4 | Current `xl:columns-4` |
| 1440 | 4 | Preserve desktop |
| 1920 | 4 | Preserve desktop with max-width container |

Recommended first implementation:

- Keep desktop `xl:columns-4`.
- Use `columns-1 min-[480px]:columns-2 md:columns-3 xl:columns-4` if 480px two-column behavior looks premium with real images.
- If 480px feels cramped, keep the existing `sm:columns-2`.

Category filters:

- Current wrapped filter row can become tall when 14 categories exist.
- On mobile, plan a horizontal scroll row with `overflow-x-auto`, `whitespace-nowrap`, and hidden scrollbar or subtle scroll affordance.
- Preserve wrapped desktop filters if desired.

## Part I - Lightbox Mobile UX

Current strengths:

- fullscreen fixed overlay
- close button focus
- keyboard Escape and arrow navigation
- body scroll lock
- pointer swipe
- `object-contain`

Planned improvements:

| Area | Planned Change |
|---|---|
| Fullscreen mobile | Use `min-h-dvh` / `height: 100dvh` for overlay internals while keeping fallback |
| Safe area | Add padding using `env(safe-area-inset-*)` on mobile |
| Close button | Keep 48px current size; ensure it never overlaps title |
| Previous/next | Keep side controls on tablet/desktop; on narrow mobile consider bottom controls or slightly inset controls |
| Swipe | Keep existing pointer swipe; ensure it does not block image vertical fit |
| Keyboard | Keep Escape and arrow keys |
| Body scroll lock | Keep current body overflow restore behavior |
| Focus trap | Add focus trap so keyboard users stay inside modal |
| Image fallback | Add full-image load error fallback |

Preserve the dark fullscreen visual style.

## Part J - Full Website Responsiveness Audit

Routes audited conceptually from source:

- `/`
- `/developer`
- `/designer`
- `/contact`

Target widths:

`320`, `360`, `375`, `390`, `412`, `430`, `480`, `640`, `768`, `820`, `1024`, `1280`, `1440`, `1920`

### Responsive Problem Areas Found

1. Landing hero uses `100vh` / `calc(100vh - 5rem)` and may be affected by mobile browser UI.
2. Landing central portrait/name overlay may collide with split labels on very short mobile screens.
3. Role hero uses absolute text, portrait, role text, and floating tools in one viewport.
4. Role hero `z-15` is not a default Tailwind utility and may not create intended layer order.
5. Huge name typography uses aggressive `clamp()` and negative tracking.
6. Hero portrait uses a 19rem minimum width, potentially large at 320px.
7. Floating tools use percent positions and parallax transforms.
8. Decorative hero environments add complexity on tablet widths.
9. Mobile category filters will wrap into many rows with 14 categories.
10. Project carousel uses full viewport container width and fixed `min-h-[34rem]` cards.
11. Project titles use `text-4xl sm:text-6xl`, possibly tall in mobile cards.
12. Certificate cards use `min-h-[30rem]` and image area `aspect-[4/3]`.
13. Section headers use `text-4xl sm:text-6xl lg:text-7xl`, which may be large for compact sections.
14. Contact heading uses `text-5xl sm:text-7xl lg:text-8xl`.
15. Contact discipline buttons become 3 columns at `sm`, which can feel tight at 640px.
16. Fixed navbar/mobile panel may cover top content and can grow tall if links increase.
17. Widespread `overflow-hidden` can mask actual overflow during testing.
18. Low-opacity small typography may become hard to read on small devices.

## Part K - Landing Page Responsiveness

File: `src/components/identity/IdentitySelector.tsx`

Current behavior:

- Full viewport section with top padding for navbar.
- Mobile layout stacks Developer and Designer vertically.
- Desktop/tablet at `md` becomes split half-and-half layout.
- The portrait and name typography are absolute overlay layers.
- Hover/focus changes active mode and moves typography slightly.

Plan:

- Preserve desktop split design.
- Add mobile-specific safeguards rather than redesigning the desktop.
- Consider `min-h-[100svh]` or `min-h-dvh` only for this section after screenshot baseline.
- At 320-430px, keep the two identity panels readable and ensure the central portrait does not cover labels.
- If needed, reduce mobile portrait width only for landing composition.
- Keep keyboard focus behavior and visible focus outline.

## Part L - Role Hero Responsiveness

Files:

- `src/components/hero/RoleHero.tsx`
- `src/components/hero/HeroName.tsx`
- `src/components/hero/HeroPortrait.tsx`
- `src/components/hero/DeveloperHeroEnvironment.tsx`
- `src/components/hero/DesignerHeroEnvironment.tsx`
- `src/components/hero/FloatingToolNode.tsx`
- `src/data/heroTools.ts`

### Current Mechanics

- `RoleHero` owns viewport section and pointer parallax.
- `HeroName` positions `NIPUN` near top and `BASNAYAKA` near bottom.
- `HeroPortrait` centers a corrected portrait image with `clamp(19rem, 38vw, 29rem)`.
- `FloatingToolNode` scales icons with `clamp()`, percent positions, and breakpoint visibility by priority.
- Developer/designer environments render different decorative systems.

### Recommended Behavior

| Range | Behavior |
|---|---|
| Mobile | Show only highest-priority 2-3 tool nodes, reduce portrait minimum if overlap appears, keep role text visible, reduce decorative environment density |
| Tablet | Show medium-priority tools gradually, verify portrait/name layering at 768/820 |
| Laptop | Preserve current layout; fix `z-15` only after baseline |
| Desktop | Preserve current 1280/1440 composition |
| Ultrawide | Keep content max-width but allow environment to span viewport; check far tool positions |

Do not replace the hero with a generic stacked hero. The layered name/portrait/tool environment is the signature design.

## Part M - Mobile Viewport Height

Current usage:

- `body` has `min-height: 100vh`
- App wrapper uses `min-h-screen`
- Landing and role hero sections use `min-h-screen`
- Hero internals use `min-h-[calc(100vh-5rem)]`
- Contact page uses `min-h-screen`

Plan:

- Do not globally replace all viewport units at once.
- Add targeted support to visually sensitive full-screen sections first.
- Preferred strategy:
  - fallback: `min-height: 100vh`
  - enhanced: `min-height: 100dvh` or Tailwind `min-h-dvh` where supported
  - internal calc: consider `min-h-[calc(100dvh-5rem)]` only in hero/landing after visual testing
- Test iOS Safari and Android Chrome with address bar shown/hidden.

## Part N - Navigation Responsiveness

Files:

- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`

Current strengths:

- Mobile menu button is 44px via `size-11`.
- Desktop nav hides at `md`.
- Mobile panel uses large rounded links.
- Role switch is included on role routes.
- Footer links wrap.

Planned checks:

- At 320px, ensure panel width and link text fit.
- Ensure mobile panel does not exceed viewport height if links grow.
- Consider `max-h-[calc(100dvh-6rem)] overflow-y-auto` for the mobile panel.
- Keep touch targets at least 44px.
- Preserve anchor navigation behavior.

## Part O - Developer Page Responsiveness

### Summary

Current grid collapses to one column before `lg`. Good. Main risk is section heading size and card spacing on very small screens.

### Skills

Current grid:

- one column on mobile
- two columns from `md`

This is appropriate. Keep card min height but test 320px for long skill chips.

### Experience

Current timeline becomes a three-column layout only at `lg`. Mobile is stacked and should be safe. Watch long company/location text and stack chips.

### Projects Carousel

Current risks:

- Card min height is `34rem`.
- Card width equals viewport container width.
- Title can be `text-4xl` on mobile and `sm:text-6xl`.
- Only Problem and Solution render, so long text must fit within one card.

Plan:

- Keep single-card mobile presentation.
- Consider smaller mobile title size and tighter spacing only if clipping appears.
- Keep buttons and dots visible.
- Disable drag/autoplay on coarse pointers as currently planned.

### Certificates

Current behavior:

- Mobile card width is 82 percent of viewport.
- Cards are draggable.
- Desktop nav buttons hidden on mobile; dots remain.

Plan:

- Keep mobile preview behavior.
- Confirm images fit inside `aspect-[4/3]`.
- Add missing image only after content decision.
- Consider visible mobile arrow controls only if user testing shows dots/drag are not discoverable.

### Education And Contact CTA

Generally safe. Verify long program names and CTA text at 320px.

## Part P - Designer Page Responsiveness

Current designer page sections are mostly stacked before `lg`, which is safe.

Focus areas:

- Designer hero, same as role hero.
- Profile cards switch to two columns at `sm`; at 640px this is fine, at smaller widths one column.
- Category overview uses two columns at `sm` and four at `lg`; safe.
- Gallery filters should become horizontally scrollable on mobile.
- Gallery masonry should preserve mixed aspect ratios.
- Contact CTA heading may need mobile size testing with real content.

## Part Q - Contact Page Responsiveness

File: `src/pages/ContactPage.tsx`

Current strengths:

- Form uses 16px text inputs through `text-base`, preventing iOS zoom.
- Name/email stack below `sm`.
- Inquiry/phone stack below `sm`.
- Direct methods are one column until `sm`.
- Submit button has 56px height.

Risks:

- Main heading `text-5xl` at mobile may be large for 320px.
- Discipline buttons become three columns at `sm`; at 640px text may be tight.
- Source badge and form header can feel cramped.
- Status messages should be checked for wrapping.

Plan:

- Keep `text-base` inputs.
- Test 320/360 with long submit labels.
- Consider two-line-safe buttons or reduced tracking only on mobile if text overflows.
- Keep validation messages close to fields.

## Part R - Overflow Audit

| File / Area | Occurrence | Classification | Notes |
|---|---|---|---|
| `src/App.tsx` | app wrapper `overflow-x-hidden` | POSSIBLY MASKING A BUG | Useful guard, but can hide real horizontal overflow |
| `src/styles/globals.css` | body `overflow-x: hidden` | POSSIBLY MASKING A BUG | Same concern; keep until testing identifies sources |
| `IdentitySelector.tsx` | section and inner wrapper `overflow-hidden` | REQUIRED FOR DESIGN | Clips overlay hero layers |
| `RoleHero.tsx` | section/layers `overflow-hidden` | REQUIRED FOR DESIGN | Hero atmospherics and tools need clipping |
| `DeveloperHeroEnvironment.tsx` | full environment `overflow-hidden` | REQUIRED FOR DESIGN | Prevents decorative overflow |
| `DesignerHeroEnvironment.tsx` | full environment `overflow-hidden` | REQUIRED FOR DESIGN | Prevents decorative overflow |
| `ProjectsSection.tsx` | carousel viewport `overflow-hidden` | REQUIRED FOR DESIGN | Needed for slider |
| `CertificatesSection.tsx` | section/viewport/cards `overflow-hidden` | REQUIRED FOR DESIGN | Needed for carousel/cards |
| `DesignGalleryItem.tsx` | card/image overflow hidden | REQUIRED FOR DESIGN | Rounded card clipping |
| `DesignLightbox.tsx` | fixed fullscreen overlay | SAFE | Not masking layout; modal behavior |
| Generic cards | rounded card overflow hidden | SAFE | Visual clipping only |

Do not remove overflow rules casually. Instead, test with temporary browser/debug outline styles during implementation.

## Part S - Responsive Typography

High-risk typography:

- `NIPUN` and `BASNAYAKA` in `HeroName.tsx`
- landing name typography in `IdentitySelector.tsx`
- `SectionHeader` global section titles
- `ProjectCard` titles
- contact page H1
- designer CTA headings

Plan:

- Preserve desktop sizes.
- Only adjust mobile sizes if screenshot evidence shows clipping.
- Avoid changing negative tracking on desktop.
- For mobile, reduce extreme letter spacing and font size in targeted classes if necessary.
- Ensure semantic headings are corrected without visible design changes.

Potential mobile-only targets:

- `ProjectCard` title from `text-4xl` to a slightly smaller mobile clamp if needed.
- Contact H1 from fixed `text-5xl` to a safer mobile clamp if needed.
- Hero portrait minimum from `19rem` to a smaller mobile-only minimum if overlap appears.

## Part T - Responsive Images

| Image Type | Current Behavior | Plan |
|---|---|---|
| Hero portrait | PNG, eager, high priority, object contain | Preserve composition; later optimize file and possibly responsive source |
| Gallery thumbnails | Lazy, intrinsic width/height, natural aspect | Keep; add JSON-driven paths and error fallback |
| Gallery full images | Loaded only when lightbox item active | Keep contain behavior; add safe-area/error fallback |
| Certificates | Lazy inside carousel cards | Keep; optimize large files later |
| Tool icons | Lazy decorative icons, 300x300 PNGs | Keep; visibility by priority protects mobile |
| Background media | CSS gradients/SVG, no external media | Preserve; reduce mobile density only in hero if needed |

## Part U - Accessibility During Responsive Changes

Do not let mobile fixes reduce accessibility.

Requirements:

- Preserve visible focus styles.
- Keep tap targets around 44px minimum.
- Add semantic accessible H1 for non-contact routes.
- Keep category filter buttons as buttons with `aria-pressed`.
- Add lightbox focus trap.
- Keep Escape and arrow keys.
- Keep alt text required in JSON.
- Keep form labels and `text-base` input size.
- Keep reduced-motion behavior intact.

## Part V - Responsive Implementation Risk Map

| Area | Files | Current Problem | Mobile Risk | Recommended Change | Visual Risk |
|---|---|---|---|---|---|
| Gallery data | `designPortfolio.ts`, future `designGallery.json`, future `designGallery.ts` | Items hardcoded/empty | Low | Add JSON adapter and validation | LOW |
| Gallery filters | `DesignCategoryFilters.tsx` | 14 filters wrap into many rows | Medium | Horizontal scroll on mobile | MEDIUM |
| Gallery cards | `DesignGalleryItem.tsx` | No image error fallback | Medium | Add fallback, preserve masonry | MEDIUM |
| Lightbox | `DesignLightbox.tsx` | No focus trap/safe-area tuning | Medium | Add trap and mobile safe-area layout | MEDIUM |
| Landing hero | `IdentitySelector.tsx` | Overlay + 100vh + portrait/name | High | Mobile-specific composition safeguards | HIGH |
| Role hero shell | `RoleHero.tsx` | Absolute layers, `z-15`, 100vh | High | Fix layer utility and mobile height strategy | HIGH |
| Hero name | `HeroName.tsx` | Huge clamps and absolute top/bottom | High | Mobile-only sizing/position tweaks if needed | HIGH |
| Portrait | `HeroPortrait.tsx` | 19rem min width | High | Mobile-specific minimum width only if overlap | HIGH |
| Developer environment | `DeveloperHeroEnvironment.tsx` | Dense decorations | Medium | Hide/reduce low-priority mobile decorations | HIGH |
| Designer environment | `DesignerHeroEnvironment.tsx` | Dense decorations | Medium | Hide/reduce low-priority mobile decorations | HIGH |
| Floating tools | `FloatingToolNode.tsx`, `heroTools.ts` | Percent positions and parallax | Medium | Refine mobile priorities/positions | HIGH |
| Navbar | `Navbar.tsx` | Mobile menu height not constrained | Medium | Add max height/scroll if needed | MEDIUM |
| Section headings | `SectionHeader.tsx` | Large text across sections | Medium | Mobile-specific title sizing if needed | MEDIUM |
| Projects carousel | `ProjectsSection.tsx`, `ProjectCard.tsx` | Tall cards and large titles | High | Single-card mobile with safe title sizing | MEDIUM |
| Certificates carousel | `CertificatesSection.tsx` | Tall cards and lazy images | Medium | Test 320; tune card width if needed | MEDIUM |
| Contact page | `ContactPage.tsx` | Large heading and dense controls | Medium | Preserve 16px inputs; tune mobile headings/buttons | MEDIUM |
| Global overflow | `App.tsx`, `globals.css` | May hide overflow bugs | Medium | Keep but test with overflow diagnostics | MEDIUM |
| Viewport units | hero/landing/contact/global | Mobile browser chrome | High | Targeted `dvh`/fallback strategy | HIGH |

## Part W - Implementation Phases

### Phase 0 - Visual Baseline

- Capture screenshots at 320, 375, 430, 768, 820, 1024, 1280, 1440, 1920.
- Capture `/`, `/developer`, `/designer`, `/contact`.
- Capture reduced-motion mode if possible.
- Record current hero composition before edits.

### Phase 1 - Gallery Data Architecture

- Add `src/data/designGallery.json`.
- Add `src/data/designGallery.ts` adapter/validator.
- Keep `DesignItem` compatibility.
- Preserve `DesignerPage` prop shape.

### Phase 2 - Gallery Image Support

- Add `public/assets/gallery/` structure.
- Add sample real artwork entries.
- Normalize `thumbnail ?? image`.
- Require `width` and `height`.

### Phase 3 - Gallery Mobile Experience

- Make category filters horizontally scrollable on mobile.
- Tune columns only after real images exist.
- Add gallery image error fallback.

### Phase 4 - Global Responsive Foundation

- Establish viewport testing harness/checklist.
- Audit overflow with temporary diagnostics.
- Add targeted viewport height utilities where needed.

### Phase 5 - Landing Responsive Fixes

- Preserve desktop split.
- Add mobile-only safeguards for portrait/name/panel overlap.

### Phase 6 - Developer Hero Responsive Fixes

- Fix `z-15` if visual baseline confirms intended layer.
- Tune developer mobile tool visibility/positions.
- Preserve desktop.

### Phase 7 - Designer Hero Responsive Fixes

- Mirror role hero fixes.
- Tune designer decorative density on mobile/tablet.

### Phase 8 - Developer Page Responsive Sections

- Validate summary, skills, experience.
- Tune project carousel mobile card typography/spacing if needed.
- Validate certificates.

### Phase 9 - Designer Page Responsive Sections

- Validate profile, experience, categories, gallery, contact CTA with real images.

### Phase 10 - Contact Page Responsive Fixes

- Validate 320px form fit.
- Keep 16px inputs.
- Tune heading and segmented controls if needed.

### Phase 11 - Lightbox / Accessibility

- Add focus trap.
- Add safe-area layout.
- Validate keyboard and swipe.

### Phase 12 - Cross-Browser / Mobile Regression

- Test Chrome, Edge, Firefox, Safari if available.
- Test iOS Safari and Android Chrome.
- Compare desktop screenshots to baseline.

## Part X - Exact File Change Plan

| File | Why Change Is Needed | Planned Change | Risk |
|---|---|---|---|
| `src/data/designGallery.json` | New JSON source of truth for items | Add gallery item records | LOW |
| `src/data/designGallery.ts` | Type validation and normalization | Import JSON, validate category IDs, export `DesignItem[]` | LOW |
| `src/data/designPortfolio.ts` | Currently contains empty `designItems` | Keep categories, import/export validated items | MEDIUM |
| `public/assets/gallery/` | Needed file-based artwork storage | Add organized folders and images | LOW |
| `src/components/design/DesignCategoryFilters.tsx` | Mobile filters wrap too much | Add mobile horizontal scroll behavior | MEDIUM |
| `src/components/design/DesignGallery.tsx` | Column breakpoints may need adjustment | Tune columns after real image baseline | MEDIUM |
| `src/components/design/DesignGalleryItem.tsx` | No image error fallback/tools/year display | Add fallback; optionally render year/tools without crowding | MEDIUM |
| `src/components/design/DesignLightbox.tsx` | Needs mobile safe area/focus trap/error fallback | Add focus trap and mobile-safe layout | MEDIUM |
| `src/components/identity/IdentitySelector.tsx` | Landing mobile is visually sensitive | Add mobile-specific layout safeguards | HIGH |
| `src/components/hero/RoleHero.tsx` | `z-15`, viewport height, role hero layering | Fix z utility and targeted mobile height strategy | HIGH |
| `src/components/hero/HeroName.tsx` | Large typography can overlap on small screens | Mobile-only positioning/sizing if required | HIGH |
| `src/components/hero/HeroPortrait.tsx` | 19rem min portrait may be large at 320px | Mobile-only width tuning if required | HIGH |
| `src/components/hero/DeveloperHeroEnvironment.tsx` | Decorative density on mobile/tablet | Hide/tune low-priority layers | HIGH |
| `src/components/hero/DesignerHeroEnvironment.tsx` | Decorative density on mobile/tablet | Hide/tune low-priority layers | HIGH |
| `src/components/hero/FloatingToolNode.tsx` | Tool visibility/positions | Tune mobile visibility classes if required | HIGH |
| `src/data/heroTools.ts` | Floating tool positions are data-driven | Adjust mobile priorities/positions only with screenshots | HIGH |
| `src/components/layout/Navbar.tsx` | Mobile menu height may need guard | Add max-height/overflow if menu grows | MEDIUM |
| `src/components/common/SectionHeader.tsx` | Shared heading size may be large | Mobile-only type tuning if evidenced | MEDIUM |
| `src/components/ui/ProjectCard.tsx` | Mobile title/card height risk | Tune mobile text/spacing only if clipping appears | MEDIUM |
| `src/components/sections/ProjectsSection.tsx` | Carousel mobile behavior | Confirm single card; tune metrics if needed | MEDIUM |
| `src/components/sections/CertificatesSection.tsx` | Carousel mobile behavior | Confirm card widths/controls | MEDIUM |
| `src/pages/DesignerPage.tsx` | Gallery integration and section behavior | Only adjust if new gallery content changes layout | MEDIUM |
| `src/pages/ContactPage.tsx` | 320px fit and control wrapping | Tune heading/buttons/source badge if needed | MEDIUM |
| `src/styles/globals.css` | Viewport/overflow/debug utilities | Add only targeted global support if necessary | MEDIUM |

## Part Y - Acceptance Criteria

Gallery:

- Adding a gallery item requires only adding an image file and a JSON item.
- No React component edit is required for each new gallery item.
- JSON `categoryId` must match one of the 14 existing category IDs.
- Invalid category IDs fail clearly during development.
- `thumbnail` can be omitted and defaults to `image`.
- Mixed aspect ratios render without square cropping.
- Masonry layout has no broken card gaps caused by missing dimensions.
- Lightbox displays full artwork with `object-contain`.
- Gallery remains usable with 50 and 100 items.
- 200+ items have a documented load-more/pagination path if needed.

Responsive:

- No horizontal scrolling at 320px.
- Landing page keeps Developer/Designer identity clear on mobile.
- Existing 1440px desktop layout remains visually unchanged unless intentionally approved.
- Role heroes retain layered name, portrait, tools, and role-specific identity.
- No overlapping hero text/portrait/role label at 320, 375, 430, 768, 820, 1024.
- Navigation is usable by touch at 320px.
- Mobile menu does not overflow viewport height.
- Project carousel content does not clip.
- Certificate carousel remains usable by drag/dots.
- Contact form fits 320px.
- iOS inputs do not zoom unexpectedly because input font size remains at least 16px.
- Reduced-motion behavior remains functional.
- Lightbox supports close, Escape, next/previous, swipe, and focus containment.

## Part Z - Final Recommendation

1. Recommended gallery architecture: add `public/assets/gallery/` for files, `src/data/designGallery.json` for item records, and `src/data/designGallery.ts` as a typed validation/normalization adapter.
2. Recommended JSON schema: required `id`, `title`, `categoryId`, `image`, `alt`, `width`, `height`, `sortOrder`; optional `thumbnail`, `description`, `tools`, `year`, `featured`, `client`, `format`.
3. Recommended folder structure: organize images by convenience under `public/assets/gallery/`, with optional `thumbs/` and `full/`; never infer category from folder.
4. Existing category mapping: keep the 14 existing IDs in `src/data/designPortfolio.ts`.
5. Exact files that would change: listed in Part X.
6. Highest-risk responsive components: `IdentitySelector`, `RoleHero`, `HeroName`, `HeroPortrait`, `DeveloperHeroEnvironment`, `DesignerHeroEnvironment`, `FloatingToolNode`, `heroTools`.
7. Safest implementation sequence: baseline screenshots first, gallery data architecture second, responsive fixes after real content exists.
8. Mobile breakpoint strategy: 1 column through 430px, optional 2 columns at 480px, 2-3 columns on tablets, 4 columns at desktop.
9. Gallery performance strategy: optimized thumbnails, lazy loading, intrinsic dimensions, memoized filtering, no virtualization in first implementation.
10. Confirmation: no application source code was modified while creating this plan.
