import { UserEntity } from "@domain/entities/user/UserEntity";
import { User } from "@infrastructure/users/user.entity";

export const toOrmUser = (userEntity: UserEntity): User => {
    const userOrm = new User();
    userOrm.firstName = userEntity.firstName.value;
    userOrm.lastName = userEntity.lastName.value;
    userOrm.email = userEntity.email.value;
    userOrm.password = userEntity.password.value;
    userOrm.isActive = userEntity.isActive;
    // userOrm.createdAt = userEntity.createdAt;
    // userOrm.updatedAt = userEntity.updatedAt;
    // userOrm.administrator = userEntity.administrator;
    //companies
    //concessions
    //drivers
    return userOrm;
}