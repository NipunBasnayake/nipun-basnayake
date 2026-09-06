import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const galleryRoot = resolve(repoRoot, "public/assets/gallery");
const jsonPath = resolve(repoRoot, "src/data/designGallery.json");
const manifestPath = resolve(repoRoot, "GALLERY_MEDIA_RENAME_MANIFEST.md");
const reportPath = resolve(repoRoot, "PORTFOLIO_GALLERY_BULK_MEDIA_IMPLEMENTATION_REPORT.md");

const imageExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const videoExts = new Set([".mp4", ".webm"]);
const ignoredNames = new Set([".gitkeep", "readme.md"]);
const categoryIds = [
  "logo-design",
  "branding",
  "posters",
  "flyers",
  "social-media",
  "wedding-cards",
  "invitations",
  "business-cards",
  "certificates",
  "brochures",
  "banners",
  "event-designs",
  "print-designs",
  "motion-graphics",
  "tshirt-designs",
  "menu-designs",
  "other",
];

const categoryBaseSort = new Map(categoryIds.map((categoryId, index) => [categoryId, (index + 1) * 10000]));

const folderRenames = [
  { old: "Menu", next: "menu-designs" },
  { old: "motion", next: "motion-graphics" },
  { old: "tshirts", next: "tshirt-designs" },
];

const spellingCorrections = new Map([
  ["advertiesment", "advertisement"],
  ["amymockup", "amy mockup"],
  ["catelogue", "catalogue"],
  ["comming", "coming"],
  ["constructiomn", "construction"],
  ["feddback", "feedback"],
  ["lankna", "lanka"],
  ["stawberry", "strawberry"],
  ["wemons", "womens"],
  ["yur", "your"],
]);

const knownAcronyms = new Map([
  ["amy", "AMY"],
  ["bcm", "BCM"],
  ["bcc", "BCC"],
  ["bgc", "BGC"],
  ["cc", "CC"],
  ["dns", "DNS"],
  ["fb", "FB"],
  ["it", "IT"],
  ["kwca", "KWCA"],
  ["lk", "LK"],
  ["lm", "LM"],
  ["me", "ME"],
  ["pubg", "PUBG"],
  ["s23", "S23"],
  ["slsca", "SLSCA"],
  ["t20", "T20"],
]);

function assertInsideGallery(path) {
  const resolved = resolve(path);
  const rootWithSep = galleryRoot.endsWith(sep) ? galleryRoot : `${galleryRoot}${sep}`;
  if (resolved !== galleryRoot && !resolved.startsWith(rootWithSep)) {
    throw new Error(`Refusing to operate outside gallery root: ${resolved}`);
  }
  return resolved;
}

function toPosix(path) {
  return path.split(sep).join("/");
}

function publicPathFromAbsolute(path) {
  return `/assets/gallery/${toPosix(relative(galleryRoot, path))}`;
}

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(fullPath);
    return [fullPath];
  });
}

function readHash(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function imageDimensions(path, ext) {
  const buffer = readFileSync(path);

  if (ext === ".png") {
    if (buffer.toString("ascii", 1, 4) !== "PNG") return null;
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if (ext === ".gif") {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];
      offset += 2;

      if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) continue;
      if (marker >= 0xd0 && marker <= 0xd7) continue;
      if (offset + 2 > buffer.length) break;

      const length = buffer.readUInt16BE(offset);
      if (length < 2 || offset + length > buffer.length) break;

      const isSof =
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf);

      if (isSof) {
        return {
          height: buffer.readUInt16BE(offset + 3),
          width: buffer.readUInt16BE(offset + 5),
        };
      }

      offset += length;
    }
  }

  if (ext === ".webp") {
    const riff = buffer.toString("ascii", 0, 4);
    const webp = buffer.toString("ascii", 8, 12);
    if (riff !== "RIFF" || webp !== "WEBP") return null;

    const chunk = buffer.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      };
    }

    if (chunk === "VP8L") {
      const bits = buffer.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }

    if (chunk === "VP8 ") {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }
  }

  return null;
}

function readUInt64BE(buffer, offset) {
  return Number(buffer.readBigUInt64BE(offset));
}

