import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { Warranty } from "@infrastructure/warranties/warranty.entity";
import { toOrmMotorcycle } from "../motorcycle/to-orm-motorcycle";

export const toOrmWarranty = (warranty: WarrantyEntity): Warranty => {

  const ormWwarrantyMotorcycle = toOrmMotorcycle(warranty.motorcycle)

  const warrantyOrm = new Warranty();
  warrantyOrm.motorcycle = ormWwarrantyMotorcycle;
  warrantyOrm.startDate = warranty.startDate.value;
  warrantyOrm.endDate = warranty.endDate.value;
  warrantyOrm.coverageDetails = warranty.coverageDetails.value;
  warrantyOrm.isActive = warranty.isActive;

  return warrantyOrm;
};
