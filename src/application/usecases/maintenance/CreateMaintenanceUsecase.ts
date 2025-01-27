import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";
import { MaintenanceType } from "@domain/types/MaintenanceType";

export class CreateMaintenanceUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}

  async execute(
    id: string,
    motorcycle: MotorcycleEntity,
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number,
    mileageAtService: number,
    maintenanceIntervalMileage: number,
    maintenanceIntervalTime: number,
    concession: ConcessionEntity | null
  ): Promise<MaintenanceEntity | Error> {
    const maintenance = MaintenanceEntity.create(
      id,
      motorcycle,
      maintenanceType,
      date,
      cost,
      mileageAtService,
      maintenanceIntervalMileage,
      maintenanceIntervalTime,
      concession
    );

    if (maintenance instanceof Error) {
      return maintenance;
    }

    try {
      await this.maintenanceRepository.save(maintenance);
    } catch (error) {
      return new UnexpectedError(`Failed to save maintenance: ${error instanceof Error ? error.message : "Unknown error"}`);
    }

    return maintenance;
  }
}
