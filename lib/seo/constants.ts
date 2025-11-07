import { LONG_TAIL_META, getKeywordList } from "./longTailKeywords";

// SEO常量配置
export const SITE_URL = "https://gameofthronesmap.quest";
export const SITE_NAME = "Game of Thrones Map";
export const DEFAULT_OG_IMAGE = "/images/got-map-hero.png";
export const TWITTER_HANDLE = "@GameOfThrones";

export const SITE_DESCRIPTION = LONG_TAIL_META.description;
export const SITE_PRIMARY_TITLE_SUFFIX = LONG_TAIL_META.titleSuffix;
export const SITE_LONG_TAIL_KEYWORDS = LONG_TAIL_META.keywords;
export const SITE_KEYWORDS = getKeywordList(
  [
    "game of thrones map",
    "game of thrones world map",
    "westeros map",
    "essos map"
  ],
  4
);
