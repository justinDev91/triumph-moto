import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { LicenseType } from "@domain/types/motorcycle";

export class CreateDriverUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(
    id: string,
    name: string,
    licenseType: LicenseType,
    license: string,
    yearsOfExperience: number,
    email: string,
    phone: string,
  ): Promise<void | Error> {
    const driver = DriverEntity.create(
      id,
      name,
      licenseType,
      license,
      yearsOfExperience,
      email,
      phone,
    );

    if(driver instanceof Error) return driver

    await this.driverRepository.save(driver);
  }
}
