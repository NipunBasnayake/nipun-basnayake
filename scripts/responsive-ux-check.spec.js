import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "http://127.0.0.1:5173";
const routes = ["/", "/developer", "/designer", "/contact"];
const viewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

const screenshotTargets = [
  { route: "/", name: "landing" },
  { route: "/developer", name: "developer" },
  { route: "/designer", name: "designer" },
  { route: "/contact", name: "contact" },
];

function routeUrl(route) {
  return `${baseUrl}${route}`;
}

async function pageMetrics(page) {
  return page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
}

async function visibleGalleryCards(page) {
  return page.locator('#design-work button[aria-label^="Open"], #design-work button[aria-label^="Play"]').count();
}

test("responsive route sweep and key interactions", async ({ page }) => {
  const screenshotsDir = path.resolve("artifacts", "responsive-ux");
  await fs.mkdir(screenshotsDir, { recursive: true });

  const viewportChecks = [];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      await page.goto(routeUrl(route), { waitUntil: "networkidle" });
      const metrics = await pageMetrics(page);
      viewportChecks.push({ route, viewport: `${viewport.width}x${viewport.height}`, ...metrics });

      expect(metrics.scrollWidth, `${route} ${viewport.width}x${viewport.height} html overflow`).toBeLessThanOrEqual(metrics.clientWidth + 1);
      expect(metrics.bodyScrollWidth, `${route} ${viewport.width}x${viewport.height} body overflow`).toBeLessThanOrEqual(metrics.bodyClientWidth + 1);
    }
  }

  const screenshotPaths = [];
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);

    for (const target of screenshotTargets) {
      await page.goto(routeUrl(target.route), { waitUntil: "networkidle" });
      const filePath = path.join(
        screenshotsDir,
        `${target.name}-${viewport.width}x${viewport.height}.png`,
      );
      await page.screenshot({ path: filePath, fullPage: false });
      screenshotPaths.push(filePath);
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(routeUrl("/developer"), { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#mobile-primary-navigation")).toBeVisible();
  await page.getByRole("link", { name: "Design" }).click();
  await page.waitForURL("**/designer");
  expect(page.url()).toContain("/designer");

  await page.goto(routeUrl("/designer"), { waitUntil: "networkidle" });
  expect(await visibleGalleryCards(page)).toBe(24);

  await page.getByRole("button", { name: "Social Media" }).click();
  expect(await visibleGalleryCards(page)).toBe(24);

  await page.getByRole("button", { name: /Load More Work/ }).click();
  expect(await visibleGalleryCards(page)).toBe(48);

  await page.locator('#design-work button[aria-label^="Open"]').first().click();
  await page.waitForSelector('[role="dialog"]');
  const imageFits = await page.evaluate(() => {
    const media = document.querySelector('[role="dialog"] img');
    const frame = media?.parentElement;
    if (!media || !frame) return false;
    const mediaBox = media.getBoundingClientRect();
    const frameBox = frame.getBoundingClientRect();
    return mediaBox.width <= frameBox.width + 1 && mediaBox.height <= frameBox.height + 1;
  });
  expect(imageFits).toBe(true);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Escape");
  await page.waitForSelector('[role="dialog"]', { state: "detached" });

  await page.getByRole("button", { name: "Motion Graphics" }).click();
  await page.locator('#design-work button[aria-label^="Play"]').first().click();
  await page.waitForSelector('[role="dialog"] video');
  const videoFits = await page.evaluate(() => {
    const media = document.querySelector('[role="dialog"] video');
    const frame = media?.parentElement;
    if (!media || !frame) return false;
    const mediaBox = media.getBoundingClientRect();
    const frameBox = frame.getBoundingClientRect();
    return mediaBox.width <= frameBox.width + 1 && mediaBox.height <= frameBox.height + 1;
  });
  expect(videoFits).toBe(true);
  await page.keyboard.press("Escape");
  await page.waitForSelector('[role="dialog"]', { state: "detached" });

  await page.goto(routeUrl("/contact"), { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Send/i }).click();
  await expect(page.getByText("Please fix the highlighted fields.")).toBeVisible();

  console.log(
    JSON.stringify(
      {
        viewportChecks,
        screenshots: screenshotPaths,
        interactions: [
          "mobile nav opens/closes through navigation",
          "developer to designer switch",
          "gallery initial batch: 24",
          "Social Media filter reset: 24",
          "Load More after one click: 48",
          "image lightbox opens/fits/next/Escape",
          "video lightbox opens/fits/Escape",
          "contact validation without sending",
        ],
      },
      null,
      2,
    ),
  );
});
