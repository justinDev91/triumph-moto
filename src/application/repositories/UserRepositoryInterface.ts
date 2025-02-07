import { UserEntity } from "@domain/entities/user/UserEntity";

export interface UserRepositoryInterface {
  create(user: UserEntity): Promise<UserEntity | Error>;
  findAll(): Promise<UserEntity[] | Error>;
  findOne(id: string): Promise<UserEntity | Error>;
  findOneByEmail(email: string): Promise<UserEntity | Error>;
  remove(id: string): Promise<void>;
  update(user: UserEntity): Promise<void>;
  findByFirstOrLastName(query: string): Promise<UserEntity[]>;
  findByStatus(isActive: boolean): Promise<UserEntity[]>;
  toggleStatus(id: string, user: UserEntity): Promise<void>;
}
