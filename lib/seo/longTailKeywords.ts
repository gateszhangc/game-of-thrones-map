import fs from "node:fs";
import path from "node:path";

const LONG_TAIL_KEYWORD_FILES = [
  path.join(
    process.cwd(),
    "seo",
    "game-of-thrones-map_broad-match_us_2025-11-06_que.csv"
  ),
  path.join(
    process.cwd(),
    "seo",
    "game-of-thrones-map_broad-match_us_2025-11-06.csv"
  )
];

type LongTailMeta = {
  titleSuffix: string;
  description: string;
  keywords: {
    primaryQuestion: string;
    braavos: string;
    dragonstone: string;
  };
};

let cachedKeywords: string[] | null = null;
let cachedMeta: LongTailMeta | null = null;

function loadLongTailKeywords(): string[] {
  if (cachedKeywords) {
    return cachedKeywords;
  }

  const keywords = new Set<string>();

  for (const filePath of LONG_TAIL_KEYWORD_FILES) {
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const rows = content.split(/\r?\n/);
    rows.shift(); // drop header

    for (const row of rows) {
      const keyword = extractKeywordFromRow(row);
      if (keyword) {
        keywords.add(keyword);
      }
    }
  }

  cachedKeywords = Array.from(keywords);
  return cachedKeywords;
}

function extractKeywordFromRow(row: string): string | null {
  if (!row) return null;

  let keyword = "";
  let inQuotes = false;

  for (const char of row) {
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      break;
    }

    keyword += char;
  }

  const normalized = keyword.trim();
  return normalized.length > 0 ? normalized : null;
}

export function getKeywordByTerm(term: string, fallback?: string): string {
  const normalizedTerm = term.trim().toLowerCase();

  const match = loadLongTailKeywords().find((keyword) =>
    keyword.toLowerCase().includes(normalizedTerm)
  );

  if (match) {
    return match;
  }

  return fallback ?? term;
}

export function getKeywordList(
  termList: string[],
  limit = termList.length
): string[] {
  const seen = new Set<string>();
  const masterKeywords = loadLongTailKeywords();

  termList.forEach((term) => {
    const keyword = getKeywordByTerm(term);
    if (keyword) {
      const normalized = keyword.toLowerCase();
      if (!seen.has(normalized)) {
        seen.add(normalized);
      }
    }
  });

  const orderedKeywords = Array.from(seen).map((keyword) => {
    const source = masterKeywords.find(
      (candidate) => candidate.toLowerCase() === keyword
    );
    return source ?? keyword;
  });

  return orderedKeywords.slice(0, limit);
}

function toTitleCase(value: string): string {
  return value.replace(/\w+/g, (word) => {
    const [first, ...rest] = word;
    if (!first) return word;
    return first.toUpperCase() + rest.join("").toLowerCase();
  });
}

function extractFocusTerm(keyword: string, term: string): string {
  const regex = new RegExp(term, "i");
  const match = keyword.match(regex);
  const fallback = term;
  const selected = (match ? match[0] : fallback).trim();
  return toTitleCase(selected);
}

function buildMetaDescription(
  primaryQuestion: string,
  braavos: string,
  dragonstone: string
): string {
  const description = `Answer "${primaryQuestion}", "${braavos}" & "${dragonstone}" via an atlas.`;

  if (description.length <= 160) {
    return description;
  }

  const shorter = `Answer "${primaryQuestion}", "${braavos}" & "${dragonstone}".`;
  return shorter.length <= 160 ? shorter : shorter.slice(0, 157).concat("...");
}

export function buildPrimaryLongTailMeta(): LongTailMeta {
  if (cachedMeta) {
    return cachedMeta;
  }

  const primaryQuestion = getKeywordByTerm(
    "what are the 7 kingdoms in game of thrones map"
  );
  const braavos = getKeywordByTerm("where is braavos in game of thrones map");
  const dragonstone = getKeywordByTerm(
    "where is dragonstone in game of thrones map"
  );

  const titleSuffix = `${extractFocusTerm(
    primaryQuestion,
    "7 kingdoms"
  )} & ${extractFocusTerm(braavos, "braavos")}`;

  cachedMeta = {
    titleSuffix,
    description: buildMetaDescription(primaryQuestion, braavos, dragonstone),
    keywords: {
      primaryQuestion,
      braavos,
      dragonstone
    }
  };

  return cachedMeta;
}

export const LONG_TAIL_META = buildPrimaryLongTailMeta();
