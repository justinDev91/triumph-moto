import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";
import { DrivingRecord } from "@domain/types/motorcycle";

export class AddDrivingRecordUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(id: string, record: DrivingRecord): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(id);

    if(driver instanceof Error) return driver

    driver.addDrivingRecord(record);
    
    await this.driverRepository.save(driver);
  }
}
