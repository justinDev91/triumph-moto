import { Injectable } from '@nestjs/common';
import { DriverRepositoryImplem } from '@infrastructure/adapters/driver.repository.implem';
import { DriverNotFoundError } from '@domain/errors/driver/DriverNotFoundError';

@Injectable()
export class RemoveDriverFromCompanyUseCase {
  constructor(
    private readonly driverRepository: DriverRepositoryImplem, 
  ) {}

  async execute(driverId: string): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if (driver instanceof Error) return new DriverNotFoundError();
    
    driver.removeFromCompany();
  }
}
