import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { CommonRepairAction } from "@domain/types/motorcycle";

export class UpdateRepairActionsUseCase {
    constructor(private readonly repairRepository: RepairRepositoryInterface) {}
  
    public async execute(
      repairId: string,
      newActions: CommonRepairAction[]
    ): Promise<void | Error> {
      const repair = await this.repairRepository.findById(repairId);

      if (repair instanceof Error) {
        return repair;
      }
  
      repair.updateActions(newActions);

      return await this.repairRepository.updateActions(repairId, newActions ); 
  }
}