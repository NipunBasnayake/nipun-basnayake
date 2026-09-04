# Designer Gallery Assets

## Step 1

Copy artwork into `public/assets/gallery/...`.

## Step 2

Add one record to `src/data/designGallery.json`.

## Step 3

Use one of these supported category IDs:

`logo-design`, `branding`, `posters`, `flyers`, `social-media`, `wedding-cards`, `invitations`, `business-cards`, `certificates`, `brochures`, `banners`, `event-designs`, `print-designs`, `other`.

## Step 4

Enter the correct image `width` and `height` so the masonry layout can reserve the right space.

## Step 5

Run:

```bash
npm run build
```

Example JSON record:

```json
{
  "id": "fictional-brand-poster-01",
  "title": "Fictional Brand Poster",
  "categoryId": "posters",
  "image": "/assets/gallery/posters/fictional-brand-poster-01.webp",
  "alt": "Fictional poster artwork with bold type and layered color shapes.",
  "width": 1080,
  "height": 1350,
  "sortOrder": 10,
  "description": "Optional short project description.",
  "tools": ["Adobe Photoshop", "Adobe Illustrator"],
  "year": "2026",
  "featured": false
}
```

`thumbnail` is optional. If it is omitted, the gallery uses `image` as the thumbnail.
