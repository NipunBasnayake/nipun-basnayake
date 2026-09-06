# Portfolio Full Production Analysis

Repository: `C:\Users\NIPUN\Desktop\nipun-basnayake`  
Output file: `PORTFOLIO_FULL_PRODUCTION_ANALYSIS.md`  
Analysis mode: read-only repository inspection. No application source files were modified.

## Executive Snapshot

This is a custom personal portfolio built as a Vite + React + TypeScript single page app. It presents two identities:

- Software Developer / Full Stack Software Engineer
- Graphic Designer / Web Designer

The developer side is content-rich and production-presentable, with seven engineering case studies, experience, skills, certificates, education, contact CTAs, and strong visual polish. The designer side has strong visual scaffolding, role-specific hero treatment, category filtering, masonry gallery behavior, and contact flow, but it currently has zero real design project entries in `src/data/designPortfolio.ts`.

The largest production risks are not broad architecture problems. They are focused readiness gaps: large above-the-fold portrait image, missing social/SEO metadata, missing SPA deployment rewrite config, contact API dependency on a serverless runtime and Resend environment variables, no `.env.example`, no tests/linting setup, and a few content/media inconsistencies.

## 1. Project Identification

| Item | Confirmed Finding |
|---|---|
| Project name | `nipun-basnayaka-portfolio` from `package.json` |
| Framework | React SPA |
| React version | Declared `^19.2.1`; installed `19.2.5` from `npm ls` |
| TypeScript version | Declared `^5.9.3`; installed `5.9.3` |
| Build system | Vite declared `^7.2.7`; installed `7.3.2`; config in `vite.config.ts` |
| CSS framework | Tailwind CSS `^3.4.19`; config in `tailwind.config.ts` |
| UI libraries | Custom React components; utility helpers `clsx`, `tailwind-merge` |
| Animation libraries | Framer Motion `^12.23.25`; Lenis `^1.3.15`; GSAP declared but not imported in `src/` |
| Icon library | `lucide-react` |
| Routing | Custom browser history hook in `src/hooks/useRouteNavigation.ts`; no React Router |
| State management | Local React state/hooks only |
| Data fetching | Native `fetch` in `src/services/contactService.ts` and `api/contact.ts` |
| Forms | Hand-written React form state and validation in `src/pages/ContactPage.tsx` |
| Image handling | Static public assets loaded by URL; no responsive image library |
| SEO library | None |
| Analytics | None found |
| Backend/API | Vercel-style serverless function at `api/contact.ts` |
| Email integration | Resend API via `https://api.resend.com/emails` |
| CMS | None |
| Deployment config | No `vercel.json`, `netlify.toml`, Dockerfile, nginx config, or GitHub Actions found |
| Package manager | npm; `package-lock.json` lockfileVersion 3 |
| Node.js requirements | No `engines` field in `package.json` |
| Development command | `npm run dev` -> `vite` |
| Build command | `npm run build` -> `tsc -b && vite build` |
| Preview command | `npm run preview` -> `vite preview` |
| Production output | Vite default `dist/` |

Build was not rerun because the configured build would write to `dist/` and TypeScript build info under `node_modules/.tmp`, while the task allowed only the final report file to be created/updated. Existing `dist/` was inspected as a baseline.

## 2. Important Project Structure

| Path | Purpose |
|---|---|
| `index.html` | Root Vite HTML shell, global title/description, Google Fonts, hero image preload, favicon |
| `src/main.tsx` | React root mount and global CSS import |
| `src/App.tsx` | Top-level route selection, animated page transitions, document title/meta description updates, navbar/footer |
| `src/pages/` | Four page modules: landing, developer, designer, contact |
| `src/components/layout/` | Fixed navbar and footer |
| `src/components/identity/` | Landing split selector for Developer vs Designer |
| `src/components/hero/` | Shared role hero, portrait, large typography, role-specific animated environments, floating tool nodes |
| `src/components/sections/` | Developer page sections: hero, summary, skills, experience, projects, certificates, education, contact |
| `src/components/design/` | Designer gallery filters, masonry item, lightbox, empty state |
| `src/components/ui/` | Generic visual building blocks and cards |
| `src/components/common/` | Container/header wrappers and re-exports |
| `src/data/` | Centralized portfolio, design portfolio, hero tool, and contact context data |
| `src/hooks/` | Custom route navigation, Lenis smooth scroll, rotating text hook |
| `src/services/` | Contact API client |
| `src/types/` | Contact form types |
| `src/styles/globals.css` | Tailwind layers, global body styles, scrollbar, reduced motion media query |
| `api/contact.ts` | Serverless contact endpoint using Resend |
| `public/` | Profile image, certificate images, hero tool icons |
| `dist/` | Existing built output; ignored by git |

Architectural pattern: data-driven section rendering. Most visible content is in `src/data/portfolio.ts`, `src/data/designPortfolio.ts`, `src/data/heroTools.ts`, and `src/data/contactContexts.ts`, with components mapping arrays into UI.

## 3. Professional Identity Analysis

### Developer Side

The developer side is the stronger production identity. It has:

- Developer-specific route `/developer`
- Role hero using `RoleHero` with `variant="developer"` and `developerHeroTools`
- Seven case studies in `src/data/portfolio.ts`
- Strong technical categories: backend/APIs, frontend, data, distributed systems, cloud/devops, engineering practice
- Experience timeline with current Associate Software Engineer role, internship, and trainee experience
- Certificates and education sections that support technical credibility
- Direct developer contact path through `/contact?from=developer`

Developer credibility is strong, but project links are uneven. Two projects have GitHub source links, while several project CTAs point to contact anchors. That may be intentional for private/professional work, but a recruiter may expect more source/demo evidence.

### Designer Side

The designer side has a complete visual framework:

- Designer-specific route `/designer`
- Role hero using `RoleHero` with `variant="designer"` and `designerHeroTools`
- Designer profile section
- Designer experience section since 2019
- Design category system with 14 categories
- Masonry gallery, filters, lazy thumbnails, and lightbox components
- Direct design contact path through `/contact?from=designer`

Confirmed gap: `src/data/designPortfolio.ts` exports `designItems: DesignItem[] = []`. The UI intentionally renders an empty state. This is honest and safer than fake content, but it means the designer portfolio is not yet persuasive for clients looking for real artwork.

### Identity Switching

The distinction is clear at first visit because `/` uses `IdentitySelector` with a split-screen Developer/Designer choice. Role pages also include a navbar segmented switch between Dev and Design. The contact form preserves source context through query params and defaults inquiry focus by source.

Potential UX confusion:

- A visitor entering directly at `/developer` or `/designer` sees the identity clearly, but the huge visual name treatment is mostly decorative and not accessible as a semantic H1.
- The designer page promotes a gallery but the current gallery is empty, which may feel unfinished even though the text explains why.
- The package name uses `basnayaka`, while GitHub URLs use `NipunBasnayake`. This may be correct account naming, but should be verified for brand consistency.

## 4. Routes And Pages

Routes are defined in `src/hooks/useRouteNavigation.ts` and selected in `src/App.tsx`.

| Route | Purpose | Major Components | Data Source | Images | Animations | CTAs/Links | Issues |
|---|---|---|---|---|---|---|---|
| `/` | Identity selection between developer and designer | `LandingPage`, `IdentitySelector`, `HeroPortrait`, `AnimatedGrid`, `Navbar`, `Footer` | `heroData` | `/assets/images/photos/profile.png` | Framer Motion split hover/focus opacity, name movement, portrait tone | Developer, Designer, Contact | No accessible page H1; heavy hero image above fold |
| `/developer` | Software engineering portfolio | `DeveloperPage`, `HeroSection`, `RoleHero`, `SummarySection`, `SkillsSection`, `ExperienceSection`, `ProjectsSection`, `CertificatesSection`, `EducationSection`, `ContactSection` | `portfolio.ts`, `heroTools.ts` | Profile, 8 developer tool icons, certificates | Page transition, hero pointer parallax, floating tools, scroll entrance, project/certificate carousels | Contact, GitHub links, certificate references | Large JS/image budget; no route code splitting; no accessible H1 in hero |
| `/designer` | Graphic/web design portfolio | `DesignerPage`, `RoleHero`, profile/experience/category/work/contact sections, `DesignGallery` | `designPortfolio.ts`, `heroTools.ts` | Profile, 9 designer tool icons | Designer environment parallax, floating tools, scroll entrance, gallery lightbox when items exist | Start a Design Project | `designItems` empty; no real artwork yet |
| `/contact` | Contact form and direct links | `ContactPage`, `ContactMethods`, `sendContactMessage` | `contactContexts.ts`, `contactData` | None directly except background effects | Page entrance, status focus | Email, WhatsApp, LinkedIn, GitHub depending source | Depends on `/api/contact`, Resend env vars, no rate limit/captcha |

Unknown initial paths normalize to route `/` in `useRouteNavigation.ts`, but the URL remains the unknown path until navigation. There is no 404 page.

## 5. Component Architecture

### Major Components Reviewed

| Component | Responsibility | Used By | State/Hooks | Notes |
|---|---|---|---|---|
| `App` | Route selection, page animation, meta updates | `main.tsx` | `useLenis`, `useRouteNavigation`, `useReducedMotion`, `useEffect` | Central app shell |
| `Navbar` | Route-aware desktop/mobile navigation | `App` | `useState` | Strong route-specific links; fixed top |
| `Footer` | Route-aware footer navigation | `App` | None | Clean, simple |
| `IdentitySelector` | Landing split identity picker | `/` | `useState`, `useReducedMotion` | Good first-visit clarity |
| `RoleHero` | Shared developer/designer hero composition | Developer and Designer pages | `useRef`, pointer motion values, RAF, reduced motion | Visually sensitive |
| `HeroName` | Large layered name typography | `RoleHero` | None | Decorative H1 issue |
| `HeroPortrait` | Profile image and glow/drop shadow | Landing and role heroes | `useReducedMotion` | LCP-sensitive |
| `DeveloperHeroEnvironment` | Technical SVG/grid/tool environment | `RoleHero` | `useTransform` | Many visual layers |
| `DesignerHeroEnvironment` | Design studio SVG/frame/tool environment | `RoleHero` | `useTransform` | Many visual layers |
| `FloatingToolNode` | Floating tool icon card | Hero environments | `useState`, `useTransform` | Good image fallback |
| `HeroCursorLight` | Pointer-following radial light | `RoleHero` | springs/transforms | Reduced-motion gated |
| `SectionHeader` | Eyebrow/title/intro section header | Many sections | Framer Motion | Reusable |
| `Container` | Max-width wrapper | Many sections | None | Reusable |
| `SummarySection` | Developer summary and proof points | Developer page | Motion | Data-driven |
| `SkillsSection` | Developer skill categories | Developer page | Motion | Data-driven |
| `ExperienceSection` | Developer experience timeline | Developer page | Motion | Data-driven |
| `ProjectsSection` | Developer case study carousel | Developer page | state, resize, pointer media query, interval | Autoplay only fine pointer |
| `ProjectCard` | Developer project content card | `ProjectsSection` | None | Does not render `architecture`, `result`, or `links` despite data existing |
| `CertificatesSection` | Certificate carousel | Developer page | state, resize, drag, image error fallback | Uses many images |
| `EducationSection` | Education list | Developer page | Motion | Data-driven |
| `ContactSection` | Developer CTA section | Developer page | Motion | Navigates to contact route |
| `DesignGallery` | Designer filter/gallery/lightbox orchestrator | Designer page | state, memo | Currently empty state |
| `DesignCategoryFilters` | Designer category buttons | `DesignGallery` | None | Uses `aria-pressed` |
| `DesignGalleryItem` | Gallery masonry item | `DesignGallery` | None | Future design assets ready |
| `DesignLightbox` | Fullscreen image preview | `DesignGallery` | refs, keydown, pointer swipe | No focus trap |
| `ContactPage` | Contact form page | `/contact` | state, memo, refs, effects | Largest component at about 504 logical lines |
| `GradientBlob` | Animated background blob | Many sections | `useReducedMotion` | Re-exported from common |
| `AnimatedGrid` | Animated background grid | Landing | `useReducedMotion` | Re-exported from common |

### Oversized / Tightly Coupled Areas

- `src/pages/ContactPage.tsx` combines context selection, validation, form rendering, direct links, submission, and status behavior in one file. It is understandable but large.
- `src/components/hero/FloatingToolsLayer.tsx` is about 367 lines and appears unused. The active hero path uses `FloatingToolNode` instead.
- `src/data/portfolio.ts` is about 877 logical lines and carries content, data interfaces, icons, links, certificates, education, and contact data in one module. That is acceptable for a portfolio, but future edits should be careful.
- `src/pages/DesignerPage.tsx` defines several section components inline. It is fine now but will grow quickly once real design project sections are added.

### POSSIBLY UNUSED Items

Confirmed by import search:

