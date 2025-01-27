import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MaintenanceNotFoundError } from "@domain/errors/maintenance/MaintenanceNotFoundError";

export class MarkMaintenanceAsCompletedUsecase {
    constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}
  
    async execute(id: string): Promise<MaintenanceEntity | MaintenanceNotFoundError> {
      const maintenance = await this.maintenanceRepository.findById(id);
  
      if (maintenance instanceof MaintenanceNotFoundError) return maintenance;
  
      maintenance.isMaintenanceCompleted()
  
      await this.maintenanceRepository.save(maintenance);
      return maintenance;
    }
  }
  