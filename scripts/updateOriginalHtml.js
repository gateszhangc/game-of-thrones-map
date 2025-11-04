const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "data");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(PUBLIC_DIR, "original.html");

function readFragment(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing fragment: ${filename}. Run extractHtml.js first.`);
  }
  return fs.readFileSync(filePath, "utf8").trim();
}

function ensurePublicDir() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
}

function writeOriginalHtml() {
  const head = readFragment("home-head.html");
  const body = readFragment("home-body.html");

  const html = [
    "<!DOCTYPE html>",
    "<html lang=\"en\">",
    "<head>",
    head,
    "</head>",
    "<body>",
    body,
    "</body>",
    "</html>"
  ].join("\n");

  ensurePublicDir();
  fs.writeFileSync(OUTPUT_FILE, html, "utf8");
  console.log(`Wrote ${OUTPUT_FILE}`);
}

writeOriginalHtml();
