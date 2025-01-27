import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { DriverNotFoundError } from '@domain/errors/driver/DriverNotFoundError';
import { Driver } from '@infrastructure/drivers/driver.entity';
import { LicenseType } from '@domain/types/motorcycle';
import { DriverRepositoryInterface } from '@application/repositories/DriverRepositoryInterface';

@Injectable()
export class DriverRepositoryImplem implements DriverRepositoryInterface {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}
  findAllByUser(id: string): Promise<DriverEntity[] | DriverNotFoundError> {
    throw new Error('Method not implemented.');
  }

  async save(driver: DriverEntity): Promise<void> {
    const driverToSave = this.toOrmEntity(driver);
    await this.driverRepository.save(driverToSave);
  }

  async findOneById(id: string): Promise<DriverEntity | DriverNotFoundError> {
    const foundDriver = await this.driverRepository.findOne({ where: { id } });

    if (!foundDriver) return new DriverNotFoundError();
    
    return this.toDomain(foundDriver);
  }

  // async findAllByUser(userId: string): Promise<DriverEntity[] | DriverNotFoundError> {
  //   const drivers = await this.driverRepository.find({ where: { userId } });

  //   if (drivers.length) return new DriverNotFoundError();
    
  //   return drivers.map((driver) => this.toDomain(driver));
  // }

  async delete(id: string): Promise<void> {
    await this.driverRepository.delete({ id });
  }

  async all(): Promise<DriverEntity[]> {
    const allDrivers = await this.driverRepository.find();
    return allDrivers.map((driver) => this.toDomain(driver));
  }

  private toOrmEntity(domainDriver: DriverEntity): Driver {
    return {
      id: domainDriver.id,
      name: domainDriver.name.value,
      license: domainDriver.license.value,
      licenseType: domainDriver.licenseType,
      yearsOfExperience: domainDriver.yearsOfExperience.value,
      email: domainDriver.email.value,
      phone: domainDriver.phone.value,
    } as Driver;
  }

  private toDomain(persistenceDriver: Driver): DriverEntity {
    return DriverEntity.create(
      persistenceDriver.id,
      persistenceDriver.name,
      persistenceDriver.licenseType as LicenseType,
      persistenceDriver.license,
      persistenceDriver.yearsOfExperience,
      persistenceDriver.email,
      persistenceDriver.phone,
    ) as DriverEntity;
  }
}
