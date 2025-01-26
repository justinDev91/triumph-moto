import { UserEntity } from "@domain/entities/user/UserEntity";
import { UserNotFoundError } from "@domain/errors/user/UserNotFoundError";

export interface UserRepositoryInterface {
  create(user: UserEntity): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: string): Promise<UserEntity | UserNotFoundError>;
  remove(id: string): Promise<void>;
  update(user: UserEntity): Promise<void>;
}
