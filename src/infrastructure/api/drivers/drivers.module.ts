import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverRepositoryImplem } from '@adapters/driver.repository.implem';
import { CompanyModule } from '@api/companies/company.module';
import { User } from '@api/users/user.entity';
import { DrivingRecord } from './driver.record.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Company } from '@api/companies/company.entity';

@Module({
  controllers: [DriversController],
  imports: [
    TypeOrmModule.forFeature([Driver, User, DrivingRecord, Motorcycle, Company]),
    CompanyModule
  ],
  providers: [DriverRepositoryImplem, DriversService],
  exports: [DriversService, DriverRepositoryImplem],
})
export class DriversModule {}
