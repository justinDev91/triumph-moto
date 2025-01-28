import { toDomainDriver } from './../helpers/to-domain-driver';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { DriverNotFoundError } from '@domain/errors/driver/DriverNotFoundError';
import { Driver } from '@infrastructure/drivers/driver.entity';
import { DriverRepositoryInterface } from '@application/repositories/DriverRepositoryInterface';
import { toOrmDriver } from '@infrastructure/helpers/to-orm-driver';

@Injectable()
export class DriverRepositoryImplem implements DriverRepositoryInterface {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async save(driver: DriverEntity): Promise<void> {
    const driverToSave = toOrmDriver(driver);
    await this.driverRepository.save(driverToSave);
  }

  async findOneById(id: string): Promise<DriverEntity | DriverNotFoundError> {
    const foundDriver = await this.driverRepository.findOne({ where: { id } });

    if (!foundDriver) return new DriverNotFoundError();
    
    return toDomainDriver(foundDriver);
  }

  async findAllByUser(userId: string): Promise<DriverEntity[] | DriverNotFoundError> {
    const drivers = await this.driverRepository.find({
      where: { user: { id: userId } },
    });
  
    if (!drivers.length) return new DriverNotFoundError();
    
    return drivers.map((driver) => toDomainDriver(driver));
  }

  async delete(id: string): Promise<void> {
    await this.driverRepository.delete({ id });
  }

  async all(): Promise<DriverEntity[]> {
    const allDrivers = await this.driverRepository.find();
    return allDrivers.map((driver) => toDomainDriver(driver));
  }

}