- `src/components/ui/Button.tsx`
- `src/components/ui/CapabilityCard.tsx`
- `src/components/ui/TimelineCard.tsx`
- `src/components/ui/StatPill.tsx`
- `src/components/ui/FloatingParticles.tsx`
- `src/components/hero/FloatingToolsLayer.tsx`
- `src/hooks/useRotatingText.ts`
- `navItems` and `footerLinks` exports in `src/data/portfolio.ts`
- `designerHero` export in `src/data/designPortfolio.ts`
- `gsap` dependency in `package.json`

These should be treated as possibly unused, not automatically deleted, until runtime/design history is confirmed.

## 6. Hero Section Deep Analysis

### How It Works

The role hero is implemented in `src/components/hero/RoleHero.tsx`.

- `RoleHero` accepts `variant: "developer" | "designer"` and a list of `HeroFloatingTool` objects.
- `variantCopy` selects role-specific eyebrow, tone line, background gradient, glow colors, and label color.
- A full viewport `<section id="hero">` uses `min-h-screen`, `overflow-hidden`, and `pt-20`.
- Background layers are absolutely positioned:
  - base gradient
  - ambient animated blobs
  - cursor spotlight
  - full viewport environment layer
  - central hero composition
- The environment layer switches between `DeveloperHeroEnvironment` and `DesignerHeroEnvironment`.
- Pointer parallax is driven by `pointermove` on `window`, throttled through `requestAnimationFrame`, normalized to `-1..1`, then smoothed with Framer Motion springs.
- `HeroName` renders two enormous text layers:
  - top `NIPUN`, behind portrait
  - bottom `BASNAYAKA`, in front of portrait base
- `HeroPortrait` uses the shared profile image, an alpha-mass correction offset, drop shadows, and eager/high-priority loading.
- The bottom role eyebrow/tone is positioned absolute near the bottom.

### Developer Hero Environment

`src/components/hero/DeveloperHeroEnvironment.tsx` renders:

- radial ambient background
- parallax SVG grid
- SVG network topology with optional animated pulses
- telemetry labels hidden at smaller breakpoints
- floating developer tools from `developerHeroTools`

### Designer Hero Environment

`src/components/hero/DesignerHeroEnvironment.tsx` renders:

- radial studio background
- abstract artboard fragments
- crop/registration marks
- bezier path and control handles
- palette/type badges
- floating designer tools from `designerHeroTools`

### Hero Layout Risks

| Risk | File | Detail |
|---|---|---|
| Tailwind class `z-15` is not a default z-index utility | `src/components/hero/RoleHero.tsx:139` | The intended environment z-index may not compile. Use `z-[15]` in a future fix if the current layering depends on it. |
| Very large above-the-fold image | `public/assets/images/photos/profile.png` | 2,615,370 bytes, 1722x2348 PNG, eager and preloaded. Likely LCP cost. |
| Decorative H1 semantics | `src/components/hero/HeroName.tsx`; `src/components/identity/IdentitySelector.tsx` | Huge name typography is inside `aria-hidden` wrappers. Non-contact pages lack a clear accessible H1. |
| Absolute/clamp composition | `HeroName`, `HeroPortrait`, `FloatingToolNode` | Uses `clamp()`, viewport percentages, absolute positioning, transforms, negative offsets, and hidden breakpoints. Needs viewport regression before any visual edit. |
| Viewport height assumptions | `RoleHero`, `IdentitySelector` | Uses `100vh` and `calc(100vh - 5rem)`. Mobile browser dynamic chrome may affect first viewport composition. Consider testing `dvh` only after visual baseline. |
| Heavy paint/composite effects | hero environment files | Multiple `blur`, `drop-shadow`, `backdrop-blur`, SVG paths, gradients, and animated transforms can be costly on low-end devices. |

## 7. Responsive Design Audit

Static code review indicates responsive behavior is mostly intentional and Tailwind-driven.

| Viewport | Likely Behavior | Severity |
|---|---|---|
| 320px | Body min-width is 320px. Landing splits vertically. Huge mobile name clamps to 4.2-5.5rem and 3.1-4.2rem. Tool nodes only show top priority items. | MEDIUM risk: hero overlap should be screenshot-tested |
| 375px / 390px / 430px | Better mobile room. Contact form stacks fields. Navbar mobile menu available. | LOW-MEDIUM |
| Tablet portrait | Landing remains vertical until `md`. Some hero environment layers start appearing at `sm`/`md`. | MEDIUM visual regression risk |
| Tablet landscape | `md:flex-row` split landing activates; fixed navbar overlays top. | LOW-MEDIUM |
| 1024px laptop | Desktop-ish navigation, Lenis enabled on fine pointer, more hero layers visible. | MEDIUM performance risk |
| 1280/1440 desktop | Intended primary composition. | LOW |
| 1920/ultrawide | Max-width `Container` protects content, while hero environment spans full viewport. | LOW-MEDIUM; full-width absolute tools need visual check |

Key responsive concerns:

- `overflow-x-hidden` hides horizontal overflow symptoms instead of exposing them during development.
- Several hero elements use absolute positioning plus transforms.
- `100vh` can be unstable on mobile browsers.
- The project carousel uses viewport width as card width and overflow hidden; small screens should be tested for clipped text in long project titles.
- Contact form has good stacking behavior, but long button text such as "Send Developer Inquiry" should be checked at 320px.

## 8. Performance Analysis

### Existing Build Baseline

Existing `dist/` assets:

| Asset | Raw | Gzip |
|---|---:|---:|
| `dist/assets/index-DqoWszKs.js` | 480.5 KB | 145.3 KB |
| `dist/assets/index-BqFLW7yI.css` | 57.5 KB | 10.1 KB |

### Performance Risks

- No route-based code splitting. Landing visitors download code for developer page, designer page, contact form, carousels, gallery, and server/contact client at once.
- Framer Motion is used throughout page transitions, hero, sections, carousels, and reusable visual components.
- `gsap` is installed but not used in source.
- The portrait PNG is very large for an eager/preloaded LCP candidate.
- Certificate carousel includes 22 referenced certificate images in data, though actual images are lazy-loaded.
- Multiple blur/drop-shadow/backdrop-blur layers can increase GPU/compositor work.
- Lenis runs a RAF loop on non-reduced-motion fine-pointer devices, with visibility pause handling.

### Core Web Vitals Concerns

| Metric | Likely Concern |
|---|---|
| LCP | Large profile PNG is preloaded/eager; Google Fonts also load before text render with `display=swap`. |
| CLS | Mostly controlled by fixed aspect containers and stable sections. Dynamic hero font/image loading should be tested. |
| INP | Pointer parallax, carousels, and many animated elements may affect low-end devices if main thread is busy. |

## 9. Image And Media Audit

Public assets total:

- `.png`: 19 files, about 2925.8 KB
- `.jpg`: 22 files, about 2519.3 KB
- No video assets found.

