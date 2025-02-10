import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '@api/drivers/driver.entity';
import { Company } from '@api/companies/company.entity';
import { User } from '@api/users/user.entity';
import { LicenseTypeEnum } from '@api/types/LicenseTypeEnum';
import { faker } from '@faker-js/faker';

@Injectable()
export class DriverSeeder {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedDrivers(count: number = 5): Promise<void> {
    const drivers: Driver[] = [];

    const users = await this.userRepository
      .createQueryBuilder()
      .limit(3)
      .getMany();

    for (let i = 0; i < count; i++) {
      const driver = this.driverRepository.create({
        name: faker.person.fullName(),
        license: faker.string.alphanumeric(10).toUpperCase(),
        licenseType: faker.helpers.arrayElement(Object.values(LicenseTypeEnum)),
        yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        user: faker.helpers.arrayElement(users),
      });

      drivers.push(driver);
    }

    await this.driverRepository.save(drivers);
    console.log(`${count} drivers have been created.`);
  }
}
