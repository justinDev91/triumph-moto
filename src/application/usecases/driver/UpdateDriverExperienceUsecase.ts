import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";

export class UpdateDriverExperienceUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(driverId: string, newYearsOfExperience: number): Promise<DriverEntity | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if(driver instanceof Error) return driver
    
    driver.updateExperience(newYearsOfExperience);
      
    return await this.driverRepository.updateExperience(driverId, newYearsOfExperience);
  }
}
