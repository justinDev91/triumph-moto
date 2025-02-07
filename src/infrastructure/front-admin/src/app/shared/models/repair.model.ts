import { Breakdown } from "./breakdown.model";

export enum CommonRepairActionEnum {
  EngineFix = 'EngineFix',
  TireReplacement = 'TireReplacement',
  OilChange = 'OilChange',
}

export interface Repair {
  id: string;
  breakdown: Breakdown;
  repairDate: Date;
  actions: CommonRepairActionEnum[];
  cost: number;
}
