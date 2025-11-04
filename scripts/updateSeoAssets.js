const fs = require("fs");
const path = require("path");
const https = require("https");

const PUBLIC_DIR = path.join(process.cwd(), "public");

const TARGETS = [
  {
    url: "https://thegameofthronesmap.com/robots.txt",
    filename: "robots.txt"
  },
  {
    url: "https://thegameofthronesmap.com/sitemap.xml",
    filename: "sitemap.xml"
  }
];

function ensurePublicDir() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode && response.statusCode >= 400) {
          reject(
            new Error(`Request failed: ${url} (status ${response.statusCode})`)
          );
          response.resume();
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", (error) => reject(error));
  });
}

async function refreshAssets() {
  ensurePublicDir();

  for (const { url, filename } of TARGETS) {
    try {
      const contents = await download(url);
      const outputPath = path.join(PUBLIC_DIR, filename);
      fs.writeFileSync(outputPath, contents, "utf8");
      console.log(`Wrote ${filename}`);
    } catch (error) {
      console.error(`Failed to update ${filename} from ${url}`, error);
    }
  }
}

refreshAssets();
