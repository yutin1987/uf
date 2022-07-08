import hashfile from '../hashfile';
import readImage from '../readImage';
import convertImage from '../convertImage';

const dir = `${__dirname}/sample`;

describe('convertImage', () => {
  it('from http', async () => {
    const stream = await readImage('https://www.ui.com/microsite/static/media/app-world-diagram.ac485e5a.jpg');
    const fingerprint = hashfile(convertImage(stream));
    await expect(fingerprint).resolves.toBe('2fb877221df88630cd8eb1dda67e09bc85fee4bf');
  });

  it('from local', async () => {
    const stream = await readImage(`${__dirname}/sample/image.jpg`);
    const fingerprint = hashfile(convertImage(stream));
    await expect(fingerprint).resolves.toBe('ecb80d5b79d91fbf3e2d79f3b3777f02f3067dd3');
  });

  it('from local video', async () => {
    const stream = await readImage(`${__dirname}/sample/video.webm.png`);
    const fingerprint = hashfile(convertImage(stream));
    await expect(fingerprint).rejects.toBe('Input buffer contains unsupported image format');
  });
});
