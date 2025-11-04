const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");

const SOURCE_FILE = path.join(process.cwd(), "thegameofthronesmap_home.html");
const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function writeFragment(filename, contents) {
  const outputPath = path.join(DATA_DIR, filename);
  fs.writeFileSync(outputPath, contents, "utf8");
  console.log(`Wrote ${filename} (${contents.length} bytes)`);
}

function extractFragments() {
  if (!fs.existsSync(SOURCE_FILE)) {
    throw new Error(
      `Source HTML not found at ${SOURCE_FILE}. Run the fetch step first.`
    );
  }

  const rawHtml = fs.readFileSync(SOURCE_FILE, "utf8");
  const root = parse(rawHtml);

  const head = root.querySelector("head");
  const body = root.querySelector("body");

  if (!head || !body) {
    throw new Error("Unable to locate <head> or <body> in the source HTML.");
  }

  const cleanedHead = head.innerHTML.trim();
  const cleanedBody = body.innerHTML.trim();

  ensureDataDir();
  writeFragment("home-head.html", cleanedHead);
  writeFragment("home-body.html", cleanedBody);
}

extractFragments();
