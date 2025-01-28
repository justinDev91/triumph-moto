import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverRepositoryImplem } from '@infrastructure/adapters/driver.repository.implem';
import { CompanyModule } from '@infrastructure/companies/company.module';

@Module({
  controllers: [DriversController],
  imports: [
    TypeOrmModule.forFeature([Driver]),
    CompanyModule
  ],
  providers: [DriverRepositoryImplem, DriversService],
  exports: [DriversService, DriverRepositoryImplem],
})
export class DriversModule {}