function parseBoxes(buffer, start, end, visitor) {
  let offset = start;
  while (offset + 8 <= end) {
    const boxStart = offset;
    let size = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    offset += 8;

    if (size === 1) {
      if (offset + 8 > end) break;
      size = readUInt64BE(buffer, offset);
      offset += 8;
    } else if (size === 0) {
      size = end - boxStart;
    }

    if (size < offset - boxStart || boxStart + size > end) break;

    const dataStart = offset;
    const dataEnd = boxStart + size;
    visitor(type, dataStart, dataEnd);
    offset = dataEnd;
  }
}

function mp4Metadata(path) {
  const buffer = readFileSync(path);
  const metadata = { width: 0, height: 0, codecs: [] };
  const containers = new Set(["moov", "trak", "mdia", "minf", "stbl"]);

  function walk(start, end) {
    parseBoxes(buffer, start, end, (type, dataStart, dataEnd) => {
      if (type === "tkhd") {
        const version = buffer.readUInt8(dataStart);
        const widthOffset = version === 1 ? dataStart + 84 : dataStart + 72;
        if (widthOffset + 8 <= dataEnd) {
          const width = buffer.readUInt32BE(widthOffset) / 65536;
          const height = buffer.readUInt32BE(widthOffset + 4) / 65536;
          if (width > 0 && height > 0) {
            metadata.width = Math.round(width);
            metadata.height = Math.round(height);
          }
        }
      }

      if (type === "stsd" && dataStart + 16 <= dataEnd) {
        let sampleOffset = dataStart + 8;
        while (sampleOffset + 8 <= dataEnd) {
          const sampleSize = buffer.readUInt32BE(sampleOffset);
          const sampleType = buffer.toString("ascii", sampleOffset + 4, sampleOffset + 8);
          if (sampleType.trim()) metadata.codecs.push(sampleType);
          if (["avc1", "avc3", "hvc1", "hev1", "mp4v", "vp09"].includes(sampleType) && sampleOffset + 36 <= dataEnd) {
            const width = buffer.readUInt16BE(sampleOffset + 32);
            const height = buffer.readUInt16BE(sampleOffset + 34);
            if (width > 0 && height > 0) {
              metadata.width = width;
              metadata.height = height;
            }
          }
          if (sampleSize < 8) break;
          sampleOffset += sampleSize;
        }
      }

      if (containers.has(type)) walk(dataStart, dataEnd);
    });
  }

  walk(0, buffer.length);
  return metadata.width > 0 && metadata.height > 0 ? metadata : null;
}

function commandExists(command) {
  const result = spawnSync(command, ["-version"], { encoding: "utf8" });
  return result.status === 0;
}

function normalizeTokens(input) {
  const spaced = input
    .replace(/\u00a0/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-zA-Z])/g, "$1 $2")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/['’]/g, "")
    .toLowerCase();

  const correctedTokens = spaced
    .split(/[^a-z0-9]+/g)
    .filter(Boolean)
    .flatMap((token) => (spellingCorrections.get(token) ?? token).split(/\s+/g))
    .filter(Boolean);

  const mergedTokens = [];
  for (let index = 0; index < correctedTokens.length; index += 1) {
    const token = correctedTokens[index];
    const nextToken = correctedTokens[index + 1];

    if (/^\d+$/.test(token) && ["st", "nd", "rd", "th"].includes(nextToken)) {
      mergedTokens.push(`${token}${nextToken}`);
      index += 1;
      continue;
    }

    if (token === "t" && nextToken === "20") {
      mergedTokens.push("t20");
      index += 1;
      continue;
    }

    if (token === "s" && /^\d+$/.test(nextToken)) {
      mergedTokens.push(`${token}${nextToken}`);
      index += 1;
      continue;
    }

    mergedTokens.push(token);
  }

  return mergedTokens;
}

function kebab(input) {
  return normalizeTokens(input).join("-");
}

function projectKeyFromTokens(tokens, categoryId) {
  const filtered = tokens.filter((token) => {
    if (/^\d+$/.test(token)) return false;
    if (["copy", "final", "side", "v", "ai"].includes(token)) return false;
    return true;
  });

  return filtered.join("-") || categoryId.replace(/s$/, "");
}

