import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { UserEntity } from "@domain/entities/user/UserEntity";
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
    company: CompanyEntity | null = null,
    user: UserEntity | null = null
  ): Promise<void | Error> {
    const driver = DriverEntity.create(
      id,
      name,
      licenseType,
      license,
      yearsOfExperience,
      email,
      phone,
      company,
      user
    );

    if(driver instanceof Error) return driver

    await this.driverRepository.save(driver);
  }
}
