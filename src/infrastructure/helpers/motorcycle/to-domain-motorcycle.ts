import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { toDomainCompany } from "../company/to-domain-company";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";

export const toDomainMotorcycle = (motorcycleOrm: Motorcycle): MotorcycleEntity | Error => {
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
      motorcycleOrm.company ? toDomainCompany(motorcycleOrm.company) as CompanyEntity: null
    );
  };
  