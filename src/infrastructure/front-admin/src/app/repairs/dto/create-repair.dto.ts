import { CommonRepairActionEnum } from "../../shared/models/repair.model";

export interface CreateRepairDto {
  breakdownId: string;
  repairDate: string;
  actions: CommonRepairActionEnum[];
  cost: number;
}
