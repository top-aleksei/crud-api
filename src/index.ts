import 'dotenv/config';
import { createServer } from 'http';
import { db } from './db/db';

const PORT = process.env.PORT || 5000;
console.log(process.env.TEST);
const server = createServer((request, response) => {
  switch (request.method) {
    case 'GET':
      response.writeHead(200, {
        'content-type': 'application/json',
      });
      response.write(JSON.stringify(db));
      response.end();
      break;
    default:
      response.writeHead(400, {
        'content-type': 'application/json',
      });
      response.end();
  }
});

server.listen(PORT, () => console.log(`serv started on ${PORT}`));
