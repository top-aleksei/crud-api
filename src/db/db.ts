import { IUser } from '../types';

const testDB: IUser[] = [
  { id: '1', username: 'aleksei', age: 29, hobbies: ['baskte'] },
  { id: '7447e781-17b9-4f17-ad70-23d312cb38af', username: 'ivan', age: 19, hobbies: ['it'] },
];

export const db = process.env.TEST ? testDB : [];
