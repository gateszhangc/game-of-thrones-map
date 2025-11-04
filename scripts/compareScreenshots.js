const fs = require("fs");
const path = require("path");
const pixelmatch = require("pixelmatch");
const { PNG } = require("pngjs");

const SCREENSHOT_DIR = path.join(process.cwd(), "screenshots");
const ORIGINAL_PATH = path.join(SCREENSHOT_DIR, "original.png");
const CLONE_PATH = path.join(SCREENSHOT_DIR, "clone.png");
const DIFF_PATH = path.join(SCREENSHOT_DIR, "diff.png");

function readPng(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing screenshot: ${filePath}`);
  }
  return PNG.sync.read(fs.readFileSync(filePath));
}

function writeDiff(diff, filePath) {
  const buffer = PNG.sync.write(diff);
  fs.writeFileSync(filePath, buffer);
  console.log(`Saved diff image to ${filePath}`);
}

function main() {
  const original = readPng(ORIGINAL_PATH);
  const clone = readPng(CLONE_PATH);

  if (original.width !== clone.width || original.height !== clone.height) {
    throw new Error("Screenshots must share identical dimensions before diffing.");
  }

  const diff = new PNG({ width: original.width, height: original.height });
  const diffPixels = pixelmatch(
    original.data,
    clone.data,
    diff.data,
    original.width,
    original.height,
    { threshold: 0.1 }
  );

  const totalPixels = original.width * original.height;
  const percent = ((diffPixels / totalPixels) * 100).toFixed(3);

  writeDiff(diff, DIFF_PATH);
  console.log(`Differing pixels: ${diffPixels} (${percent}%)`);
}

try {
  main();
} catch (error) {
  console.error("Pixel comparison failed:", error);
  process.exitCode = 1;
}
