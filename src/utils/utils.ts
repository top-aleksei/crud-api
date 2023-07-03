import { IncomingMessage } from 'http';

export function parsePostData(request: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    try {
      let body = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
}
