import { UserEntity } from "@domain/entities/user/UserEntity";
import { User } from "@infrastructure/users/user.entity";

export const toDomainUser = (user: User): UserEntity | Error  => {
    console.log("user...", user)
    const userEntity = UserEntity.create(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.createdAt,
      user.administrator,
      user.updatedAt,
      user.isActive,
    );
  
    return userEntity;
}