Largest public images:

| File | Size | Dimensions / Status |
|---|---:|---|
| `public/assets/images/photos/profile.png` | 2554.1 KB | 1722x2348 |
| `public/assets/images/certificates/diploma-information-technology.jpg` | 681.1 KB | 2480x3508 |
| `public/assets/images/certificates/multicloud-network-associate.jpg` | 255.2 KB | 1287x994 |
| `public/assets/images/certificates/python-bootcamp-zero-to-expert.jpg` | 204.9 KB | 1600x1190 |
| `public/assets/images/certificates/mastering-prompt-engineering.jpg` | 193.3 KB | 1600x1190 |
| `public/assets/images/certificates/docker-for-absolute-beginners.jpg` | 152.2 KB | 1286x909 |

Confirmed media findings:

- Missing referenced file: `public/assets/images/certificates/aws-solutions-architect-associate.jpg`, referenced at `src/data/portfolio.ts:770`.
- Duplicate byte-identical files: `docker-foundations.jpg` and `docker-foundations.png` have the same SHA-256 hash.
- Mislabelled WebP files with `.jpg` extensions:
  - `linux-for-absolute-beginners.jpg`
  - `mathematics-for-computing.jpg`
  - `docker-training-course-absolute-beginner.jpg`
- `blockchain-basics.jpg.jpg` exists and is referenced. It works by path, but the double extension is untidy.
- Hero tool images are 300x300 PNG files and all referenced tool files exist.

## 10. Font And Typography Audit

Fonts are loaded from Google Fonts in `index.html`:

- Inter weights 400, 500, 600, 700, 800, 900
- JetBrains Mono weights 500, 700
- Space Grotesk weight 700
- `display=swap` is present
- `preconnect` is present for `fonts.googleapis.com` and `fonts.gstatic.com`

Potential concerns:

- Many Inter weights are loaded for one portfolio. This supports the current visual design but adds font payload.
- No local font hosting or font preload for exact font files.
- The CSS uses `font-synthesis: none`, which is good for visual consistency.
- FOUT is more likely than FOIT because `display=swap` is used.

## 11. Animation Audit

Confirmed animation systems:

- Framer Motion page transitions in `App`
- Scroll entrance animations in section components
- Hero pointer parallax in `RoleHero`
- Floating tool loops in `FloatingToolNode`
- SVG `animateMotion` pulses in `DeveloperHeroEnvironment`
- Animated blobs in `GradientBlob`
- Animated landing split hover/focus states
- Project carousel autoplay on fine pointer only
- Certificate drag carousel
- Lenis smooth scroll on fine pointer and no reduced-motion

Reduced motion support exists:

- Global CSS `@media (prefers-reduced-motion: reduce)`
- Framer Motion `useReducedMotion` in many components
- Lenis disabled for reduced motion and coarse pointer
- SVG pulses gated by `!reduceMotion`

Risks:

- Many animations repeat infinitely in hero/background components.
- Blur and drop-shadow filters can be expensive.
- `SectionHeader` does not use `useReducedMotion`; global CSS reduces CSS animation but Framer Motion animations still depend on component-level handling. Framer Motion's own reduced-motion behavior should be tested.

## 12. SEO Audit

Confirmed SEO:

- `index.html` has title and description.
- `App.tsx` updates `document.title` and the meta description per route after hydration.
- Route descriptions include both software engineer and graphic designer terms.
- `html lang="en"` is present.
- Favicon exists as inline SVG data URL.

Missing or weak SEO:

- No server-rendered per-route metadata. Crawlers that do not execute JS see only the base `index.html`.
- No canonical URL.
- No OpenGraph metadata.
- No Twitter card metadata.
- No `robots.txt`.
- No `sitemap.xml`.
- No JSON-LD structured data.
- Landing/developer/designer accessible H1 hierarchy is weak because large hero H1 text is decorative/aria-hidden.
- Developer projects are rich in data but `ProjectCard` renders only problem/solution/stack. It does not render `architecture`, `result`, or links, reducing crawlable project substance.
- Designer project content is empty.

Search engines can understand the dual identity from the base title/description and route meta after JS, but production SEO would be much stronger with static metadata and structured data.

## 13. Social Sharing Audit

Sharing to LinkedIn, Facebook, WhatsApp, X/Twitter, and Discord will likely use only the generic title/description and may have no rich preview image because:

- No `og:title`
- No `og:description`
- No `og:image`
- No `og:url`
- No `twitter:card`
- No `twitter:title`
- No `twitter:description`
- No `twitter:image`

Recommended future preview image: an optimized branded portfolio image that represents both Developer and Designer identities, not the raw 2.6 MB portrait PNG.

## 14. Accessibility Audit

Positive findings:

- Forms use labels, `aria-invalid`, `aria-describedby`, status/alert regions, and focus after submit result.
- Navigation has `aria-label`.
- Mobile nav button has `aria-expanded`.
- Design filters use `aria-pressed`.
- Lightbox uses `role="dialog"` and `aria-modal`.
- Decorative icons/images often use `aria-hidden` or empty alt text.
- Focus-visible styles are present on many interactive elements.

Accessibility issues:

| Severity | Finding | File |
|---|---|---|
| HIGH | Non-contact routes lack a clear accessible H1. Hero H1 text is decorative/hidden from assistive tech. | `HeroName.tsx`, `IdentitySelector.tsx` |
| MEDIUM | Lightbox focuses the close button but does not trap focus within the dialog. | `DesignLightbox.tsx` |
| MEDIUM | Contact honeypot input is visually hidden and `aria-hidden`, but still has `onChange`; acceptable, but test screen reader behavior. | `ContactPage.tsx` |
| MEDIUM | Some text uses low opacity such as `text-platinum/34`, `text-platinum/38`, or tiny mono labels. Contrast should be measured. | multiple components |
| LOW | External icon-only affordances generally have labels, but future design gallery content must preserve alt quality. | design components |

## 15. Contact Form Analysis

Client:

- File: `src/pages/ContactPage.tsx`
- Fields: source hidden input, discipline buttons, inquiry type select, name, email, phone/WhatsApp, subject, message, honeypot website
- Validation: required name/email/inquiry/subject/message; email pattern; message minimum 20 characters; inquiry must match discipline
- States: idle, submitting, success, error
- Error display: inline field errors and status region
- Submission: `sendContactMessage(payload)` POSTs JSON to `/api/contact`

API:

- File: `api/contact.ts`
- Method: POST and OPTIONS supported
- Validation mirrors client-side rules and trims/length-limits fields
- Spam protection: honeypot only
- Email provider: Resend
- Environment variables:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
- Missing production safeguards: no rate limiting, captcha/turnstile, IP throttling, or explicit origin policy.

