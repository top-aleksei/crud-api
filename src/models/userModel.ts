import { db } from '../db/db';
import { IUserInfo } from '../types';
import { v4 as uuidv4 } from 'uuid';

export function findAll() {
  return db;
}

export function findById(id: string | undefined) {
  return db.find((user) => user.id === id);
}

export function create(userInfo: IUserInfo) {
  const newUser = { id: uuidv4(), ...userInfo };
  db.push(newUser);
  return newUser;
}

export function update(id: string | undefined, userData: IUserInfo) {
  if (id) {
    const index = db.findIndex((user) => user.id === id);
    const updatedUser = { id, ...userData };
    db[index] = updatedUser;

    return updatedUser;
  }
}

export function deleteById(id: string | undefined) {
  const index = db.findIndex((user) => user.id === id);
  db.splice(index, 1);
}
