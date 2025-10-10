import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MaintenanceNotFoundError } from "@domain/errors/maintenance/MaintenanceNotFoundError";

export class FindMaintenanceByMotorcycleIdUsecase {
    constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}
  
    async execute(motorcycleId: string): Promise<MaintenanceEntity[] | MaintenanceNotFoundError> {
      return this.maintenanceRepository.findByMotorcycleId(motorcycleId);
    }
  }
  