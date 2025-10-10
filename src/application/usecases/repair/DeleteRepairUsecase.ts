import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";

export class DeleteRepairUsecase {
  constructor(private readonly repairRepository: RepairRepositoryInterface) {}

  async execute(id: string): Promise<void | Error> {
    const repair = await this.repairRepository.findById(id);

    if (repair instanceof Error) return repair 
    
    await this.repairRepository.deleteById(id);
  }
}