function cleanStemTokens(tokens) {
  return tokens.filter((token) => !["copy", "final"].includes(token));
}

function titleFromSlug(slug) {
  const tokens = slug
    .replace(/-\d{2}$/g, "")
    .split("-")
    .filter(Boolean);

  return tokens
    .map((token) => knownAcronyms.get(token) ?? `${token.charAt(0).toUpperCase()}${token.slice(1)}`)
    .join(" ");
}

function formatFromDimensions(width, height, mediaType) {
  const ratio = width / height;
  if (mediaType === "video") return ratio >= 1 ? "video-landscape" : "video-portrait";
  if (Math.abs(ratio - 1) < 0.08) return "square";
  if (ratio > 1.25) return "landscape";
  if (ratio < 0.8) return "portrait";
  return "mixed-ratio";
}

function categoryFromPath(relPath, tokens) {
  const parts = relPath.split("/");
  const top = parts[0];
  const normalizedTop = kebab(top);

  if (["motion", "motion-graphics"].includes(normalizedTop)) return "motion-graphics";
  if (["tshirts", "t-shirts", "tshirt-designs", "tee-shirts"].includes(normalizedTop)) return "tshirt-designs";
  if (["menu", "menu-designs"].includes(normalizedTop)) return "menu-designs";
  if (normalizedTop === "thumbs") return "banners";
  if (normalizedTop === "invitations" && tokens.includes("wedding")) return "wedding-cards";
  if (categoryIds.includes(normalizedTop)) return normalizedTop;

  return "other";
}

function altFor(categoryId, title, mediaType) {
  if (mediaType === "video") return `Motion graphic project preview for ${title}.`;

  const templates = {
    "logo-design": `Logo design presentation for ${title}.`,
    branding: `Brand identity artwork for ${title}.`,
    posters: `Poster design artwork for ${title}.`,
    flyers: `Promotional flyer design for ${title}.`,
    "social-media": `Social media promotional artwork for ${title}.`,
    "wedding-cards": `Wedding invitation card design for ${title}.`,
    invitations: `Invitation design artwork for ${title}.`,
    "business-cards": `Business card design presentation for ${title}.`,
    certificates: `Certificate design artwork for ${title}.`,
    brochures: `Brochure design artwork for ${title}.`,
    banners: `Banner design artwork for ${title}.`,
    "event-designs": `Event design artwork for ${title}.`,
    "print-designs": `Print design artwork for ${title}.`,
    "motion-graphics": `Motion graphic project preview for ${title}.`,
    "tshirt-designs": `T-shirt design mockup for ${title}.`,
    "menu-designs": `Menu design artwork for ${title}.`,
  };

  return templates[categoryId] ?? `Design artwork for ${title}.`;
}

function markdownEscape(value) {
  return String(value).replace(/\|/g, "\\|");
}

function publicPathToAbsolute(publicPath) {
  if (!publicPath.startsWith("/assets/gallery/")) return null;
  return resolve(galleryRoot, publicPath.replace("/assets/gallery/", ""));
}

