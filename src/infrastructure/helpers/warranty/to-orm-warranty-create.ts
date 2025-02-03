import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { Warranty } from "@infrastructure/warranties/warranty.entity";
import { toOrmMotorcycle } from "../motorcycle/to-orm-motorcycle";

export const toOrmWarrantyCreate = (warranty: WarrantyEntity): Warranty => {

  const warrantyOrm = new Warranty();
  warrantyOrm.id = warranty.id;
  warrantyOrm.motorcycle = warrantyOrm.motorcycle ? toOrmMotorcycle(warranty.motorcycle) : null;
  warrantyOrm.startDate = warranty.startDate.value;
  warrantyOrm.endDate = warranty.endDate.value;
  warrantyOrm.coverageDetails = warranty.coverageDetails.value;
  warrantyOrm.isActive = warranty.isActive;

  return warrantyOrm;
};
