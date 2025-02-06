import { Injectable } from '@nestjs/common';
import { DriverRepositoryImplem } from '@adapters/driver.repository.implem';
import { DriverNotFoundError } from '@domain/errors/driver/DriverNotFoundError';
import { DriverRepositoryInterface } from '@application/repositories/DriverRepositoryInterface';

@Injectable()
export class RemoveDriverFromCompanyUseCase {
  constructor(
    private readonly driverRepository: DriverRepositoryInterface, 
  ) {}

  async execute(driverId: string): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if (driver instanceof Error) return new DriverNotFoundError();
    
    driver.removeFromCompany();

    return await this.driverRepository.removeCompany(driverId)
  }
}
