import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { Repair } from "@infrastructure/repairs/repair.entity";
import { CommonRepairActionEnum } from "@infrastructure/types/CommonRepairActionEnum";
import { toOrmBreakdownCreate } from "../breakdown/to-orm-breakdown-create";

export const toOrmRepair = (repair: RepairEntity): Repair =>{
    const repairOrm = new Repair();
    repairOrm.repairDate = new Date(repair.repairDate.value);
    repairOrm.actions = repair.actions as CommonRepairActionEnum[];
    repairOrm.cost = repair.cost.value;
    repairOrm.breakdown = repair.breakdown ? toOrmBreakdownCreate(repair.breakdown): null
    return repairOrm;
}
  