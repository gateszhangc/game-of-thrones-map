const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const SCREENSHOT_DIR = path.join(process.cwd(), "screenshots");
const ORIGINAL_PATH = path.join(SCREENSHOT_DIR, "original.png");
const CLONE_PATH = path.join(SCREENSHOT_DIR, "clone.png");

const VIEWPORT = { width: 1440, height: 900 };
const NAVIGATION_OPTIONS = { waitUntil: "networkidle" };

async function ensureScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
}

async function capture(page, url, outputPath) {
  await page.goto(url, NAVIGATION_OPTIONS);
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`Captured ${outputPath}`);
}

async function main() {
  await ensureScreenshotDir();

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    javaScriptEnabled: false
  });

  const page = await context.newPage();

  try {
    await capture(page, "https://thegameofthronesmap.com", ORIGINAL_PATH);
    await capture(page, "http://localhost:3000", CLONE_PATH);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Screenshot capture failed:", error);
  process.exitCode = 1;
});
