const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const jpeg = require("jpeg-js");

function makeSolidPng(width, height, rgba) {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (width * y + x) << 2;
      png.data[idx] = rgba[0];
      png.data[idx + 1] = rgba[1];
      png.data[idx + 2] = rgba[2];
      png.data[idx + 3] = rgba[3];
    }
  }
  return PNG.sync.write(png);
}

function writeFile(relativePath, buffer) {
  const outputPath = path.join(process.cwd(), relativePath);
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, buffer);
  console.log(`Wrote ${relativePath} (${buffer.length} bytes)`);
}

function makeVerticalGradientJpeg(width, height, topRgba, bottomRgba, quality = 80) {
  const frameData = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    const t = height === 1 ? 0 : y / (height - 1);
    const r = Math.round(topRgba[0] * (1 - t) + bottomRgba[0] * t);
    const g = Math.round(topRgba[1] * (1 - t) + bottomRgba[1] * t);
    const b = Math.round(topRgba[2] * (1 - t) + bottomRgba[2] * t);
    const a = Math.round(topRgba[3] * (1 - t) + bottomRgba[3] * t);

    for (let x = 0; x < width; x += 1) {
      const idx = (width * y + x) << 2;
      frameData[idx] = r;
      frameData[idx + 1] = g;
      frameData[idx + 2] = b;
      frameData[idx + 3] = a;
    }
  }

  const rawImageData = { data: frameData, width, height };
  const { data } = jpeg.encode(rawImageData, quality);
  return data;
}

function main() {
  const parchment = makeSolidPng(2, 2, [245, 230, 211, 255]);
  writeFile("public/images/parchment-bg.png", parchment);

  const texture = makeSolidPng(2, 2, [19, 30, 48, 255]);
  writeFile("public/images/map-texture.png", texture);

  const hero = makeVerticalGradientJpeg(
    1200,
    800,
    [15, 25, 45, 255],
    [10, 15, 30, 255]
  );
  writeFile("public/images/got-map-hero.jpg", hero);
}

main();
