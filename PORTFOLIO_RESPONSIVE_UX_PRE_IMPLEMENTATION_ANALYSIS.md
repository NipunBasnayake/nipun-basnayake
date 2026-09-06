# Portfolio Responsive UX Pre-Implementation Analysis

Date: 2026-09-06

This audit inspected the current Vite/React portfolio architecture, including `src/App.tsx`, all route pages, layout components, identity/hero components, developer sections, design gallery/lightbox components, hooks, Tailwind/global styles, Vite config, index HTML, and the gallery data/assets.

## Findings

| ID | Route | Area | File | Width/Height Risk | UX Problem | Severity | Proposed Fix | Visual Risk |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RUX-01 | `/designer` | Gallery | `src/components/design/DesignGallery.tsx` | All widths, long pages | All 177 gallery items render at once for `All`, increasing DOM/media work and making browsing feel overwhelming. | HIGH | Render an initial batch, add explicit Load More, and reset count on filter changes. | LOW |
| RUX-02 | `/designer` | Gallery filters | `src/components/design/DesignGallery.tsx`, `DesignCategoryFilters.tsx` | 320-430 wide, long page | Filters are horizontally scrollable on mobile, but long-gallery browsing lacks count context and progressive state. | MEDIUM | Keep non-empty generated filters, improve filter semantics, and expose visible/total counts near Load More. | LOW |
| RUX-03 | `/designer` | Gallery cards | `src/components/design/DesignGalleryItem.tsx` | 320-430 wide, coarse pointer | Desktop hover transform applies to touch devices, and video cards rely mostly on poster fallback. | MEDIUM | Limit hover lift to hover-capable devices, keep full-card tap target, and retain poster-only gallery video rendering. | LOW |
| RUX-04 | `/designer` | Fullscreen viewer | `src/components/design/DesignLightbox.tsx` | 320x568, 360x640 | Side arrows can cover too much artwork on small phones; body scroll lock only sets `overflow`, and focus is not labeled with described context. | HIGH | Add fixed-position body lock, compact mobile controls, safe-area-aware layout, and descriptive modal text. | MEDIUM |
| RUX-05 | `/`, `/developer`, `/designer`, `/contact` | Viewport height | `IdentitySelector.tsx`, `RoleHero.tsx`, `ContactPage.tsx`, `globals.css` | Short/tall mobile screens | Current `100vh`/`min-h-screen` can mis-measure browser chrome; short screens risk clipped hero/nav content. | HIGH | Add targeted `svh`/`dvh` utility classes for full-screen compositions and keep `vh` fallback. | MEDIUM |
| RUX-06 | `/` | Landing composition | `src/components/identity/IdentitySelector.tsx` | 320x568, 360x640 | Each split half uses viewport math and large labels; short phones can feel crowded, with portrait/name overlays competing with role labels. | HIGH | Use dynamic viewport utilities, clamp mobile padding, reduce short-screen label scale, and keep the split identity intact. | HIGH |
| RUX-07 | `/developer`, `/designer` | Role hero composition | `RoleHero.tsx`, `HeroName.tsx`, `HeroPortrait.tsx`, hero environments | 320x568, 1366x768 | Portrait, name typography, floating tools, and bottom role copy compete on short screens. | HIGH | Use height-aware hero sizing/positioning, reduce mobile decorations, and preserve full desktop tool environment. | HIGH |
| RUX-08 | `/developer`, `/designer`, `/contact` | Navigation | `src/components/layout/Navbar.tsx` | 320x568, 360x640 | Mobile menu has no internal height limit/scroll lock; longer developer menu can clip on short phones. | HIGH | Add scrollable mobile menu panel, body scroll lock while open, Escape close, safe-area top offsets, and larger focusable targets. | LOW |
| RUX-09 | `/developer` | Projects carousel | `src/components/sections/ProjectsSection.tsx`, `ProjectCard.tsx` | 320-430 wide | Mobile card width equals viewport container but card has large min-height and desktop-scaled title, making one project feel oversized. | MEDIUM | Slightly reduce mobile project card height/rounding/type and keep desktop presentation. | LOW |
| RUX-10 | `/developer` | Certificate carousel | `src/components/sections/CertificatesSection.tsx` | 320-430 wide | Card width is sensible, but min-height and hidden arrow controls make dots the only obvious mobile control. | MEDIUM | Add touch-friendly mobile controls/dots sizing and reduce mobile card height while preserving certificate legibility. | LOW |
| RUX-11 | `/developer`, `/designer` | Section spacing | Multiple section components | 320x568, 360x640 | `py-24 sm:py-32` across many sections wastes vertical space on phones, especially after hero. | MEDIUM | Establish `py-16 sm:py-24 lg:py-32` rhythm for content sections. | LOW |
| RUX-12 | `/developer` | Experience | `src/components/sections/ExperienceSection.tsx` | 320-430 wide | Long company/location/date strings use wide letter spacing and may wrap awkwardly. | MEDIUM | Allow wrapping, use `break-words`, and reduce mobile title scale slightly. | LOW |
| RUX-13 | `/contact` | Form fields | `src/pages/ContactPage.tsx` | 320-430 wide, mobile keyboard | Inputs use 16px text already, but phone/subject lack richer mobile keyboard hints. | MEDIUM | Add `type`, `inputMode`, and autocomplete attributes where safe; keep backend unchanged. | LOW |
| RUX-14 | `/contact` | Contact layout | `src/pages/ContactPage.tsx` | 320x568, 390x844 | Large contact heading plus form can feel tall on small screens; discipline buttons may be cramped. | MEDIUM | Use smaller mobile heading clamp, single-column controls, and stable button wrapping. | LOW |
| RUX-15 | All | Anchor navigation | `src/hooks/useRouteNavigation.ts`, `globals.css` | Fixed nav at all widths | Hash navigation can land under fixed navbar because no global scroll padding is defined. | MEDIUM | Add global `scroll-padding-top` and targeted `scroll-mt` through CSS. | LOW |
| RUX-16 | All | Horizontal overflow | `src/App.tsx`, `globals.css`, large hero text | 320-430 wide | Global `overflow-x-hidden` is present as a safety net; actual overflow sources include very large text and carousel transforms. | HIGH | Keep safety guard but constrain hero/card/carousel internals and verify 320px body scroll width. | MEDIUM |
| RUX-17 | All | Reduced motion | Motion-heavy components | Coarse/reduced-motion users | Lenis is gated, but many while-in-view animations still run unless Framer reduced motion is respected locally. | MEDIUM | Strengthen CSS reduced motion and reduce expensive gallery entrance effects for large lists. | LOW |
| RUX-18 | `/designer` | Designer CTA | `DesignerPage.tsx` | Long gallery | Contact CTA is after a potentially huge gallery; with progressive loading this improves, but a top CTA remains useful. | LOW | Keep explicit Load More and existing post-gallery CTA; avoid intrusive floating contact UI. | LOW |
| RUX-19 | `/designer` | Back to top | New local component or gallery section | Long gallery mobile | 177-item gallery can make returning to filters slow after several batches. | MEDIUM | Add a discreet Back to top control that appears after meaningful scroll. | LOW |
| RUX-20 | All | Ultrawide composition | `Container.tsx`, hero/gallery sections | 1920-2560 wide | `max-w-7xl` prevents major stretching, but gallery columns could become sparse on ultrawide. | LOW | Preserve container max width and add stable gallery column density. | LOW |

## Gallery Inventory

- Total gallery items: 177
- Images: 169
- Videos: 8
- Non-empty categories: 13
- Empty configured categories are correctly omitted from filters today because filters are generated from used gallery category IDs.

## Sticky Filter Decision

Sticky filters were evaluated but not chosen for initial implementation. The fixed navbar, rich visual gallery, and fullscreen viewer make an additional sticky row visually noisy. Progressive Load More plus Back to top gives long-gallery control without obscuring artwork.
