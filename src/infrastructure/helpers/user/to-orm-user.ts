import { UserEntity } from "@domain/entities/user/UserEntity";
import { User } from "@infrastructure/users/user.entity";
import { toOrmDriver } from "../driver/to-orm-driver";

export const toOrmUser = (user: UserEntity): User => {
    const ormDrivers = user.getDrivers ? user?.getDrivers()?.map(toOrmDriver) : null;

    const userOrm = new User();
    userOrm.firstName = user.firstName.value;
    userOrm.lastName = user.lastName.value;
    userOrm.email = user.email.value;
    userOrm.password = user.password.value;
    userOrm.isActive = user.isActive;
    userOrm.drivers = ormDrivers;

    return userOrm;
};