No contact messages were submitted during this audit.

## 16. External Links Audit

Important outbound links:

- GitHub profile: `https://github.com/NipunBasnayake`
- LinkedIn profile: `https://www.linkedin.com/in/nipunbasnayake/`
- WhatsApp: `https://wa.me/94778806029`
- Email: `mailto:nipunsathsara1999@gmail.com`
- GitHub project links for Java Spring Boot microservices and HR management system
- Certificate reference links across Credly, LinkedIn Learning, KodeKloud, Udemy, SLIIT, etc.

Findings:

- External links generally use `target="_blank"` and `rel="noreferrer"`. Modern browsers usually treat `noreferrer` as `noopener`, but explicit `noopener noreferrer` would be clearer.
- `src/data/portfolio.ts:760` has a `referenceUrl` beginning with `linkedin.com/safety/go/...` without `https://`, so it will behave like a relative URL.
- Several `referenceUrl` values are empty strings, intentionally hiding reference buttons.

## 17. Security Audit

Secret scan:

- No secret values were printed or found in source by search for `process.env`, `import.meta.env`, localhost, console/debugger, and common secret patterns.
- Environment variable names are present only in `api/contact.ts`.

Frontend security:

- No `dangerouslySetInnerHTML` found.
- User form data is sent as JSON and rendered only as React text, not raw HTML.
- API validates and truncates fields before forwarding to Resend.
- API key is server-side only via `process.env.RESEND_API_KEY`.

Dependency security:

`npm audit --json` reported 7 vulnerabilities: 4 high, 3 low, 0 critical. High items include direct `vite` and `postcss` advisories and transitive `browserslist`/`nanoid`. These are mostly build/dev-toolchain risks for this static portfolio, but should be addressed before production.

No CRITICAL security exposure was confirmed.

## 18. Environment Variables Audit

| Variable | Used In | Side | Required | Purpose |
|---|---|---|---|---|
| `RESEND_API_KEY` | `api/contact.ts:146` | Server/API | Required for contact email | Authenticates Resend API request |
| `CONTACT_TO_EMAIL` | `api/contact.ts:147` | Server/API | Required for contact email | Destination inbox |
| `CONTACT_FROM_EMAIL` | `api/contact.ts:148` | Server/API | Required for contact email | Verified sender for Resend |

Findings:

- No `.env` or `.env.example` files found.
- No `VITE_` client environment variables found.
- If these variables are not configured in production, `/api/contact` returns 503 with a direct-contact fallback message.

## 19. Build Configuration Audit

Build configuration is minimal:

- `vite.config.ts` only installs the React plugin.
- No custom base path, output directory, chunking, source maps, minification, or deployment target settings.
- Vite defaults imply production output in `dist/`, hashed assets, and minification.
- TypeScript uses `strict: true`, `moduleResolution: "Bundler"`, `target: "ES2022"` for app, `target: "ES2023"` for config.

Validation/build command was not run to preserve the "only create report" constraint.

## 20. TypeScript Audit

Positive:

- `strict: true` enabled in both app and node tsconfigs.
- `allowJs: false`
- `isolatedModules: true`
- `noEmit: true`
- No `any`, `@ts-ignore`, or `@ts-expect-error` found in source search.

Gaps:

- `noUnusedLocals` and `noUnusedParameters` are not explicitly enabled.
- `src/main.tsx` uses non-null assertion on `document.getElementById("root")!`.
- Custom API request/response interfaces are minimal and not tied to Vercel/Node types, which keeps dependencies small but may miss runtime typing details.

## 21. ESLint / Code Quality Audit

No ESLint config found. No Prettier config found. No lint script in `package.json`.

Search results:

- No `console.log`, `console.warn`, `console.error`, or `debugger` found in application source.
- No TODO/FIXME/HACK found by source search.
- Some local modules and exports appear unused, listed earlier as POSSIBLY UNUSED.

## 22. Dead Code And Unused File Audit

Likely unused or legacy candidates:

| Item | Status | Evidence |
|---|---|---|
| `gsap` dependency | POSSIBLY UNUSED | Declared in package files; no import in `src/` |
| `Button.tsx` | POSSIBLY UNUSED | Export found, no import found |
| `CapabilityCard.tsx` | POSSIBLY UNUSED | Export found, no import found |
| `TimelineCard.tsx` | POSSIBLY UNUSED | Export found, no import found |
| `StatPill.tsx` | POSSIBLY UNUSED | Export found, no import found |
| `FloatingParticles.tsx` | POSSIBLY UNUSED | Export found, no import found |
| `FloatingToolsLayer.tsx` | POSSIBLY UNUSED | Export found, active hero uses `FloatingToolNode` |
| `useRotatingText.ts` | POSSIBLY UNUSED | Export found, no import found |
| `navItems`, `footerLinks` | POSSIBLY UNUSED | Route-specific navbar/footer define local link sets |
| `designerHero` | POSSIBLY UNUSED | Exported but not imported |
| `docker-foundations.png` | POSSIBLY UNUSED/DUPLICATE | Byte-identical to `.jpg`; data references `.jpg` |

## 23. Dependency Audit

Production dependencies from `package.json`:

- `@vitejs/plugin-react`
- `clsx`
- `framer-motion`
- `gsap`
- `lenis`
- `lucide-react`
- `react`
- `react-dom`
- `tailwind-merge`

Development dependencies:

- `@types/node`
- `@types/react`
- `@types/react-dom`
- `autoprefixer`
- `postcss`
- `tailwindcss`
- `typescript`
- `vite`

Notes:

- `@vitejs/plugin-react` belongs in devDependencies for normal Vite projects, but it is currently listed in dependencies.
- `gsap` appears unused.
- `lucide-react` has a large installed disk footprint, though tree-shaking should keep bundle impact lower.
- `npm outdated --json` reported newer wanted/latest versions for several packages, including React, Vite, PostCSS, Framer Motion, Lenis, Tailwind Merge, Tailwind, and Lucide. Do not upgrade without regression testing because this app is animation-heavy and uses React 19.

## 24. Browser Compatibility

Likely OK:

- Chrome, Edge, Firefox, Android Chrome for core React/Tailwind/Framer features.

Needs careful testing:

- Safari and iOS Safari with `100vh`, fixed navbar, `backdrop-filter`/`backdrop-blur`, `maskImage`, SVG animation, and heavy blur/drop-shadow.
- Mobile browsers with dynamic address bars because hero uses `min-h-screen` and `calc(100vh - 5rem)`.
- Reduced motion behavior across Safari/Firefox.

