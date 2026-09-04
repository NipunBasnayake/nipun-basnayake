import rawGalleryItems from "./designGallery.json";
import { designCategories } from "./designCategories";

export interface DesignItem {
  id: string;
  title: string;
  categoryId: string;
  image: string;
  thumbnail: string;
  width: number;
  height: number;
  alt: string;
  sortOrder: number;
  year?: string;
  description?: string;
  tools?: string[];
  featured?: boolean;
  client?: string;
  format?: string;
}

interface DesignGalleryJsonItem {
  id?: unknown;
  title?: unknown;
  categoryId?: unknown;
  image?: unknown;
  thumbnail?: unknown;
  alt?: unknown;
  width?: unknown;
  height?: unknown;
  sortOrder?: unknown;
  year?: unknown;
  description?: unknown;
  tools?: unknown;
  featured?: unknown;
  client?: unknown;
  format?: unknown;
}

interface GalleryValidationError {
  itemId: string;
  field: string;
  reason: string;
}

const galleryRoot = "/assets/gallery/";
const validCategoryIds = new Set(designCategories.map((category) => category.id));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getItemId(item: DesignGalleryJsonItem, index: number): string {
  return typeof item.id === "string" && item.id.trim()
    ? item.id.trim()
    : `item at index ${index}`;
}

function addError(
  errors: GalleryValidationError[],
  itemId: string,
  field: string,
  reason: string,
) {
  errors.push({ itemId, field, reason });
}

function readRequiredString(
  item: DesignGalleryJsonItem,
  field: keyof DesignGalleryJsonItem,
  itemId: string,
  errors: GalleryValidationError[],
): string {
  const value = item[field];

  if (typeof value !== "string" || !value.trim()) {
    addError(errors, itemId, String(field), "must be a non-empty string.");
    return "";
  }

  return value.trim();
}

function readOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readPositiveNumber(
  item: DesignGalleryJsonItem,
  field: "width" | "height",
  itemId: string,
  errors: GalleryValidationError[],
): number {
  const value = item[field];

  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    addError(errors, itemId, field, "must be a positive number.");
    return 0;
  }

  return value;
}

function readSortOrder(
  value: unknown,
  itemId: string,
  errors: GalleryValidationError[],
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    addError(errors, itemId, "sortOrder", "must be a finite number.");
    return Number.POSITIVE_INFINITY;
  }

  return value;
}

function readOptionalTools(
  value: unknown,
  itemId: string,
  errors: GalleryValidationError[],
): string[] | undefined {
  if (value === undefined) return undefined;

  if (!Array.isArray(value)) {
    addError(errors, itemId, "tools", "must be an array of strings when provided.");
    return undefined;
  }

  const tools = value
    .filter((tool): tool is string => typeof tool === "string" && Boolean(tool.trim()))
    .map((tool) => tool.trim());

  if (tools.length !== value.length) {
    addError(errors, itemId, "tools", "must contain only non-empty strings.");
  }

  return tools.length > 0 ? tools : undefined;
}

function validateGalleryPath(
  path: string,
  itemId: string,
  field: "image" | "thumbnail",
  errors: GalleryValidationError[],
) {
  if (!path.startsWith(galleryRoot)) {
    addError(errors, itemId, field, `must begin with ${galleryRoot}.`);
  }
}

function validateAndNormalizeGalleryItems(value: unknown): {
  items: DesignItem[];
  errors: GalleryValidationError[];
} {
  const errors: GalleryValidationError[] = [];

  if (!Array.isArray(value)) {
    return {
      items: [],
      errors: [
        {
          itemId: "designGallery.json",
          field: "root",
          reason: "must be an array of gallery items.",
        },
      ],
    };
  }

  const seenIds = new Set<string>();
  const items = value.reduce<DesignItem[]>((validItems, candidate, index) => {
    if (!isRecord(candidate)) {
      addError(errors, `item at index ${index}`, "root", "must be an object.");
      return validItems;
    }

    const item = candidate as DesignGalleryJsonItem;
    const itemId = getItemId(item, index);
    const errorCountBeforeItem = errors.length;

    const id = readRequiredString(item, "id", itemId, errors);
    const title = readRequiredString(item, "title", itemId, errors);
    const categoryId = readRequiredString(item, "categoryId", itemId, errors);
    const image = readRequiredString(item, "image", itemId, errors);
    const alt = readRequiredString(item, "alt", itemId, errors);
    const width = readPositiveNumber(item, "width", itemId, errors);
    const height = readPositiveNumber(item, "height", itemId, errors);
    const sortOrder = readSortOrder(item.sortOrder, itemId, errors);
    const thumbnail = readOptionalString(item.thumbnail) ?? image;

    if (id) {
      if (seenIds.has(id)) {
        addError(errors, itemId, "id", `duplicate gallery id "${id}".`);
      } else {
        seenIds.add(id);
      }
    }

    if (categoryId && !validCategoryIds.has(categoryId)) {
      addError(
        errors,
        itemId,
        "categoryId",
        `Invalid gallery categoryId "${categoryId}" for item "${itemId}".`,
      );
    }

    if (image) {
      validateGalleryPath(image, itemId, "image", errors);
    }

    if (thumbnail) {
      validateGalleryPath(thumbnail, itemId, "thumbnail", errors);
    }

    const tools = readOptionalTools(item.tools, itemId, errors);

    if (item.featured !== undefined && typeof item.featured !== "boolean") {
      addError(errors, itemId, "featured", "must be a boolean when provided.");
    }

    if (errors.length > errorCountBeforeItem) {
      return validItems;
    }

    validItems.push({
      id,
      title,
      categoryId,
      image,
      thumbnail,
      alt,
      width,
      height,
      sortOrder,
      description: readOptionalString(item.description),
      tools,
      year: readOptionalString(item.year),
      featured: typeof item.featured === "boolean" ? item.featured : undefined,
      client: readOptionalString(item.client),
      format: readOptionalString(item.format),
    });

    return validItems;
  }, []);

  items.sort((first, second) => {
    if (first.sortOrder !== second.sortOrder) {
      return first.sortOrder - second.sortOrder;
    }

    return first.title.localeCompare(second.title);
  });

  return { items, errors };
}

function formatGalleryErrors(errors: GalleryValidationError[]): string {
  return errors
    .map((error) => `Invalid gallery ${error.field} for ${error.itemId}: ${error.reason}`)
    .join("\n");
}

const validation = validateAndNormalizeGalleryItems(rawGalleryItems);

if (validation.errors.length > 0 && import.meta.env.DEV) {
  throw new Error(formatGalleryErrors(validation.errors));
}

export const designGalleryValidationErrors = validation.errors;
export const designItems: DesignItem[] = validation.items;
