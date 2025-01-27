import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MaintenanceNotFoundError } from "@domain/errors/maintenance/MaintenanceNotFoundError";

export class UpdateMaintenanceConcessionUsecase {
    constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}
  
    async execute(
      maintenanceId: string,
      concession: ConcessionEntity
    ): Promise<MaintenanceEntity | MaintenanceNotFoundError> {
      const maintenance = await this.maintenanceRepository.findById(maintenanceId);
  
      if (maintenance instanceof MaintenanceNotFoundError) return maintenance;
  
      maintenance.updateConcession(concession);
      await this.maintenanceRepository.save(maintenance);
  
      return maintenance;
    }
  }