const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const DIFF_PATH = path.join(process.cwd(), "screenshots", "diff.png");

function readDiff() {
  if (!fs.existsSync(DIFF_PATH)) {
    throw new Error("Diff image not found. Run compareScreenshots.js first.");
  }
  return PNG.sync.read(fs.readFileSync(DIFF_PATH));
}

function analyzeDiff(diff) {
  const { width, height, data } = diff;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  let diffCount = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (width * y + x) << 2;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a === 0) {
        continue;
      }

      if (r !== 0 || g !== 0 || b !== 0) {
        diffCount += 1;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (diffCount === 0) {
    console.log("No differing pixels detected in diff.png.");
    return;
  }

  console.log(
    `Bounding box: left=${minX}, top=${minY}, right=${maxX}, bottom=${maxY}`
  );
  console.log(`Pixel span: width=${maxX - minX + 1}, height=${maxY - minY + 1}`);
}

function main() {
  const diff = readDiff();
  analyzeDiff(diff);
}

try {
  main();
} catch (error) {
  console.error("Diff analysis failed:", error);
  process.exitCode = 1;
}
