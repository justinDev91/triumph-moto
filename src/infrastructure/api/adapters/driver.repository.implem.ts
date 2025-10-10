import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { DriverNotFoundError } from '@domain/errors/driver/DriverNotFoundError';
import { Driver } from '@api/drivers/driver.entity';
import { DriverRepositoryInterface } from '@application/repositories/DriverRepositoryInterface';
import { toOrmDriver } from '@helpers/driver/to-orm-driver';
import { User } from '@api/users/user.entity';
import { LicenseTypeEnum } from '@api/types/LicenseTypeEnum';
import { DrivingRecord, DrivingRecordType } from '@api/drivers/driver.record.entity';
import { Company } from '@api/companies/company.entity';
import { CompanyNotFoundError } from '@domain/errors/company/CompanyNotFoundError';
import { DriverAlreadyAssignedError } from '@domain/errors/driver/DriverAlreadyAssignedError';
import { toDomainDriver } from '@helpers/driver/to-domain-driver';

@Injectable()
export class DriverRepositoryImplem implements DriverRepositoryInterface {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(DrivingRecord)
    private readonly drivingRecordRepository: Repository<DrivingRecord>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

  ) {}
  
  async removeCompany(driverId: string): Promise<void | Error> {
    await this.driverRepository.update(driverId, {
      company: null,
      updatedAt: new Date(),
  });
  }

  async assignCompany(driverId: string, companyId: string): Promise<void | Error> {
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) return new CompanyNotFoundError();

    const driver = await this.driverRepository.findOne(
      { where: { id: driverId },
        relations: ["company"]
      }
    );

    if (!driver) return new DriverNotFoundError();

    if (driver?.company?.id === companyId) return new DriverAlreadyAssignedError();
    
    await this.driverRepository.update(driverId, {
        company,
        updatedAt: new Date(),
    });

  }

  async updateContactInfo(driverId: string, email: string, phone: string): Promise<void> {
    await this.driverRepository.update(driverId, {
      email,
      phone,
      updatedAt: new Date(),
    });

  }
  
  async addRecord(
    id: string,  
    date: Date, 
    motorcycleId: string, 
    type: string, 
    details: string
  ): Promise<void> {

    const driver = await this.driverRepository.findOne({
        where: { id },
        relations: ["drivingHistory"], 
    });

    if (!driver) throw new Error(`Driver with ID ${id} not found`);
    
    const motorcycle = await this.motorcycleRepository.findOne({
        where: { id: motorcycleId },
    });

    if (!motorcycle) throw new Error(`Motorcycle with ID ${motorcycleId} not found`);
    
    const driverRecordOrm = this.drivingRecordRepository.create({
        date: new Date(date),
        motorcycle,
        type: type as DrivingRecordType,
        details: details,
        driver, 
    });

    await this.drivingRecordRepository.save(driverRecordOrm);

    driver.drivingHistory = [...(driver.drivingHistory || []), driverRecordOrm];
    await this.driverRepository.save(driver);
  }

  async updateExperience(id: string, newYearsOfExperience: number): Promise<DriverEntity | Error> {
    await this.driverRepository.update(id, { yearsOfExperience: newYearsOfExperience });

    const updatedDriver = await this.driverRepository.findOne(
      { where: { id },
      relations: ["drivingHistory"], 
    });

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
      relations: ["user", "company", "drivingHistory"]
    });

    if (!foundDriver) return new DriverNotFoundError();
    
    return toDomainDriver(foundDriver);
  }

  async findAllByUser(userId: string): Promise<DriverEntity[] | DriverNotFoundError> {
    const drivers = await this.driverRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "company", "drivingHistory"]
    });
  
    if (!drivers.length) return new DriverNotFoundError();
    
    return drivers.map((driver) => toDomainDriver(driver));
  }

  async delete(id: string): Promise<void> {
    await this.driverRepository.delete({ id });
  }

  async findAll(): Promise<DriverEntity[]> {
    const allDrivers = await this.driverRepository.find(
      {relations: ["user", "company", "drivingHistory"]}
    );
    return allDrivers.map((driver) => toDomainDriver(driver));
  }

}
