import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";

export class CheckIncidentHistoryUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(driverId: string): Promise<boolean | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if(driver instanceof Error) return driver

    return driver.hasIncidentHistory();
  }
}
