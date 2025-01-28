import { UserEntity } from "@domain/entities/user/UserEntity";
import { UserDto } from "./response-user.dto";

export const toUserDto = (user: UserEntity): UserDto => ({
    firstName: user.firstName.value,
    lastName: user.lastName.value,
    email: user.email.value,
    isActive: user.isActive,
    administrator: user.administrator,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });