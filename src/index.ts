import 'dotenv/config';
import { createServer } from 'http';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/userController';

const PORT = process.env.PORT || 5000;
console.log(process.env.TEST);
const server = createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.url === '/api/users') {
        getAllUsers(req, res);
      } else if (req.url?.match(/\/api\/users\/([0-9]+)/)) {
        const id = req.url.split('/').at(-1);
        getUser(req, res, id);
      } else {
        res.writeHead(400, {
          'content-type': 'application/json',
        });
        res.end('something wrong');
      }
      break;
    case 'POST':
      if (req.url === '/api/users') {
        createUser(req, res);
      }
      break;
    case 'PUT':
      if (req.url?.match(/\/api\/users\/([0-9]+)/)) {
        const id = req.url.split('/').at(-1);
        updateUser(req, res, id);
      }
      break;
    case 'DELETE':
      if (req.url?.match(/\/api\/users\/([0-9]+)/)) {
        const id = req.url.split('/').at(-1);
        deleteUser(req, res, id);
      }
      break;
    default:
      res.writeHead(400, {
        'content-type': 'application/json',
      });
      res.end('something wrong');
  }
});

server.listen(PORT, () => console.log(`serv started on ${PORT}`));
