import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { Repair } from "@infrastructure/repairs/repair.entity";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";
import { CommonRepairAction } from "@domain/types/motorcycle";

export const toDomainRepair = (repairOrm: Repair, breakdownEntity: BreakdownEntity | null = null): RepairEntity | Error => {

  const actions: CommonRepairAction[] = repairOrm.actions; 

  const repairEntity = RepairEntity.create(
    repairOrm.id,
    breakdownEntity || null, 
    repairOrm.repairDate,
    actions,
    repairOrm.cost
  );

  return repairEntity;
};