## 25. Navigation UX Analysis

Desktop:

- Fixed top navbar with route-specific link sets.
- Developer/designer pages include a segmented Dev/Design switch.
- Developer links navigate to anchors on `/developer`.
- Designer links navigate to designer anchors.
- Contact page links back to Home, Developer, Designer.

Mobile:

- Menu button toggles a route-aware mobile panel.
- Role switch appears at top of mobile role menu.
- Links are large enough and focusable.

Potential confusion:

- Unknown paths silently render home route without a visible 404.
- On static hosts without SPA rewrites, direct `/developer`, `/designer`, and `/contact` requests may 404 before React loads.

## 26. User Journey Analysis

### Recruiter Looking For Software Engineer

Can quickly find:

- Role: yes
- Tech stack: yes
- Experience: yes
- Software projects: yes
- GitHub: yes, but only two project source links
- LinkedIn: yes
- CV/resume: no CV/resume link found
- Contact: yes

Friction: project cards do not render result/architecture/link fields already present in data, and no downloadable CV is visible.

### Client Looking For Graphic Designer

Can quickly find:

- Design identity: yes
- Design skills/categories: yes
- Freelance since 2019: yes
- Social/print/brand categories: yes
- Contact: yes

Friction: no real design work is present. This is the biggest designer journey gap.

### Lecturer / Training Center Recruiter

Can understand:

- Software knowledge: yes
- Graphic design experience: yes
- Multimedia/design tools: visible in hero tool icons
- Teaching-relevant credentials: certificates and education support this

Friction: teaching/training positioning is not explicit, and no CV/resume link was found.

## 27. Content Quality Audit

Confirmed content strengths:

- Developer language is specific and professional.
- Tech naming is mostly consistent: React, TypeScript, JavaScript, Spring Boot, PostgreSQL, Docker, Kafka.
- Designer categories are broad and practical.

Content issues to verify:

- `Basnayaka` vs GitHub account `NipunBasnayake` may be intentional but should be verified.
- `portfolio.ts` has empty `contactData.section.intro` and `closingLine`.
- Several certificate `referenceUrl` values are empty.
- `Introduction to Cybersecurity` reference URL lacks a scheme.
- `blockchain-basics.jpg.jpg` double extension.
- Designer page says real artwork has not been added yet. That is honest, but production readiness for design clients is low until populated.

No Lorem Ipsum or placeholder filler was found by search.

## 28. Project Portfolio Presentation Audit

Developer projects in `src/data/portfolio.ts`:

| Project | Type | Stack | Links Rendered? | Presentation Gap |
|---|---|---|---|---|
| WorkNest - Multi-Tenant Workforce Platform | SaaS platform | React, TypeScript, Spring Boot, PostgreSQL, JWT, OAuth2, Docker | Data link to contact, not rendered by `ProjectCard` | Architecture/result in data not rendered |
| Residue ERP System | ERP platform | Spring Boot, React, PostgreSQL, Docker, JWT, Swagger | Data link to contact, not rendered | Architecture/result not rendered |
| Task Management System | Full-stack application | Next.js, NestJS, MongoDB, JWT, Docker, Vercel | Data link to contact, not rendered | No live/GitHub link visible |
| Event-Driven Microservices System | Distributed systems architecture | Spring Boot, Kafka, Docker, Microservices, PostgreSQL | GitHub link in data, not rendered | Source not visible in current card |
| Automotive ERP System | Business operations platform | NestJS, React, MongoDB, AWS, Firebase, REST APIs | Data link to contact, not rendered | No image/result visible |
| EvoPlan Enterprise Web Application | Enterprise planning system | Angular, Spring Boot, OAuth2, Supabase, REST APIs | Data link to contact, not rendered | Team/outcome could be stronger if rendered |
| HR Management System | Internal business system | Spring Boot, Angular, MySQL, JWT, RBAC | GitHub link in data, not rendered | Source not visible in current card |

Designer projects:

- Confirmed count: 0 real design items.
- Categories: 14.
- Gallery implementation is ready for mixed aspect ratios, thumbnails, filters, and lightbox.

## 29. Production Deployment Audit

Confirmed:

- Vite build output is `dist/`.
- Existing `dist/index.html` references hashed JS/CSS.
- There is a serverless function under `api/contact.ts`, likely intended for Vercel-style deployment.

Missing:

- No `vercel.json` with SPA rewrites or function configuration.
- No Netlify config.
- No Cloudflare Pages config.
- No Docker/nginx config.
- No GitHub Actions.
- No documented environment variables.

Production routing requirement:

- Because this is a SPA with browser-history routes, the host must rewrite `/developer`, `/designer`, `/contact`, and unknown app paths to `index.html`.
- `/api/contact` must remain routed to the serverless function.

## 30. Cache Strategy Audit

Recommended future cache behavior:

| Asset | Suggested Strategy |
|---|---|
| `index.html` | Short/no cache; must update when deployments change |
| Hashed JS/CSS in `dist/assets` | Long immutable cache |
| Fonts from Google | Controlled by Google; local hosting could improve predictability |
| Profile image | Long cache after optimization and filename hashing/versioning |
| Certificate images | Long cache after optimization |
| Hero tool icons | Long cache |
| Favicon data URL | Embedded in HTML |
| `robots.txt`, `sitemap.xml` | Short to medium cache |

No cache config is present in the repo.

## 31. Error Handling

Present:

- Contact client handles non-JSON responses and API errors.
- Contact API validates inputs and returns user-safe error messages.
- Certificate image cards fallback if image load fails.
- Floating tool icons fallback to text label if image load fails.
- Contact status uses alert/status region and focus.

Missing:

- No React error boundary.
- No route-level 404.
- No lazy-loading error fallback because no dynamic imports exist.
- Design gallery images do not have explicit error fallback.
- Contact API has no catch around the Resend `fetch`; network exceptions may surface as unhandled serverless errors depending host runtime.

## 32. Console / Development Artifact Audit

Search found:

- No `console.log`
- No `console.warn`
- No `console.error`
- No `debugger`
- No TODO/FIXME/HACK

Development artifacts:

- `dist/` exists locally and is ignored by `.gitignore`.
- `.gitignore` includes `dev-check.png` and `.chrome-verify-profile*`.

## 33. Production Risk Classification

