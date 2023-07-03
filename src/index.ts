import 'dotenv/config';
import { createServer } from 'http';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/userController';
import { sendResponseMessage } from './utils/utils';

const PORT = process.env.PORT || 5000;

const server = createServer((req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        if (req.url === '/api/users') {
          getAllUsers(req, res);
        } else if (req.url?.match(/\/api\/users\/([0-9]+)/)) {
          const id = req.url.split('/').at(-1);
          getUser(req, res, id);
        } else {
          sendResponseMessage(res, 404, 'Invalid endpoint');
        }
        break;
      case 'POST':
        if (req.url === '/api/users') {
          createUser(req, res);
        } else {
          sendResponseMessage(res, 404, 'Invalid endpoint');
        }
        break;
      case 'PUT':
        if (req.url?.match(/\/api\/users\/([0-9]+)/)) {
          const id = req.url.split('/').at(-1);
          updateUser(req, res, id);
        } else {
          sendResponseMessage(res, 404, 'Invalid endpoint');
        }
        break;
      case 'DELETE':
        if (req.url?.match(/\/api\/users\/([0-9]+)/)) {
          const id = req.url.split('/').at(-1);
          deleteUser(req, res, id);
        } else {
          sendResponseMessage(res, 404, 'Invalid endpoint');
        }
        break;
      default:
        sendResponseMessage(res, 400, 'Invalid http method');
    }
  } catch (err) {
    sendResponseMessage(res, 500, 'Error on the server');
  }
});

server.listen(PORT, () => console.log(`serv started on ${PORT}`));
