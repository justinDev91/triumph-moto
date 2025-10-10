import { UserEntity } from "@domain/entities/user/UserEntity";
import { ResponseUserDto } from "./response-user.dto";

export const toResponseUserDto = (user: UserEntity): ResponseUserDto => ({
  id: user.id,
  firstName: user.firstName?.value,
  lastName: user.lastName?.value,
  email: user.email?.value,
  password: user.password?.value,
  isActive: user.isActive,
  administrator: user.administrator,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
