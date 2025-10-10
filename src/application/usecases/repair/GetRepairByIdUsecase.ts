import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";

export class GetRepairByIdUsecase {
  constructor(private readonly repairRepository: RepairRepositoryInterface) {}

  async execute(id: string): Promise<RepairEntity | Error> {
    return await this.repairRepository.findById(id);
  }
}
