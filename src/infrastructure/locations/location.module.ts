import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationRepositoryImplem } from '@infrastructure/adapters/location.repository.implem';
import { MotorcycleModule } from '@infrastructure/motorcycles/motorcycle.module';
import { UsersModule } from '@infrastructure/users/users.module';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { User } from '@infrastructure/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Location, 
      Motorcycle, 
      User
    ]),
    MotorcycleModule,
    UsersModule
  ],
  controllers: [LocationController],
  providers: [
    LocationService,
    LocationRepositoryImplem
  ],
  exports: [
    LocationService,
    LocationRepositoryImplem
  ]
})
export class LocationModule {}
