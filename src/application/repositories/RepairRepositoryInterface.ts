import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { CommonRepairAction } from "@domain/types/motorcycle";

export interface RepairRepositoryInterface {
    save(repair: RepairEntity): Promise<void>;
    findById(id: string): Promise<RepairEntity | Error>;
    findByBreakdownId(breakdownId: string): Promise<RepairEntity[] | Error>;
    deleteById(id: string): Promise<void>;
    update(repair: RepairEntity): Promise<void>;
    findAll(): Promise<RepairEntity[] | Error>;
    updateActions(repairId: string, newActions: CommonRepairAction[]): Promise<void | Error>;
  }
  