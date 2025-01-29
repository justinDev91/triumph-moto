import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";

export class CreateMotorcycleTrialUsecase {
  constructor(private readonly motorcycleTryRepository: MotorcycleTrialRepositoryInterface) {}

  public async execute(
    id: string,
    motorcycle: MotorcycleEntity,
    driver: DriverEntity,
    startDate: Date,
    endDateDate: Date,
  ): Promise<void | Error> {
    const motorcycleTry = MotorcycleTrialEntity.create(id, motorcycle, driver, startDate, endDateDate);

    if(motorcycleTry instanceof Error) return motorcycleTry

    await this.motorcycleTryRepository.save(motorcycleTry);
  }
}
