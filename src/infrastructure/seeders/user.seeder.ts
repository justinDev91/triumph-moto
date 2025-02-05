import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@infrastructure/users/user.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedUsers(count: number = 2): Promise<void> {
    const users: User[] = [];

    for (let i = 0; i < count; i++) {
      const user = this.userRepository.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "MyPassword1@",
      });

      users.push(user);
    }

    await this.userRepository.save(users);
    console.log(`${count} users have been created.`);
  }
}
