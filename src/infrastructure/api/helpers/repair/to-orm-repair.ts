import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { Repair } from "@api/repairs/repair.entity";
import { toOrmBreakdownCreate } from "@helpers/breakdown/to-orm-breakdown-create";
import { CommonRepairActionEnum } from "@api/types/CommonRepairActionEnum";

export const toOrmRepair = (repair: RepairEntity): Repair =>{
    const repairOrm = new Repair();
    repairOrm.repairDate = new Date(repair.repairDate.value);
    repairOrm.actions = repair.actions as CommonRepairActionEnum[];
    repairOrm.cost = repair.cost.value;
    repairOrm.breakdown = repair.breakdown ? toOrmBreakdownCreate(repair.breakdown): null
    return repairOrm;
}
  