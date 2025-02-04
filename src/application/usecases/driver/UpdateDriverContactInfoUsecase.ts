import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";

export class UpdateDriverContactInfoUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(
    driverId: string,
    newEmail: string,
    newPhone: string,
  ): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if(driver instanceof Error) return driver

    driver.updateContactInfo({ email: newEmail, phone: newPhone });
    return await this.driverRepository.updateContactInfo(driverId, newEmail, newPhone);
  }
}
