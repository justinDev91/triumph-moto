import { UserEntity } from "@domain/entities/user/UserEntity";
import { User } from "@infrastructure/users/user.entity";

export const toDomainUser = (userOrm: User): UserEntity | Error  => {
   console.log("toDomain-userOrm id", userOrm.id)
    const userEntity = UserEntity.create(
      userOrm.id,
      userOrm.firstName,
      userOrm.lastName,
      userOrm.email,
      userOrm.password,
      userOrm.createdAt,
      userOrm.administrator,
      userOrm.updatedAt,
      userOrm.isActive
    );
  
    return userEntity;
}