| ID | Severity | Area | File | Finding | Production Risk | Recommended Action |
|---|---|---|---|---|---|---|
| R-001 | HIGH | Performance | `public/assets/images/photos/profile.png`, `index.html:19`, `HeroPortrait.tsx:89` | 2.6 MB PNG is preloaded/eager above the fold | Slow LCP, especially mobile | Create optimized WebP/AVIF variants after visual baseline |
| R-002 | HIGH | Deployment | repo root | No SPA rewrite deployment config | Direct `/developer`, `/designer`, `/contact` may 404 on static hosts | Add host-specific rewrites before production |
| R-003 | HIGH | Contact | `api/contact.ts`, `contactService.ts` | Contact depends on serverless `/api/contact` and Resend env vars with no deployment docs | Form fails on static-only hosting or missing env | Document env and deploy on a compatible host |
| R-004 | HIGH | SEO/Social | `index.html`, `App.tsx` | Missing OG/Twitter/canonical/robots/sitemap/JSON-LD; route metadata client-side only | Weak search/social previews | Add metadata without changing visual UI |
| R-005 | HIGH | Accessibility/SEO | `HeroName.tsx`, `IdentitySelector.tsx` | Non-contact routes lack clear accessible H1 | Screen readers and SEO hierarchy weakened | Add visually hidden semantic H1 or adjust headings carefully |
| R-006 | HIGH | Content | `src/data/designPortfolio.ts:68` | Designer gallery has zero real design items | Designer portfolio may look unfinished | Populate with optimized real work |
| R-007 | HIGH | Dependency Security | `package-lock.json` | `npm audit` reports 4 high vulnerabilities, including direct Vite/PostCSS | Build/dev toolchain exposure | Upgrade with regression testing |
| R-008 | MEDIUM | Media | `src/data/portfolio.ts:770` | Missing AWS certificate image | Fallback appears instead of intended image | Add image or remove reference |
| R-009 | MEDIUM | Media | public certificate files | Three `.jpg` files are actually WebP | MIME/hosting/tooling confusion | Rename or regenerate with correct extension |
| R-010 | MEDIUM | Config | repo root | No `.env.example` | Production contact setup easy to miss | Add example names only, no secrets |
| R-011 | MEDIUM | Quality | repo root | No lint/test scripts or configs | Regressions harder to catch | Add minimal lint/test setup later |
| R-012 | MEDIUM | Performance | `App.tsx` | No route/component code splitting | Landing downloads all page code | Add lazy routes after baseline |
| R-013 | MEDIUM | Routing | `useRouteNavigation.ts` | Unknown routes normalize to home; no 404 | Bad URLs are confusing | Add 404 handling or redirect strategy |
| R-014 | MEDIUM | Contact/Security | `api/contact.ts` | No rate limit/captcha/origin throttling | Spam or quota abuse | Add low-friction anti-spam controls |
| R-015 | MEDIUM | Links | `src/data/portfolio.ts:760` | Certificate URL lacks `https://` | Broken relative navigation | Fix URL |
| R-016 | MEDIUM | Accessibility | `DesignLightbox.tsx` | Dialog lacks focus trap | Keyboard users can tab behind modal | Add focus trap when gallery has items |
| R-017 | MEDIUM | Hero Layering | `RoleHero.tsx:139` | `z-15` is not a default Tailwind class | Intended layer order may not apply | Use `z-[15]` after visual test |
| R-018 | LOW | Dependencies | `package.json` | `gsap` appears unused | Extra install/maintenance weight | Confirm and remove later if unused |
| R-019 | LOW | Code Organization | multiple | Several possibly unused components/exports | Noise for future editors | Confirm before deleting |
| R-020 | LOW | Links Security | multiple anchors | Uses `rel="noreferrer"` but not explicit `noopener` | Minor clarity/security hardening | Use `noopener noreferrer` |
| R-021 | LOW | Content | `portfolio.ts` | Some empty reference URLs and empty contact copy fields | Incomplete content signals | Verify intentional blanks |
| R-022 | INFO | Visual Sensitivity | hero files | Hero relies on precise layering, clamps, gradients, transforms | Future edits can damage design | Capture screenshots before changing |

Counts: CRITICAL 0, HIGH 7, MEDIUM 10, LOW 4, INFO 1.

## 34. Safe Production Optimization Opportunities

### Very Safe

- Add `.env.example` with variable names only.
- Add `robots.txt`, `sitemap.xml`, canonical, OG, and Twitter metadata.
- Fix the scheme on the `linkedin.com/safety/...` certificate URL.
- Add a semantic accessible H1 without changing visible design.
- Add `noopener noreferrer` to external links.
- Remove or document empty contact copy fields.

### Safe With Testing

- Optimize the portrait image into WebP/AVIF and update preload/source strategy.
- Convert/rename mislabelled WebP certificate files.
- Add route-level code splitting with `React.lazy`.
- Add minimal tests for navigation and contact validation.
- Upgrade Vite/PostCSS and related vulnerable packages.
- Confirm and remove unused GSAP/components.

### Higher Risk / Requires Careful Regression Testing

- Reworking hero layout, z-indexes, clamps, viewport units, or transforms.
- Major animation changes.
- Changing route architecture from custom history to a router.
- Refactoring `portfolio.ts` into many content modules.
- Changing global CSS/background/typography behavior.

## 35. Visually Sensitive Areas

Do not casually change:

- `src/components/identity/IdentitySelector.tsx`
- `src/components/hero/RoleHero.tsx`
- `src/components/hero/HeroName.tsx`
- `src/components/hero/HeroPortrait.tsx`
- `src/components/hero/DeveloperHeroEnvironment.tsx`
- `src/components/hero/DesignerHeroEnvironment.tsx`
- `src/components/hero/FloatingToolNode.tsx`
- `src/data/heroTools.ts`
- `tailwind.config.ts` color/font tokens
- `src/styles/globals.css`
- Section spacing classes such as `py-24 sm:py-32`
- Project/certificate carousel card dimensions and motion behavior

These files define the custom visual identity: split identity landing, huge layered typography, portrait composition, gradients, role-specific color language, and motion.

## 36. Testing Coverage Analysis

No testing framework or tests found:

- No Vitest
- No Jest
- No React Testing Library
- No Playwright
- No Cypress
- No test scripts

Production flows that would benefit from tests:

- Route navigation and deep links
- Developer/designer mode switching
- Contact validation
- Contact API validation
- Project carousel index behavior
- Certificate carousel drag/dot/button behavior
- Design gallery filtering/lightbox once items exist
- Reduced-motion behavior

## 37. Recommended Production Test Checklist

Desktop:

- Chrome: landing, developer hero, designer hero, contact form, carousels
- Firefox: SVG animations, gradients, focus states, contact form
- Edge: navigation, Lenis scrolling, social/contact links
- Safari if available: `100vh`, backdrop blur, mask image, fixed nav

Mobile:

