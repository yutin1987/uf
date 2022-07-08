import stream from 'stream';
import crypto from 'crypto';

export default function hashfile(stream: stream.Readable): Promise<string> {
  return new Promise((resolve, rejects) => {
    const hash = crypto.createHash('sha1');
    hash.setEncoding('hex');
    
    stream.on('end', function() {
      hash.end();
      resolve(hash.read());
    });

    stream.on('error', function(error) {
      rejects(error.message);
    });
  
    stream.pipe(hash);
  });
}
