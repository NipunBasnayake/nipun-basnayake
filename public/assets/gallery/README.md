# Designer Gallery Assets

This directory stores production gallery media for the designer portfolio.

## Supported Images

Use browser-renderable image files:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`
- `.gif`

Image gallery records should use:

```json
{
  "id": "flore-logo-01",
  "title": "Flore Logo Design",
  "categoryId": "logo-design",
  "mediaType": "image",
  "image": "/assets/gallery/logo-design/flore-logo-01.webp",
  "alt": "Logo design presentation for Flore Logo Design.",
  "width": 1600,
  "height": 1200,
  "sortOrder": 100
}
```

Existing image records can omit `mediaType`; the adapter treats them as images.

## Supported Videos

Use browser-compatible motion files:

- `.mp4`
- `.webm`

Video gallery records should use:

```json
{
  "id": "promo-motion-01",
  "title": "Promotional Motion Design",
  "categoryId": "motion-graphics",
  "mediaType": "video",
  "image": "/assets/gallery/motion-graphics/promo-motion-01.mp4",
  "thumbnail": "/assets/gallery/thumbs/promo-motion-01.webp",
  "alt": "Motion graphic project preview for Promotional Motion Design.",
  "width": 1080,
  "height": 1080,
  "sortOrder": 500
}
```

For video records, `image` is the playable full media source. Videos do not autoplay in gallery cards; they play only in the fullscreen viewer with native browser controls.

## Thumbnail Posters

`thumbnail` is optional for images and defaults to `image`.

For videos, use an image poster when available:

```text
promo-motion-01.mp4
thumbs/promo-motion-01.webp
```

If a video has no thumbnail, the gallery card shows a lightweight play placeholder.

## Folder Vs Category

Folders are only for organizing files. Filtering is controlled by `categoryId` in `src/data/designGallery.json`.

For example, an image stored at `/assets/gallery/logo-design/project.webp` with `"categoryId": "branding"` appears under Branding, not Logo Design.

## Category IDs

- `logo-design`
- `branding`
- `posters`
- `flyers`
- `social-media`
- `motion-graphics`
- `wedding-cards`
- `invitations`
- `business-cards`
- `certificates`
- `brochures`
- `banners`
- `event-designs`
- `print-designs`
- `tshirt-designs`
- `menu-designs`
- `other`

## Naming Convention

Use lowercase, ASCII-safe, kebab-case filenames:

```text
flore-logo-01.webp
flore-logo-02.webp
flore-logo-03.webp
promo-motion-01.mp4
```

Avoid spaces, parentheses, brackets, duplicate extensions, random copy suffixes, and uppercase extensions. Preserve the real media extension; do not make a file compatible by renaming the extension.

## Similar Project Numbering

Keep related variations grouped with deterministic numbering:

```text
chess-poster-01.webp
chess-poster-02.webp
chess-poster-03.webp
```

Use `sortOrder` gaps in JSON so related work stays adjacent and future pieces can be inserted without renumbering everything.

## Adding New Artwork

1. Add the media file under `public/assets/gallery/`.
2. Add a record to `src/data/designGallery.json`.
3. Use actual `width` and `height` values from the file.
4. Run `npm run build`.
