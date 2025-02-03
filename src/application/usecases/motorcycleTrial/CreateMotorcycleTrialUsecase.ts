import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";
import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";
import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";
import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";

export class CreateMotorcycleTrialUsecase {
  constructor(
    private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryInterface,
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly driverRepository: DriverRepositoryInterface
  ) {}

  public async execute(
    motorcycleId: string,
    driverId: string,
    startDate: Date,
    endDate: Date
  ): Promise<void | Error> {

      const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
      if (motorcycle instanceof Error) return motorcycle; 

      const driver = await this.driverRepository.findOneById(driverId);
      if (driver instanceof Error) return driver

      const validStartDate = startDate instanceof Date ? startDate : new Date(startDate);
      const validEndDate = endDate instanceof Date ? endDate : new Date(endDate);

      const motorcycleTrial = MotorcycleTrialEntity.create(null, motorcycle, driver, validStartDate, validEndDate);
      if (motorcycleTrial instanceof Error) return motorcycleTrial;

      await this.motorcycleTrialRepository.save(motorcycleTrial);
    
  }
}
