import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";

export class AssociateRepairWithMotorcycleUseCase {
    constructor(
      private readonly repairRepository: RepairRepositoryInterface,
      private readonly breakdownRepository: BreakdownRepositoryInterface
    ) {}
  
    public async execute(repairId: string): Promise<void | Error> {
      const repair = await this.repairRepository.findById(repairId);
  
      if (repair instanceof Error) {
        return repair;
      }
  
      repair.associateRepairWithMotorcycle();
      await this.repairRepository.save(repair);
    }
  }
  