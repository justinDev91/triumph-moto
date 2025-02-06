import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { Repair } from "@api/repairs/repair.entity";
import { CommonRepairAction } from "@domain/types/motorcycle";
import { toDomainBreakdown } from "../breakdown/to-domain-breakdown";

export const toDomainRepair = (repairOrm: Repair): RepairEntity | Error => {

  const actions: CommonRepairAction[] = repairOrm.actions; 

  const repairEntity = RepairEntity.create(
    repairOrm.id,
    repairOrm.breakdown ? toDomainBreakdown(repairOrm.breakdown) : null, 
    repairOrm.repairDate,
    actions,
    repairOrm.cost
  );

  return repairEntity;
};
