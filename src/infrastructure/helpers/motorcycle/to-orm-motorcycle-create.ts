import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { MotorStatusEnum } from "@infrastructure/types/MotorStatusEnum";
import { toOrmCompany } from "../company/to-orm-company";

export const toOrmMotorcycleCreate = (motorcycle: MotorcycleEntity): Motorcycle => {
    const motorcycleOrm = new Motorcycle();
    motorcycleOrm.id = motorcycle.id
    motorcycleOrm.brand = motorcycle.brand.value
    motorcycleOrm.model = motorcycle.model.value
    motorcycleOrm.year = motorcycle.year.value
    motorcycleOrm.mileage = motorcycle.mileage
    motorcycleOrm.status = motorcycle.status as MotorStatusEnum;
    motorcycleOrm.purchaseDate = motorcycle.purchaseDate;
    motorcycleOrm.lastServiceDate = motorcycle.lastServiceDate;
    motorcycleOrm.nextServiceMileage = motorcycle.nextServiceMileage;
    motorcycleOrm.company =  motorcycle.company ? toOrmCompany(motorcycle.company) : null
    return motorcycleOrm;
  };