import { UserSeeder } from './user.seeder';
import { DriverSeeder } from './driver.seeder';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { WarrantySeeder } from './warranty.seeder';
import { SparePartSeeder } from './spare.part.seeder';
import { RepairSeeder } from './repair.seeder';

export const runSeeders = async () => {
  const app = await NestFactory.create(AppModule);
  const userSeeder = app.get(UserSeeder);
  const driverSeeder = app.get(DriverSeeder);
  const warrantySeeder = app.get(WarrantySeeder);
  const sparePartSeeder = app.get(SparePartSeeder);
  const repairSeeder = app.get(RepairSeeder);

//   await userSeeder.seedUsers(10); 
//   await driverSeeder.seedDrivers(10);
//   await warrantySeeder.seedWarranties(10);
//   await sparePartSeeder.seedSpareParts(10);
//   await repairSeeder.seedRepairs(10);


};
