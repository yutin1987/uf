import stream from 'stream';
import fs from 'fs';
import readImage from "./utils/readImage";
import convertImage from "./utils/convertImage";

const url = process.argv[2];
const target = process.argv[3] || `./${Date.now()}.jpeg`;

if (!url) throw new Error('image url is required');

(async () => {
  const stream = await readImage(url);
  const readable = convertImage(stream);
  const writable = fs.createWriteStream(target);
  readable.on('data', chunk => {
    writable.write(chunk);
  });
})();