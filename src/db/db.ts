import { IUser } from '../types';

const testDB: IUser[] = [
  { id: '1', username: 'aleksei', age: 29, hobbies: ['baskte'] },
  { id: '2', username: 'ivan', age: 19, hobbies: ['it'] },
];

export const db = process.env.TEST ? testDB : [];
