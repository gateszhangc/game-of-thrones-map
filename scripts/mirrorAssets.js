const fs = require("fs");
const path = require("path");
const url = require("url");
const { chromium } = require("playwright");

const ALLOWED_PREFIXES = ["/css/", "/images/", "/cdn-cgi/"];
const BASE_URL = "https://thegameofthronesmap.com";
const PUBLIC_DIR = path.join(process.cwd(), "public");

function ensureDirectory(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function shouldMirror(requestUrl) {
  try {
    const parsed = new url.URL(requestUrl);
    if (parsed.origin !== BASE_URL) {
      return false;
    }
    return ALLOWED_PREFIXES.some((prefix) => parsed.pathname.startsWith(prefix));
  } catch {
    return false;
  }
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on("response", async (response) => {
    const requestUrl = response.url();
    if (!shouldMirror(requestUrl)) {
      return;
    }
    const status = response.status();
    const statusText = response.statusText();

    if (!response.ok()) {
      console.warn(
        `Skipping ${requestUrl} -> status ${status} ${statusText}`
      );
      return;
    }

    const parsed = new url.URL(requestUrl);
    const outputPath = path.join(PUBLIC_DIR, parsed.pathname);

    try {
      const body = await response.body();
      if (!body || body.length === 0) {
        console.warn(
          `Received empty body for ${requestUrl} (status ${status})`
        );
        return;
      }

      ensureDirectory(outputPath);
      fs.writeFileSync(outputPath, body);
      console.log(
        `Mirrored ${parsed.pathname} (${body.length} bytes, status ${status})`
      );
    } catch (error) {
      console.error(`Failed to mirror ${parsed.pathname}:`, error);
    }
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await browser.close();
}

main().catch((error) => {
  console.error("Asset mirroring failed:", error);
  process.exitCode = 1;
});
