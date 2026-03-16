/**
 * Builds favicon.jpg from the welcome headshot.
 * Square center crop and resize. Does not modify the source image or the popup.
 */
const path = require('path');
const Jimp = require('jimp');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'assets', 'IMG_5202.jpeg');
const OUT = path.join(ROOT, 'public', 'favicon.jpg');
const SIZE = 48;

const CROP_FRACTION = (1 / 4) * 1.30;

async function main() {
  const image = await Jimp.read(SRC);

  const nw = image.bitmap.width;
  const nh = image.bitmap.height;
  const cropW = Math.round(nw * CROP_FRACTION);
  const cropH = Math.round(nh * CROP_FRACTION);
  const side = Math.min(cropW, cropH);
  const x = Math.round((nw - side) / 2);
  const y = Math.round((nh - side) / 2);

  image.crop(x, y, side, side);
  image.resize(SIZE, SIZE);
  image.quality(90);
  await image.writeAsync(OUT);

  console.log('Favicon written to public/favicon.jpg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
