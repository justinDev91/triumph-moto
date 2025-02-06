import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concession } from '@api/concessions/concession.entity';
import { User } from '@api/users/user.entity';
import { Company } from '@api/companies/company.entity';
import { faker } from '@faker-js/faker';
import { Name } from '@domain/values/company/Name';

@Injectable()
export class ConcessionSeeder {
  constructor(
    @InjectRepository(Concession)
    private readonly concessionRepository: Repository<Concession>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async seedConcessions(count: number = 10): Promise<void> {
    const users = await this.userRepository.find();
    const companies = await this.companyRepository.find();

    if (users.length === 0 || companies.length === 0) {
      console.log('No users or companies found in the database!');
      return;
    }

    const concessions: Concession[] = [];

    for (let i = 0; i < count; i++) {
      const user = faker.helpers.arrayElement(users);
      const company = faker.helpers.arrayElement(companies);

      const nameValue = faker.company.name();
      const nameOrError = Name.from(nameValue);
      if (nameOrError instanceof Error) {
        console.error(`Invalid concession name: ${nameValue}`);
        continue;
      }

      const concession = this.concessionRepository.create({
        user,
        company,
        name: nameOrError.value,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });

      concessions.push(concession);
    }

    await this.concessionRepository.save(concessions);
    console.log(`${concessions.length} concessions have been created.`);
  }
}
