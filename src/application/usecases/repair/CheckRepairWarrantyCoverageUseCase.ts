import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";

export class CheckRepairWarrantyCoverageUseCase {
    constructor(private readonly repairRepository: RepairRepositoryInterface) {}
  
    public async execute(repairId: string): Promise<boolean | Error> {
      const repair = await this.repairRepository.findById(repairId);
  
      if (repair instanceof Error) {
        return repair;
      }
  
      return repair.isRepairCoveredByWarranty();
    }
  }