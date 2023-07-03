export interface IUser extends IUserInfo {
  id: string;
}

export interface IUserInfo {
  username: string;
  age: number;
  hobbies: string[];
}
