import { toDomainDriver } from '../helpers/driver/to-domain-driver';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { DriverNotFoundError } from '@domain/errors/driver/DriverNotFoundError';
import { Driver } from '@infrastructure/drivers/driver.entity';
import { DriverRepositoryInterface } from '@application/repositories/DriverRepositoryInterface';
import { toOrmDriver } from '@infrastructure/helpers/driver/to-orm-driver';
import { User } from '@infrastructure/users/user.entity';
import { LicenseTypeEnum } from '@infrastructure/types/LicenseTypeEnum';

@Injectable()
export class DriverRepositoryImplem implements DriverRepositoryInterface {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateExperience(id: string, newYearsOfExperience: number): Promise<DriverEntity | Error> {
    await this.driverRepository.update(id, { yearsOfExperience: newYearsOfExperience });

    const updatedDriver = await this.driverRepository.findOne({ where: { id } });

    if (!updatedDriver) return new DriverNotFoundError();
    
    return toDomainDriver(updatedDriver);
  }

  async update(driver: DriverEntity): Promise<DriverEntity | Error> {
    const ormDriver = {
      id: driver.id,
      name: driver.name.value,
      license: driver.license.value,
      licenseType: driver.licenseType as LicenseTypeEnum,
      yearsOfExperience: driver.yearsOfExperience.value,
      email: driver.email.value,
      phone: driver.phone.value,
      createdAt: driver.createdAt,
      updatedAt: driver.updatedAt,
      user: driver.user ? {
        id: driver.user.id, 
        firstName: driver.user.firstName.value,
        lastName: driver.user.lastName.value,
        email: driver.user.email.value,
      } : null,
      company: driver.company ? {
        id: driver.company.id, 
        name: driver.company.name.value,
      } : null
    };
  
    const existingDriver = await this.driverRepository.findOne({
      where: { id: driver.id },
      relations: ["user", "company"], 
    });
  
    if (!existingDriver) return new DriverNotFoundError();
  
    if (driver.user?.id) {
      ormDriver.user.id = driver.user.id;
    }
  
    if (driver.user) {
      const existingUser = await this.userRepository.findOne({
        where: { id: driver.user.id },
        relations: ["drivers"],
      });
  
      if (existingUser) {  
        existingUser.drivers = [...existingUser.drivers, existingDriver];
        await this.userRepository.save(existingUser); 
      }
    }
  
    const driverToUpdate = {
      ...existingDriver,
      ...ormDriver, 
    };
  
    const updatedDriver = await this.driverRepository.save(driverToUpdate);
    
    return toDomainDriver(updatedDriver);
  }
  
  
  async create(driver: DriverEntity): Promise<DriverEntity | Error> {
    const driverToSave = toOrmDriver(driver);
    
    const savedDriver = await this.driverRepository.save(driverToSave);
    
    return toDomainDriver(savedDriver);
  }

  async save(driver: DriverEntity): Promise<void> {
    const driverToSave = toOrmDriver(driver);

    await this.driverRepository.save(driverToSave);
  }

  async findOneById(id: string): Promise<DriverEntity | DriverNotFoundError> {
    const foundDriver = await this.driverRepository.findOne({ 
      where: { id },
      relations: ["user", "company"]
    });

    if (!foundDriver) return new DriverNotFoundError();
    
    return toDomainDriver(foundDriver);
  }

  async findAllByUser(userId: string): Promise<DriverEntity[] | DriverNotFoundError> {
    const drivers = await this.driverRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "company"]
    });
  
    if (!drivers.length) return new DriverNotFoundError();
    
    return drivers.map((driver) => toDomainDriver(driver));
  }

  async delete(id: string): Promise<void> {
    await this.driverRepository.delete({ id });
  }

  async findAll(): Promise<DriverEntity[]> {
    const allDrivers = await this.driverRepository.find(
      {relations: ["user", "company"]}
    );
    return allDrivers.map((driver) => toDomainDriver(driver));
  }

}
