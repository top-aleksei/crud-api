import { IUserInfo } from './../types/index';
import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../types';

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

export function sendResponseMessage(res: ServerResponse, statusCode: number, message: string) {
  res.writeHead(statusCode, {
    'content-type': 'application/json',
  });
  res.end(JSON.stringify({ message }));
}

export function sendResponseUserData(
  res: ServerResponse,
  statusCode: number,
  user: IUser[] | IUser | IUserInfo,
) {
  res.writeHead(statusCode, {
    'content-type': 'application/json',
  });
  res.end(JSON.stringify(user));
}

export function validatePostUserBody(user: IUserInfo) {
  const { username, age, hobbies } = user;
  return (
    username &&
    age &&
    hobbies &&
    typeof username == 'string' &&
    typeof age == 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((el) => typeof el === 'string')
  );
}
