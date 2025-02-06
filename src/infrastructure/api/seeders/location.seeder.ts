import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '@api/locations/location.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { User } from '@api/users/user.entity';
import { LocationStatusEnum } from '@api/types/LocationStatusEnum';
import { faker } from '@faker-js/faker';

@Injectable()
export class LocationSeeder {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedLocations(count: number = 10): Promise<void> {
    const motorcycles = await this.motorcycleRepository.find({ take: 20 });
    const users = await this.userRepository.find({ take: 20 });
    const locationStatusValues = [
      LocationStatusEnum.IN_PROGRESS,
      LocationStatusEnum.COMPLETED,
      LocationStatusEnum.CANCELED,
    ];

    if (motorcycles.length === 0 || users.length === 0) {
      console.log('No motorcycles or users found in the database!');
      return;
    }

    const locations: Location[] = [];

    for (let i = 0; i < count; i++) {
      const motorcycle = motorcycles[i % motorcycles.length];
      const user = users[i % users.length];
      const status = faker.helpers.arrayElement(locationStatusValues);

      const startDate = faker.date.future();
      const endDate = new Date(startDate.getTime() + 200 * 24 * 60 * 60 * 1000); 

      const location = this.locationRepository.create({
        motorcycle,
        user,
        startDate,
        endDate,
        status,
        cost: parseFloat(faker.finance.amount({min: 100, max: 2000})),
      });

      locations.push(location);
    }

    await this.locationRepository.save(locations);
    console.log(`${locations.length} locations have been created.`);
  }
}
