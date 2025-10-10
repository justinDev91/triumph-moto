import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";

export class FindOverdueMaintenanceUsecase {
    constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}
  
    async execute(): Promise<MaintenanceEntity[]> {
      return this.maintenanceRepository.findOverdue();
    }
  }