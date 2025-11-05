const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");

const SOURCE_FILE = path.join(process.cwd(), "thegameofthronesmap_contact.html");
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

function extractContactFragments() {
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

  // For contact page, we need to preserve the full structure but extract the main content
  const mainContent = root.querySelector("main.contact-content");
  if (!mainContent) {
    throw new Error("Unable to locate main.contact-content in the source HTML.");
  }

  const cleanedHead = head.innerHTML.trim();
  const cleanedMainContent = mainContent.innerHTML.trim();

  ensureDataDir();
  writeFragment("contact-head.html", cleanedHead);
  writeFragment("contact-body.html", cleanedMainContent);

  console.log("Contact page fragments extracted successfully!");
}

extractContactFragments();