- iPhone Safari at 320/375/390/430 widths
- Android Chrome at 360/412 widths
- Tablet portrait and landscape

Manual checks:

- Landing split animation and keyboard focus
- Developer/designer switching
- Fixed navbar and mobile menu
- Hero portrait/name/tool overlap
- Project carousel buttons/dots/autoplay
- Certificate carousel drag/buttons/dots/images
- Designer gallery empty state, then filters/lightbox after assets are added
- Contact form validation, loading, success, error, and direct links
- GitHub, LinkedIn, WhatsApp, email links
- Certificate reference links
- Reduced-motion OS setting
- No horizontal scroll at all target widths

## 38. Production Readiness Scores

| Area | Score |
|---|---:|
| Architecture | 78 |
| Code Quality | 74 |
| Performance | 61 |
| Responsive Design | 72 |
| Accessibility | 62 |
| SEO | 48 |
| Security | 69 |
| Content | 66 |
| Maintainability | 72 |
| Deployment Readiness | 55 |

OVERALL PRODUCTION READINESS SCORE: 66/100

Why: the app is visually strong and coherently structured, especially for the developer side. It is not yet fully production-ready because deployment routing, contact environment documentation, image optimization, metadata/social sharing, accessibility semantics, dependency advisories, and real designer project content need attention.

## 39. Priority Roadmap

### Phase 0 - Backup And Baseline

- Save current visual screenshots at mobile/tablet/desktop widths.
- Record current `dist/` bundle/image baseline.
- Confirm intended production host.
- Confirm official name spelling and GitHub account naming.

### Phase 1 - Production Blockers

- Add SPA rewrites for chosen host.
- Configure `/api/contact` serverless runtime and Resend env vars.
- Add `.env.example`.
- Fix missing/broken certificate asset and URL issues.

### Phase 2 - Performance And Stability

- Optimize profile PNG.
- Add route-based lazy loading.
- Resolve npm audit high advisories.
- Confirm/remove unused GSAP and unused modules.

### Phase 3 - SEO And Accessibility

- Add canonical, OG/Twitter, robots, sitemap, JSON-LD.
- Add accessible H1 strategy for landing/developer/designer.
- Improve dialog focus trapping.
- Check color contrast.

### Phase 4 - Content / Portfolio Improvements

- Populate real design items with optimized thumbnails/full images.
- Expose project architecture/result/links in project UI if desired.
- Add CV/resume link if production goal includes recruiting.
- Verify all certificate references.

### Phase 5 - Optional Refactoring

- Split `ContactPage` into form, methods, validation helpers.
- Split large portfolio data into domain files.
- Remove confirmed unused components.
- Consider formal router only if route complexity grows.

## 40. Important Files For Future Editing

| Area | File(s) | Purpose | Risk Level |
|---|---|---|---|
| App shell/routing | `src/App.tsx`, `src/hooks/useRouteNavigation.ts` | Route selection, metadata, page transitions | HIGH |
| Hero | `src/components/hero/*`, `src/data/heroTools.ts` | Visual identity, portrait, role environments, floating tools | HIGH |
| Landing identity switch | `src/components/identity/IdentitySelector.tsx` | First-visit developer/designer split | HIGH |
| Navigation | `src/components/layout/Navbar.tsx`, `Footer.tsx` | Route-aware navigation | MEDIUM |
| Developer content | `src/data/portfolio.ts` | Skills, experience, projects, certificates, education, contact | HIGH |
| Developer sections | `src/components/sections/*` | Visible developer page | MEDIUM-HIGH |
| Designer content | `src/data/designPortfolio.ts` | Categories and future design items | HIGH |
| Designer page | `src/pages/DesignerPage.tsx`, `src/components/design/*` | Designer presentation, gallery, lightbox | MEDIUM-HIGH |
| Contact | `src/pages/ContactPage.tsx`, `src/services/contactService.ts`, `api/contact.ts`, `src/data/contactContexts.ts` | Form UX and email delivery | HIGH |
| Global styling | `src/styles/globals.css`, `tailwind.config.ts` | Colors, fonts, body behavior, reduced motion | HIGH |
| SEO shell | `index.html`, `src/App.tsx` | Title/metadata/fonts/preloads | MEDIUM-HIGH |
| Deployment | `package.json`, `vite.config.ts`, future host config | Build/runtime hosting behavior | HIGH |

## 41. Final Executive Summary

### What Is Already Good

- Strong custom visual identity.
- Clear developer/designer split on the landing page.
- Rich developer content and seven engineering case studies.
- Good contact form UX and validation.
- Reduced-motion support is present in many key places.
- No obvious source-code secrets or debug logging found.

### What Could Break In Production

- Direct route loads may fail without SPA rewrites.
- Contact form will fail if deployed to a static-only host or without Resend env vars.
- Missing AWS certificate image will show fallback.
- One certificate reference URL lacks `https://`.
- Dependency advisories should be resolved before launch.

### Biggest Performance Concerns

- 2.6 MB preloaded/eager profile PNG.
- Single JS chunk containing all routes.
- Heavy animated hero layers with filters, blurs, shadows, and SVG motion.
- Many certificate images in a carousel.

### Biggest Mobile Concerns

- Hero composition uses `100vh`, absolute positioning, clamps, and transforms.
- Hidden overflow can mask layout issues.
- Text/button fit should be manually checked at 320px.

### Biggest SEO Concerns

- Missing OG/Twitter/canonical/robots/sitemap/JSON-LD.
- Per-route title/description are client-side only.
- Non-contact routes lack a clear accessible H1.
- Designer portfolio has no real project content.

### Biggest Accessibility Concerns

- No semantic accessible H1 on landing/developer/designer routes.
- Design lightbox lacks focus trap.
- Some low-opacity text may fail contrast.

### Biggest Security Concerns

- `npm audit` reports high advisories in build/dev dependencies.
- Contact endpoint has honeypot validation but no rate limiting/captcha.
- No exposed source secrets were confirmed.

### Safe Improvements

- Add metadata files/tags.
- Add `.env.example`.
- Fix broken URL and missing image reference.
- Add accessible H1 without visual changes.
- Optimize static images with regression screenshots.

### Changes That Should NOT Be Made Casually

- Hero layout, portrait sizing, z-indexes, gradients, and role-specific environments.
- Global color/font tokens.
- Page transition direction logic.
- Developer/designer identity language.
- Carousel/card dimensions and motion behavior.

### Recommended First Production Optimization Step

Create a production baseline first: capture screenshots at the requested viewport widths, confirm the intended host, and add the minimal deployment/env documentation needed for SPA routing plus `/api/contact`. After that, optimize the 2.6 MB portrait image because it is the most concrete LCP risk.
