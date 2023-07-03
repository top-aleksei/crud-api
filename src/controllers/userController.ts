import { IncomingMessage, ServerResponse } from 'http';
import { create, deleteById, findAll, findById, update } from '../models/userModel';
import { parsePostData } from '../utils/utils';

export function getAllUsers(request: IncomingMessage, response: ServerResponse) {
  const users = findAll();
  response.writeHead(200, {
    'content-type': 'application/json',
  });
  response.end(JSON.stringify(users));
}

export function getUser(
  request: IncomingMessage,
  response: ServerResponse,
  id: string | undefined,
) {
  const user = findById(id);

  if (user) {
    response.writeHead(200, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify(user));
  } else {
    response.writeHead(404, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify({ message: 'User not found' }));
  }
}

export async function createUser(request: IncomingMessage, response: ServerResponse) {
  const body = await parsePostData(request);

  const { username, age, hobbies } = JSON.parse(body);
  const user = { username, age, hobbies };
  const newUser = create(user);
  response.writeHead(201, {
    'content-type': 'application/json',
  });
  response.end(JSON.stringify(newUser));
}

export async function updateUser(
  request: IncomingMessage,
  response: ServerResponse,
  id: string | undefined,
) {
  const user = findById(id);
  if (!user) {
    response.writeHead(404, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify({ message: 'User not found' }));
  } else {
    const body = await parsePostData(request);

    const { username, age, hobbies } = JSON.parse(body);
    const userData = {
      username: username || user.username,
      age: age || user.age,
      hobbies: hobbies || user.hobbies,
    };
    const updatedUser = update(id, userData);
    response.writeHead(201, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify(updatedUser));
  }
}

export function deleteUser(
  request: IncomingMessage,
  response: ServerResponse,
  id: string | undefined,
) {
  const user = findById(id);

  if (user) {
    deleteById(id);
    response.writeHead(200, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify({ message: `User '${id}' has been deleted` }));
  } else {
    response.writeHead(404, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify({ message: 'User not found' }));
  }
}
