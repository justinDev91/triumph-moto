import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";

export const toDomainMotorcycle = (motorcycleOrm: Motorcycle): MotorcycleEntity | Error => {
   console.log("toDomainMotorcycle", toDomainMotorcycle)
    return MotorcycleEntity.create(
      motorcycleOrm.id,
      motorcycleOrm.brand,
      motorcycleOrm.model,
      motorcycleOrm.year,
      motorcycleOrm.mileage,
      motorcycleOrm.status,
      motorcycleOrm.purchaseDate,
      motorcycleOrm.lastServiceDate,
      motorcycleOrm.nextServiceMileage,
      motorcycleOrm.createdAt,
      motorcycleOrm.updatedAt,
    );
  };
  