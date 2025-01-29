import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";
import { MaintenanceType } from "@domain/types/MaintenanceType";

export class UpdateMaintenanceUseCase {
  constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}

  public async execute(
    id: string,
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number
  ): Promise<void | Error> {
    try {
      const maintenanceOrm = await this.maintenanceRepository.findById(id);

      if (maintenanceOrm instanceof Error) return maintenanceOrm;
      

      maintenanceOrm.updateDetails(maintenanceType, date, cost);

      return await this.maintenanceRepository.update(maintenanceOrm);
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
