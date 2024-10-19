import { IncomingMessage, ServerResponse } from 'http';
import { create, deleteById, findAll, findById, update } from '../models/userModel';
import {
  parsePostData,
  sendResponseMessage,
  sendResponseUserData,
  validatePostUserBody,
} from '../utils/utils';
import { validate as uuidValidate } from 'uuid';
import { IUser } from '../types/index';

export function getAllUsers(request: IncomingMessage, response: ServerResponse) {
  const users = findAll();
  sendResponseUserData(response, 200, users);
}

export function getUser(
  request: IncomingMessage,
  response: ServerResponse,
  id: string | undefined,
) {
  const user = findById(id);

  if (id && !uuidValidate(id)) {
    return sendResponseMessage(response, 400, 'user ID in not valid (not uuid)');
  }
  if (user) {
    sendResponseUserData(response, 200, user);
  } else {
    sendResponseMessage(response, 404, `User with ID: '${id}' doesn't exist`);
  }
}

export async function createUser(request: IncomingMessage, response: ServerResponse) {
  const body = await parsePostData(request);

  const { username, age, hobbies } = JSON.parse(body);
  const user = { username, age, hobbies };

  if (!validatePostUserBody(user)) {
    return sendResponseMessage(response, 400, 'Body request doesnt contain required fields');
  }

  const newUser = create(user);
  sendResponseUserData(response, 201, newUser);
}

export async function updateUser(
  request: IncomingMessage,
  response: ServerResponse,
  id: string | undefined,
) {
  const user = findById(id);
  if (id && !uuidValidate(id)) {
    return sendResponseMessage(response, 400, 'user ID in not valid (not uuid)');
  }
  if (!user) {
    sendResponseMessage(response, 404, `User with ID: '${id}' doesn't exist`);
  } else {
    const body = await parsePostData(request);

    const { username, age, hobbies } = JSON.parse(body);
    const userData = {
      username: username || user.username,
      age: age || user.age,
      hobbies: hobbies || user.hobbies,
    };
    const updatedUser = update(id, userData) as IUser;
    sendResponseUserData(response, 200, updatedUser);
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
    sendResponseMessage(response, 200, `User '${id}' has been deleted`);
  } else {
    sendResponseMessage(response, 404, `User '${id}' was not found`);
  }
}
