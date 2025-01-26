import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";

export class UpdateDriverExperienceUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(driverId: string, newYearsOfExperience: number): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if(driver instanceof Error) return driver
    
    driver.updateExperience(newYearsOfExperience);
      
    await this.driverRepository.save(driver);
  }
}
