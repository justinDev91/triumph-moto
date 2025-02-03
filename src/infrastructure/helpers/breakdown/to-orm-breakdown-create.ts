import { Breakdown } from "@infrastructure/breakdowns/breakdown.entity";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";
import { toOrmMotorcycleCreate } from "../motorcycle/to-orm-motorcycle-create";
import { toOrmWarrantyCreate } from "../warranty/to-orm-warranty-create";

export const toOrmBreakdownCreate = (breakdownEntity: BreakdownEntity): Breakdown => {

  const breakdownOrm = new Breakdown();
  breakdownOrm.id = breakdownEntity.id;
  breakdownOrm.motorcycle = toOrmMotorcycleCreate(breakdownEntity.motorcycle);
  breakdownOrm.description = breakdownEntity.description.value;
  breakdownOrm.reportedDate = breakdownEntity.reportedDate.value;
  breakdownOrm.warranty = breakdownEntity.warranty 
    ? toOrmWarrantyCreate(breakdownEntity.warranty) 
    : null;

  return breakdownOrm;
};
