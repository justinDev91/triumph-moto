import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { MaintenanceNotFoundError } from "@domain/errors/maintenance/MaintenanceNotFoundError";

export class CheckIfMaintenanceOverdueUsecase {
    constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}
  
    async execute(id: string): Promise<boolean | MaintenanceNotFoundError> {
      const maintenance = await this.maintenanceRepository.findById(id);
  
      if (maintenance instanceof MaintenanceNotFoundError) return maintenance;
  
      return maintenance.isMaintenanceOverdue();
    }
  }