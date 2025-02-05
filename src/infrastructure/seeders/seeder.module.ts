import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeeder } from '@infrastructure/seeders/user.seeder';
import { DriverSeeder } from '@infrastructure/seeders/driver.seeder';
import { User } from '@infrastructure/users/user.entity';
import { Driver } from '@infrastructure/drivers/driver.entity';
import { Company } from '@infrastructure/companies/company.entity';
import { WarrantySeeder } from './warranty.seeder';
import { Warranty } from '@infrastructure/warranties/warranty.entity';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { SparePart } from '@infrastructure/spare-parts/spare-part.entity';
import { SparePartSeeder } from './spare.part.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        User, 
        Driver, 
        Company,
        Warranty,
        Motorcycle,
        SparePart
    ]),
  ],
  providers: [
    UserSeeder, 
    DriverSeeder,
    WarrantySeeder,
    SparePartSeeder
],
  exports: [
    UserSeeder, 
    DriverSeeder,
    WarrantySeeder,
    SparePartSeeder
],
})
export class SeederModule {}
