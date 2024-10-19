export interface IUser extends IUserInfo {
  id: string;
}

export interface IUserInfo {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IWorkerMessage {
  type: string;
  userId: string;
  data: IUser | IUser[] | IUserInfo;
}
