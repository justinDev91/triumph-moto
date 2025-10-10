import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";

export class GetAllRepairsUsecase {
  constructor(
    private readonly repairRepository: RepairRepositoryInterface,
  ) {}

  public async execute(): Promise<RepairEntity[] | Error> {
    return await this.repairRepository.findAll();
  }
}
