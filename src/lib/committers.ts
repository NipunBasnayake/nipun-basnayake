import { githubActivityData } from "@/data/portfolio";

export type CommittersRank = {
  rank: number | null;
  contributions: number | null;
};

type RawEntry = Record<string, unknown>;

const parseNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.]/g, "");
    if (!cleaned) return null;
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : null;
  }
  return null;
};

const matchUsername = (entry: RawEntry, username: string) => {
  const candidates = [
    entry.username,
    entry.user,
    entry.login,
    entry.name,
    entry.handle,
  ];

  return candidates.some((value) =>
    typeof value === "string"
      ? value.toLowerCase() === username.toLowerCase()
      : false
  );
};

const extractRank = (entry: RawEntry): CommittersRank => {
  const rank =
    parseNumber(entry.rank) ??
    parseNumber(entry.position) ??
    parseNumber(entry.place);
  const contributions =
    parseNumber(entry.contributions) ??
    parseNumber(entry.contribs) ??
    parseNumber(entry.commits) ??
    parseNumber(entry.count);

  return {
    rank,
    contributions,
  };
};

const findEntry = (data: unknown, username: string): RawEntry | null => {
  if (!data) return null;

  if (Array.isArray(data)) {
    return (
      data.find(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          matchUsername(item as RawEntry, username)
      ) ?? null
    );
  }

  if (typeof data === "object") {
    const record = data as Record<string, unknown>;

    const direct =
      record[username] ?? record[username.toLowerCase()] ?? record[username.toUpperCase()];
    if (direct && typeof direct === "object") {
      return direct as RawEntry;
    }

    if (Array.isArray(record.data)) {
      return findEntry(record.data, username);
    }

    if (Array.isArray(record.items)) {
      return findEntry(record.items, username);
    }
  }

  return null;
};

export async function getCommittersRank(
  username = githubActivityData.username
): Promise<CommittersRank> {
  try {
    const response = await fetch(githubActivityData.committersEndpoint, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return { rank: null, contributions: null };
    }

    const data = (await response.json()) as unknown;
    const entry = findEntry(data, username);

    if (!entry) {
      return { rank: null, contributions: null };
    }

    return extractRank(entry);
  } catch {
    return { rank: null, contributions: null };
  }
}
