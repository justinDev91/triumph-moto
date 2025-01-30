import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { Repair } from "@infrastructure/repairs/repair.entity";
import { CommonRepairActionEnum } from "@infrastructure/types/CommonRepairActionEnum";

export const toOrmRepair = (repair: RepairEntity): Repair =>{
    const repairOrm = new Repair();
    repairOrm.id = repair.id;
    repairOrm.repairDate = repair.repairDate.value;
    repairOrm.actions = repair.actions.map(action => CommonRepairActionEnum[action]);
    repairOrm.cost = repair.cost.value;
  
    return repairOrm;
}
  