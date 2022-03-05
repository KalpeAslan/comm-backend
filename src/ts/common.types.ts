import { UserEntity } from "../entities/user.entity";

export interface IResponse {
  status: number,
  message?: any,
  [key: string]: any
}

export interface IConfirmMessageResponse {
  message: string,
  state: boolean,
  user?: UserEntity,
}