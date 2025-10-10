import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '@api/companies/company.entity';
import { User } from '@api/users/user.entity';
import { Driver } from '@api/drivers/driver.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Concession } from '@api/concessions/concession.entity';
import { faker } from '@faker-js/faker';
import { Name } from '@domain/values/company/Name';

@Injectable()
export class CompanySeeder {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(Concession)
    private readonly concessionRepository: Repository<Concession>,
  ) {}

  async seedCompanies(count: number = 10): Promise<void> {
    const users = await this.userRepository.find();
    // const drivers = await this.driverRepository.find();
    // const motorcycles = await this.motorcycleRepository.find();
    // const concessions = await this.concessionRepository.find();

    if (users.length === 0) {
      console.log('No users, drivers, motorcycles or concessions found in the database!');
      return;
    }

    const companies: Company[] = [];

    for (let i = 0; i < count; i++) {
      const user = faker.helpers.arrayElement(users);
      // const companyDrivers = faker.helpers.shuffle(drivers);
      // const companyMotorcycles = faker.helpers.shuffle(motorcycles);
      // const companyConcessions = faker.helpers.shuffle(concessions);

      const nameValue = faker.company.name();
      const nameOrError = Name.from(nameValue);
      if (nameOrError instanceof Error) {
        console.error(`Invalid company name: ${nameValue}`);
        continue;
      }

      const company = this.companyRepository.create({
        user,
        name: nameOrError.value,
        // drivers: companyDrivers,
        // motorcycles: companyMotorcycles,
        // concessions: companyConcessions,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });

      companies.push(company);
    }

    await this.companyRepository.save(companies);
    console.log(`${companies.length} companies have been created.`);
  }
}
