import stream from 'stream';
import sharp from 'sharp';

export default function convertImage(stream: stream.Readable): stream.Readable {
  const converter = sharp({ limitInputPixels: false }).flip().flop().jpeg();
  return stream.pipe(converter);
}