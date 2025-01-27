import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MaintenanceNotFoundError } from "@domain/errors/maintenance/MaintenanceNotFoundError";

export class FindMaintenanceByConcessionIdUsecase {
    constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}
  
    async execute(concessionId: string): Promise<MaintenanceEntity[] | MaintenanceNotFoundError> {
      return this.maintenanceRepository.findByConcessionId(concessionId);
    }
  }