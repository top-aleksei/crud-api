import { IncomingMessage, ServerResponse } from 'http';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController';
import { sendResponseMessage } from '../utils/utils';

export const userRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  try {
    switch (method) {
      case 'GET':
        if (url === '/api/users') {
          getAllUsers(req, res);
        } else if (url?.match(/\/api\/users\/(.+)/)) {
          const id = url.split('/').at(-1);
          getUser(req, res, id);
        } else {
          sendResponseMessage(res, 404, 'Invalid endpoint');
        }
        break;
      case 'POST':
        if (url === '/api/users') {
          createUser(req, res);
        } else {
          sendResponseMessage(res, 404, 'Invalid endpoint');
        }
        break;
      case 'PUT':
        if (url?.match(/\/api\/users\/(.+)/)) {
          const id = url.split('/').at(-1);
          updateUser(req, res, id);
        } else {
          sendResponseMessage(res, 404, 'Invalid endpoint');
        }
        break;
      case 'DELETE':
        if (url?.match(/\/api\/users\/(.+)/)) {
          const id = url.split('/').at(-1);
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
};
