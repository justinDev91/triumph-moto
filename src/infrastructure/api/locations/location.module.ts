import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationRepositoryImplem } from '@adapters/location.repository.implem';
import { MotorcycleModule } from '@api/motorcycles/motorcycle.module';
import { UsersModule } from '@api/users/users.module';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { User } from '@api/users/user.entity';

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
