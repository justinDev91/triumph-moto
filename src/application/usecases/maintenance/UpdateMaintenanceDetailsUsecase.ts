import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MaintenanceNotFoundError } from "@domain/errors/maintenance/MaintenanceNotFoundError";
import { MaintenanceType } from "@domain/types/MaintenanceType";

export class UpdateMaintenanceDetailsUsecase {
    constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}
  
    async execute(
      id: string,
      maintenanceType: MaintenanceType,
      date: Date,
      cost: number
    ): Promise<MaintenanceEntity | MaintenanceNotFoundError> {
      const maintenance = await this.maintenanceRepository.findById(id);
  
      if (maintenance instanceof MaintenanceNotFoundError) return maintenance;
  
      maintenance.updateDetails(maintenanceType, date, cost);
      await this.maintenanceRepository.save(maintenance);
  
      return maintenance;
    }
  }