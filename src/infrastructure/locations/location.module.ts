import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationRepositoryImplem } from '@infrastructure/adapters/location.repository.implem';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
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
