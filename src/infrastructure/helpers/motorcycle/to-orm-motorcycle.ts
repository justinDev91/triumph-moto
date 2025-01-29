import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { MotorStatusEnum } from "@infrastructure/types/MotorStatusEnum";

export const toOrmMotorcycle = (motorcycle: MotorcycleEntity): Motorcycle => {
  console.log("motorcycleOrm...",  motorcycle.brand)
    const motorcycleOrm = new Motorcycle();
    motorcycleOrm.brand = motorcycle.brand as unknown as string;
    motorcycleOrm.model = motorcycle.model as unknown as string;
    motorcycleOrm.year = motorcycle.year as unknown as number;
    motorcycleOrm.mileage = motorcycle.mileage;
    motorcycleOrm.status = motorcycle.status as MotorStatusEnum;
    motorcycleOrm.purchaseDate = motorcycle.purchaseDate;
    motorcycleOrm.lastServiceDate = motorcycle.lastServiceDate;
    motorcycleOrm.nextServiceMileage = motorcycle.nextServiceMileage;
    return motorcycleOrm;
  };