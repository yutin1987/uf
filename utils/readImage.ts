import stream from 'stream';
import fs from 'fs';
import axios from 'axios';

export default async function readImage(url: string): Promise<stream.Readable> {
  if (/^http/.test(url)) {
    const response = await axios({ method: 'get', url, responseType: 'stream' });
    return response.data;
  }
  return fs.createReadStream(url);
}