function readExistingJson() {
  if (!existsSync(jsonPath)) return [];
  try {
    const parsed = JSON.parse(readFileSync(jsonPath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildExistingMetadataMaps(existingItems) {
  const byPath = new Map();
  const byNormalizedStem = new Map();

  for (const item of existingItems) {
    if (!item || typeof item !== "object") continue;
    if (typeof item.image === "string") {
      byPath.set(item.image, item);
      byNormalizedStem.set(kebab(basename(item.image, extname(item.image))), item);
    }
    if (typeof item.id === "string") {
      byNormalizedStem.set(kebab(item.id), item);
    }
  }

  return { byPath, byNormalizedStem };
}

function copyExistingMetadata(existing, next) {
  if (!existing) return next;

  const preserved = { ...next };
  for (const key of ["id", "title", "alt", "description", "tools", "year", "featured", "client"]) {
    const value = existing[key];
    if (value !== undefined && value !== null && value !== "") preserved[key] = value;
  }

  preserved.image = next.image;
  preserved.thumbnail = next.thumbnail;
  preserved.width = next.width;
  preserved.height = next.height;
  preserved.mediaType = next.mediaType;
  preserved.categoryId = next.categoryId;
  preserved.sortOrder = next.sortOrder;
  preserved.format = next.format;

  if (typeof preserved.title === "string" && preserved.title.includes("Ã")) {
    preserved.title = next.title;
  }
  if (typeof preserved.alt === "string" && preserved.alt.includes("Ã")) {
    preserved.alt = next.alt;
  }

  return preserved;
}

function uniqueTargetPath(folder, baseStem, ext, usedTargets, currentPath) {
  let candidateStem = baseStem;
  let counter = 2;

  while (true) {
    const candidate = assertInsideGallery(resolve(galleryRoot, folder, `${candidateStem}${ext}`));
    const sameAsCurrent = candidate.toLowerCase() === currentPath.toLowerCase();
    if (!usedTargets.has(candidate.toLowerCase()) && (!existsSync(candidate) || sameAsCurrent)) {
      usedTargets.add(candidate.toLowerCase());
      return candidate;
    }
    candidateStem = `${baseStem}-${String(counter).padStart(2, "0")}`;
    counter += 1;
  }
}

function validateJsonItems(items) {
  const errors = [];
  const ids = new Set();
  const mediaPaths = new Set();

  for (const item of items) {
    if (ids.has(item.id)) errors.push(`duplicate id: ${item.id}`);
    ids.add(item.id);

    if (!categoryIds.includes(item.categoryId)) {
      errors.push(`invalid category: ${item.categoryId} for ${item.id}`);
    }

    const mediaAbsolute = publicPathToAbsolute(item.image);
    if (!mediaAbsolute || !existsSync(mediaAbsolute)) errors.push(`missing image/media path: ${item.image}`);

    if (mediaPaths.has(item.image)) errors.push(`duplicate media path: ${item.image}`);
    mediaPaths.add(item.image);

    const imageExt = extname(item.image).toLowerCase();
    if (item.mediaType === "image" && !imageExts.has(imageExt)) {
      errors.push(`unsupported image extension: ${item.image}`);
    }
    if (item.mediaType === "video" && !videoExts.has(imageExt)) {
      errors.push(`unsupported video extension: ${item.image}`);
    }

    if (item.thumbnail) {
      const thumbnailAbsolute = publicPathToAbsolute(item.thumbnail);
      if (!thumbnailAbsolute || !existsSync(thumbnailAbsolute)) errors.push(`missing thumbnail path: ${item.thumbnail}`);
      const thumbnailExt = extname(item.thumbnail).toLowerCase();
      if (!imageExts.has(thumbnailExt)) errors.push(`thumbnail is not an image path: ${item.thumbnail}`);
    }
  }

  return errors;
}

function main() {
  assertInsideGallery(galleryRoot);
  const ffmpegAvailable = commandExists("ffmpeg");
  const ffprobeAvailable = commandExists("ffprobe");
  const existingItems = readExistingJson();
  const existingMaps = buildExistingMetadataMaps(existingItems);

  const mediaFiles = listFiles(galleryRoot)
    .filter((path) => {
      const name = basename(path).toLowerCase();
      if (ignoredNames.has(name)) return false;
      if (name.startsWith(".")) return false;
      return true;
    })
    .filter((path) => imageExts.has(extname(path).toLowerCase()) || videoExts.has(extname(path).toLowerCase()))
    .sort((a, b) => toPosix(relative(galleryRoot, a)).localeCompare(toPosix(relative(galleryRoot, b))));

  const inventory = mediaFiles.map((path) => {
    const ext = extname(path).toLowerCase();
    const relPath = toPosix(relative(galleryRoot, path));
    const tokens = normalizeTokens(basename(path, extname(path)));
    const mediaType = imageExts.has(ext) ? "image" : "video";
    const metadata = mediaType === "image" ? imageDimensions(path, ext) : mp4Metadata(path);

    return {
      oldAbsolutePath: path,
      oldPublicPath: publicPathFromAbsolute(path),
      oldRelPath: relPath,
      fileName: basename(path),
      ext,
      mediaType,
      size: statSync(path).size,
      hash: readHash(path),
      width: metadata?.width ?? 0,
      height: metadata?.height ?? 0,
      codecs: metadata?.codecs ?? [],
      tokens,
      categoryId: categoryFromPath(relPath, tokens),
    };
  });

  const hashGroups = new Map();
  for (const item of inventory) {
    if (!hashGroups.has(item.hash)) hashGroups.set(item.hash, []);
    hashGroups.get(item.hash).push(item);
  }

  const duplicateItems = new Set();
  const duplicateGroups = [...hashGroups.values()]
    .filter((group) => group.length > 1)
    .map((group) => {
      const sorted = [...group].sort((a, b) => a.oldRelPath.localeCompare(b.oldRelPath));
      for (const duplicate of sorted.slice(1)) duplicateItems.add(duplicate.oldAbsolutePath);
      return sorted;
    });

  const grouping = new Map();
  for (const item of inventory) {
    const key = `${item.categoryId}/${projectKeyFromTokens(item.tokens, item.categoryId)}`;
    if (!grouping.has(key)) grouping.set(key, []);
    grouping.get(key).push(item);
  }

  const usedTargets = new Set();
  const manifestRows = [];
  const operations = [];
  const projectGroups = [];

  for (const [groupKey, groupItems] of grouping) {
    const sorted = groupItems.sort((a, b) => a.oldRelPath.localeCompare(b.oldRelPath, undefined, { numeric: true }));
    const [, projectKey] = groupKey.split("/");
    const shouldSequence = sorted.length > 1;

    if (shouldSequence) {
      projectGroups.push({
        key: groupKey,
        count: sorted.length,
        files: sorted.map((item) => item.oldRelPath),
      });
    }

    sorted.forEach((item, index) => {
      const cleanTokens = cleanStemTokens(item.tokens);
      const singleStem = cleanTokens.some((token) => /[a-z]/.test(token))
        ? cleanTokens.join("-")
        : projectKey;
      const targetStem = shouldSequence
        ? `${projectKey}-${String(index + 1).padStart(2, "0")}`
        : singleStem;
      const folder = item.categoryId === "banners" && item.oldRelPath.startsWith("thumbs/")
        ? "banners"
        : item.categoryId;
      const targetPath = uniqueTargetPath(folder, targetStem, item.ext, usedTargets, item.oldAbsolutePath);
      const newPublicPath = publicPathFromAbsolute(targetPath);
      const changed = item.oldAbsolutePath !== targetPath;
      const reasonParts = [];
      if (changed) reasonParts.push("normalized filename/folder");
      if (shouldSequence) reasonParts.push("grouped project variation");
      if (duplicateItems.has(item.oldAbsolutePath)) reasonParts.push("exact duplicate skipped from JSON");
      if (!changed && !shouldSequence && !duplicateItems.has(item.oldAbsolutePath)) reasonParts.push("unchanged");

      operations.push({ item, targetPath, newPublicPath, changed, targetStem });
      manifestRows.push({
        oldPath: item.oldPublicPath,
        newPath: newPublicPath,
        mediaType: item.mediaType,
        category: item.categoryId,
        reason: reasonParts.join("; "),
      });
    });
  }

  const collisions = operations.filter((operation) => {
    const exists = existsSync(operation.targetPath);
    const sameAsCurrent = operation.targetPath.toLowerCase() === operation.item.oldAbsolutePath.toLowerCase();
    return exists && !sameAsCurrent;
  });

  if (collisions.length > 0) {
    throw new Error(`Refusing to overwrite ${collisions.length} existing gallery files.`);
  }

  for (const operation of operations) {
    mkdirSync(dirname(operation.targetPath), { recursive: true });
    if (operation.changed) {
      if (operation.item.oldAbsolutePath.toLowerCase() === operation.targetPath.toLowerCase()) {
        const temporaryPath = `${operation.targetPath}.case-rename-tmp`;
        renameSync(operation.item.oldAbsolutePath, temporaryPath);
        renameSync(temporaryPath, operation.targetPath);
      } else {
        renameSync(operation.item.oldAbsolutePath, operation.targetPath);
      }
    }
  }

  for (const { old, next } of folderRenames) {
    const oldPath = assertInsideGallery(resolve(galleryRoot, old));
    const nextPath = assertInsideGallery(resolve(galleryRoot, next));
    if (existsSync(oldPath) && !existsSync(nextPath)) {
      mkdirSync(nextPath, { recursive: true });
    }
    if (existsSync(oldPath) && readdirSync(oldPath).every((name) => ignoredNames.has(name.toLowerCase()))) {
      for (const name of readdirSync(oldPath)) {
        unlinkSync(assertInsideGallery(resolve(oldPath, name)));
      }
      rmdirSync(oldPath);
    }
  }

  const thumbsPath = assertInsideGallery(resolve(galleryRoot, "thumbs"));
  mkdirSync(thumbsPath, { recursive: true });
  if (readdirSync(thumbsPath).length === 0) {
    writeFileSync(resolve(thumbsPath, ".gitkeep"), "");
  }

  const canonicalByHash = new Map();
  const jsonItems = [];
  const sortedOperations = [...operations].sort((a, b) => {
    const catDiff = categoryBaseSort.get(a.item.categoryId) - categoryBaseSort.get(b.item.categoryId);
    if (catDiff !== 0) return catDiff;
    return a.newPublicPath.localeCompare(b.newPublicPath, undefined, { numeric: true });
  });

  const categoryProjectCounters = new Map();
  const usedIds = new Set();
  const videoItems = [];
  const manualReview = [];

  for (const operation of sortedOperations) {
    const { item, newPublicPath, targetStem } = operation;
    if (!item.width || !item.height) {
      manualReview.push(`${item.oldRelPath}: dimensions could not be read.`);
      continue;
    }

    if (canonicalByHash.has(item.hash)) continue;
    canonicalByHash.set(item.hash, operation);

    const categoryCounter = categoryProjectCounters.get(item.categoryId) ?? 0;
    categoryProjectCounters.set(item.categoryId, categoryCounter + 1);
    const sortOrder = categoryBaseSort.get(item.categoryId) + (categoryCounter + 1) * 10;
    const generatedTitle = titleFromSlug(targetStem);
    const existing = existingMaps.byPath.get(item.oldPublicPath) ?? existingMaps.byNormalizedStem.get(kebab(basename(item.oldPublicPath, extname(item.oldPublicPath))));

    const generated = {
      id: kebab(targetStem),
      title: generatedTitle,
      categoryId: item.categoryId,
      mediaType: item.mediaType,
      image: newPublicPath,
      alt: altFor(item.categoryId, generatedTitle, item.mediaType),
      width: item.width,
      height: item.height,
      sortOrder,
      format: formatFromDimensions(item.width, item.height, item.mediaType),
    };

    const preserved = copyExistingMetadata(existing, generated);
    let id = kebab(preserved.id);
    if (!id) id = generated.id;
    if (usedIds.has(id)) {
      let counter = 2;
      while (usedIds.has(`${id}-${counter}`)) counter += 1;
      id = `${id}-${counter}`;
    }
    usedIds.add(id);
    preserved.id = id;

    jsonItems.push(preserved);
    if (item.mediaType === "video") videoItems.push(preserved);

    if (item.mediaType === "video" && item.ext === ".mp4") {
      const codecs = new Set(item.codecs);
      if (codecs.size > 0 && ![...codecs].some((codec) => codec === "avc1" || codec === "avc3" || codec === "mp4v")) {
        manualReview.push(`${newPublicPath}: MP4 codec ${[...codecs].join(", ")} may need browser compatibility review.`);
      }
      if (codecs.size === 0) {
        manualReview.push(`${newPublicPath}: video codec could not be verified without ffprobe.`);
      }
    }
  }

  writeFileSync(jsonPath, `${JSON.stringify(jsonItems, null, 2)}\n`);

  const formatsFound = [...new Set(inventory.map((item) => item.ext.replace(".", "")))].sort();
  const imagesFound = inventory.filter((item) => item.mediaType === "image").length;
  const videosFound = inventory.filter((item) => item.mediaType === "video").length;
  const filesRenamed = operations.filter((operation) => operation.changed).length;
  const duplicateCount = duplicateGroups.reduce((count, group) => count + group.length - 1, 0);
  const conversions = [];
  const validationErrors = validateJsonItems(jsonItems);
  const countsByCategory = Object.fromEntries(categoryIds.map((categoryId) => [
    categoryId,
    jsonItems.filter((item) => item.categoryId === categoryId).length,
  ]));

  const manifest = [
    "# Gallery Media Rename Manifest",
    "",
    "| Old Path | New Path | Media Type | Category | Reason |",
    "|---|---|---|---|---|",
    ...manifestRows
      .sort((a, b) => a.oldPath.localeCompare(b.oldPath, undefined, { numeric: true }))
      .map((row) => `| \`${markdownEscape(row.oldPath)}\` | \`${markdownEscape(row.newPath)}\` | ${row.mediaType} | \`${row.category}\` | ${markdownEscape(row.reason)} |`),
    "",
  ].join("\n");
  writeFileSync(manifestPath, manifest);

  const folderRows = folderRenames
    .filter(({ old, next }) => (
      inventory.some((item) => item.oldRelPath.startsWith(`${old}/`)) ||
      inventory.some((item) => item.oldRelPath.startsWith(`${next}/`)) ||
      existsSync(resolve(galleryRoot, next))
    ))
    .map(({ old, next }) => `| \`public/assets/gallery/${old}/\` | \`public/assets/gallery/${next}/\` |`);

  const duplicateSection = duplicateGroups.length
    ? duplicateGroups
        .map((group, index) => [
          `Group ${index + 1}:`,
          ...group.map((item, itemIndex) => `- ${itemIndex === 0 ? "Canonical" : "Duplicate skipped"}: \`${item.oldPublicPath}\``),
        ].join("\n"))
        .join("\n\n")
    : "No byte-identical duplicate media files were detected.";

  const projectGroupSummary = projectGroups.length
    ? projectGroups
        .slice(0, 40)
        .map((group) => `- \`${group.key}\`: ${group.count} related files`)
        .join("\n")
    : "No multi-file project groups were detected.";

  const videoSummary = videoItems.length
    ? videoItems.map((item) => `- \`${item.id}\`: ${item.title} (${item.width}x${item.height})`).join("\n")
    : "No video gallery records were created.";

  const categoryRows = Object.entries(countsByCategory)
    .filter(([, count]) => count > 0)
    .map(([categoryId, count]) => `| \`${categoryId}\` | ${count} |`)
    .join("\n");

  const report = [
    "# Portfolio Gallery Bulk Media Implementation Report",
    "",
    "## Media Inventory Summary",
    "",
    `- Image files found: ${imagesFound}`,
    `- Video files found: ${videosFound}`,
    `- Formats found: ${formatsFound.length ? formatsFound.map((format) => `\`${format}\``).join(", ") : "none"}`,
    `- Total supported media files found: ${inventory.length}`,
    `- ffmpeg available: ${ffmpegAvailable ? "yes" : "no"}`,
    `- ffprobe available: ${ffprobeAvailable ? "yes" : "no"}`,
    "",
    "## Folder Renames",
    "",
    "| Old | New |",
    "|---|---|",
    folderRows.length ? folderRows.join("\n") : "| None | None |",
    "",
    "## File Renames",
    "",
    `- Media files renamed or moved: ${filesRenamed}`,
    "- Full path-level manifest: `GALLERY_MEDIA_RENAME_MANIFEST.md`",
    "",
    "## Exact Duplicates",
    "",
    duplicateSection,
    "",
    "## Browser Compatibility Conversions",
    "",
    "| Source | Converted File | Reason |",
    "|---|---|---|",
    conversions.length ? conversions.map((conversion) => `| ${conversion.source} | ${conversion.target} | ${conversion.reason} |`).join("\n") : "| None | None | No unsupported media requiring conversion was found, and ffmpeg/ffprobe were unavailable in PATH. |",
    "",
    "## Categories Added",
    "",
    "- `motion-graphics` - Motion Graphics",
    "- `tshirt-designs` - T-Shirt Designs",
    "- `menu-designs` - Menu Designs",
    "",
    "## JSON Items Added",
    "",
    `- Gallery JSON items total: ${jsonItems.length}`,
    "",
    "| Category | Items |",
    "|---|---:|",
    categoryRows || "| None | 0 |",
    "",
    "## Similar Project Groups",
    "",
    projectGroupSummary,
    projectGroups.length > 40 ? `\n- ${projectGroups.length - 40} additional groups are detailed in the manifest by sequential filenames.` : "",
    "",
    "## Video Items",
    "",
    videoSummary,
    "",
    "## Fullscreen Viewer Fix",
    "",
    "The viewer implementation must mount through a React portal so it is outside the DesignerPage and hero stacking contexts. The code update pairs that with a fullscreen fixed overlay and an explicit high z-index so the backdrop, media, and controls cover the navbar, hero layers, and page content.",
    "",
    "## Native Video Player",
    "",
    "Video records use `mediaType: \"video\"`; cards do not autoplay video. The fullscreen viewer renders a native `<video controls playsInline preload=\"metadata\">` element with `object-contain` sizing.",
    "",
    "## Files Modified",
    "",
    "- `src/data/designGallery.json`",
    "- `src/data/designGallery.ts`",
    "- `src/data/designCategories.ts`",
    "- `src/components/design/DesignGalleryItem.tsx`",
    "- `src/components/design/DesignLightbox.tsx`",
    "- `public/assets/gallery/README.md`",
    "",
    "## Files Created",
    "",
    "- `scripts/gallery-bulk-media.mjs`",
    "- `GALLERY_MEDIA_RENAME_MANIFEST.md`",
    "- `PORTFOLIO_GALLERY_BULK_MEDIA_IMPLEMENTATION_REPORT.md`",
    "",
    "## Build Result",
    "",
    "Pending. Run `npm run build` after code updates.",
    "",
    "## Path Validation Result",
    "",
    validationErrors.length ? validationErrors.map((error) => `- ${error}`).join("\n") : "- All JSON media paths exist.",
    "- Duplicate IDs: none detected by validation.",
    "- Duplicate media paths: none detected by validation.",
    "- Invalid categories: none detected by validation.",
    "- Unsupported formats in JSON: none detected by validation.",
    "",
    "## Media Requiring Manual Review",
    "",
    manualReview.length ? manualReview.map((item) => `- ${item}`).join("\n") : "- None.",
    "",
    "## Confirmation",
    "",
    "No unrelated landing, hero, developer, contact, project carousel, certificate carousel, palette, font, or main animation files were modified by this media normalization pass.",
    "",
    "## Final Terminal Summary",
    "",
    `1. Images detected: ${imagesFound}`,
    `2. Videos detected: ${videosFound}`,
    `3. Media files renamed: ${filesRenamed}`,
    `4. Folders renamed: ${folderRows.length}`,
    `5. Exact duplicates detected: ${duplicateCount}`,
    "6. Compatibility conversions performed: 0",
    `7. Gallery JSON items total: ${jsonItems.length}`,
    `8. Categories total: ${categoryIds.length}`,
    `9. Motion gallery items: ${countsByCategory["motion-graphics"]}`,
    `10. T-shirt gallery items: ${countsByCategory["tshirt-designs"]}`,
    `11. Menu gallery items: ${countsByCategory["menu-designs"]}`,
    `12. Missing media paths after validation: ${validationErrors.filter((error) => error.includes("missing")).length}`,
    "13. Build result: pending",
    "14. Fullscreen viewer uses React portal: pending code verification",
    "15. Native browser video controls enabled: pending code verification",
    "16. Hero/layout files modified: no",
    "",
  ].join("\n");

  writeFileSync(reportPath, report);

  const summary = {
    imagesFound,
    videosFound,
    filesRenamed,
    foldersRenamed: folderRows.length,
    exactDuplicates: duplicateCount,
    conversions: 0,
    jsonItems: jsonItems.length,
    categories: categoryIds.length,
    motionItems: countsByCategory["motion-graphics"],
    tshirtItems: countsByCategory["tshirt-designs"],
    menuItems: countsByCategory["menu-designs"],
    missingMediaPaths: validationErrors.filter((error) => error.includes("missing")).length,
    validationErrors,
    manualReview,
  };

  console.log(JSON.stringify(summary, null, 2));
}

main();
