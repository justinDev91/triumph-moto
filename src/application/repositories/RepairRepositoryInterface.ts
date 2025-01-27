import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { RepairNotFoundError } from "@domain/errors/repair/RepairNotFoundError";

export interface RepairRepositoryInterface {
    save(repair: RepairEntity): Promise<void>;
    findById(id: string): Promise<RepairEntity | RepairNotFoundError>;
    findByBreakdownId(breakdownId: string): Promise<RepairEntity[] | RepairNotFoundError>;
    deleteById(id: string): Promise<void>;
    update(repair: RepairEntity): Promise<void>;
  }
  