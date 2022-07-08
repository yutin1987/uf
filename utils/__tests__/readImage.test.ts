import hashfile from '../hashfile';
import readImage from '../readImage';

const dir = `${__dirname}/sample`;

describe('readImage', () => {
  it('from http', async () => {
    const stream = await readImage('https://www.ui.com/microsite/static/media/app-world-diagram.ac485e5a.jpg');
    const fingerprint = hashfile(stream);

    await expect(fingerprint).resolves.toBe('f77e74a71be436ac7eb146b7c794c59a62f5c91b');
  });

  it('from local', async () => {
    const stream = await readImage(`${__dirname}/sample/image.jpg`);
    const fingerprint = hashfile(stream);
    await expect(fingerprint).resolves.toBe('f4d3551a629b53b7475df04d41faecf61c2f475d');
  });
});
