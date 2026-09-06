# Portfolio Lightbox Fit Fix Report

## Actual Root Cause

The fullscreen portal and fixed overlay were already correct, but the media itself still used `h-auto w-auto max-h-full max-w-full` as a standalone replaced element inside the media viewport.

That is usually close, but it still lets intrinsic image/video sizing participate in layout in a fragile way. For wide or square artwork, the browser can resolve the media from its large intrinsic width and produce a rendered height that exceeds the remaining viewport after the title/header, modal padding, frame padding, and borders are accounted for.

The real problem was not hero stacking anymore. The problem was that the media element was not forced into a fully constrained width-and-height box before `object-contain` was applied.

## Old Layout Structure

```tsx
fixed portal overlay
  flex column wrapper
    header
    relative media frame
      absolute inset media wrapper
        img/video: h-auto w-auto max-h-full max-w-full object-contain
```

The media frame was constrained, but the image/video element still relied on auto dimensions plus max constraints.

## New Layout Structure

```tsx
fixed portal overlay: h-screen h-[100dvh] overflow-hidden
  flex column wrapper: h-full max-h-full min-h-0 overflow-hidden
    header: flex-none
    media frame: flex-1 min-h-0 overflow-hidden
      absolute inset media wrapper: min-h-0 min-w-0 overflow-hidden
        img/video: h-full w-full object-contain
```

The image/video now fills a known bounded media box, and `object-contain` performs the fitting using both available width and available height.

## Image Sizing Before

```tsx
className="block h-auto max-h-full w-auto max-w-full object-contain"
```

This did not force the image element itself to obey a concrete media box in both dimensions.

## Image Sizing After

```tsx
className="block h-full w-full object-contain"
```

This is intentionally used only inside an absolutely positioned, overflow-hidden media wrapper whose parent is a real remaining-height viewport area.

## Video Sizing Before

```tsx
className="block h-auto max-h-full w-auto max-w-full object-contain"
```

The native player could inherit the same oversize behavior as images.

## Video Sizing After

```tsx
className="block h-full w-full object-contain"
```

Native browser controls remain enabled with `controls`, `playsInline`, and `preload="metadata"`.

## Files Modified

- `src/components/design/DesignLightbox.tsx`

## Files Created

- `PORTFOLIO_LIGHTBOX_FIT_FIX_REPORT.md`

## Build Result

`npm run build` passed.

Vite emitted a non-blocking warning that one generated chunk is larger than 500 kB after minification.

## Browser Tests Actually Performed

No browser viewport tests were performed. Local checks found no installed Playwright package and no browser automation command available in PATH.

Verification performed:

- Inspected `src/components/design/DesignLightbox.tsx`.
- Confirmed the viewer still uses `createPortal(..., document.body)`.
- Confirmed the modal root uses fixed viewport height and `overflow-hidden`.
- Confirmed the media frame uses `flex-1 min-h-0 overflow-hidden`.
- Confirmed fullscreen image/video elements now use `h-full w-full object-contain`.
- Ran `npm run build` successfully.

## Confirmation

No hero, landing, developer page, designer hero, navbar, gallery card, gallery filter, color, animation, or global layout files were modified for this fix.
