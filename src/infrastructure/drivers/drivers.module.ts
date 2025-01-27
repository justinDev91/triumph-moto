import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverRepositoryImplem } from '@infrastructure/adapters/driver.repository.implem';

@Module({
  controllers: [DriversController],
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriverRepositoryImplem, DriversService],
  exports: [DriversService, DriverRepositoryImplem],
})
export class DriversModule {}
