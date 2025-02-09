import { AppointmentSeeder } from '@api/seeders/appointment.seeder';
import { BreakdownSeeder } from '@api/seeders/breakdown.seeder';
import { CompanySeeder } from '@api/seeders/company.seeder';
import { ConcessionSeeder } from '@api/seeders/concession.seeder';
import { MaintenanceSeeder } from '@api/seeders/maintenance.seeder';
import { MotorcycleTrialSeeder } from '@api/seeders/motorcycle.trial.seeder';
import { UserSeeder } from '@api/seeders/user.seeder';
import { DriverSeeder } from '@api/seeders/driver.seeder';
import { NestFactory } from '@nestjs/core';
import { WarrantySeeder } from '@api/seeders/warranty.seeder';
import { SparePartSeeder } from '@api/seeders/spare.part.seeder';
import { RepairSeeder } from '@api/seeders/repair.seeder';
import { OrderItemSeeder } from '@api/seeders/order.item.seeder';
import { OrderSeeder } from '@api/seeders/order.seeder';
import { LocationSeeder } from '@api/seeders/location.seeder';
import { MotorcycleSeeder } from '@api/seeders/motorcycle.seeders';
import { AppModule } from '@api/app.module';

export const runSeeders = async () => {
  const app = await NestFactory.create(AppModule);
  const userSeeder = app.get(UserSeeder);
  const driverSeeder = app.get(DriverSeeder);
  const warrantySeeder = app.get(WarrantySeeder);
  const sparePartSeeder = app.get(SparePartSeeder);
  const repairSeeder = app.get(RepairSeeder);
  const orderItemSeeder = app.get(OrderItemSeeder);
  const orderSeeder = app.get(OrderSeeder);
  const locationSeeder = app.get(LocationSeeder);
  const motorcycleSeeder = app.get(MotorcycleSeeder);
  const motorcycleTrialSeeder = app.get(MotorcycleTrialSeeder);
  const maintenanceSeeder = app.get(MaintenanceSeeder);
  const concessionSeeder = app.get(ConcessionSeeder);
  const companySeeder = app.get(CompanySeeder);
  const breakdownSeeder = app.get(BreakdownSeeder);
  const appointmentSeeder = app.get(AppointmentSeeder);


  
 //await maintenanceSeeder.seedMaintenances(2); 
//   await userSeeder.seedUsers(10); 
//   await driverSeeder.seedDrivers(10);
//   await warrantySeeder.seedWarranties(10);
//   await sparePartSeeder.seedSpareParts(10);
//   await repairSeeder.seedRepairs(10);
//   await orderItemSeeder.seedOrderItems(10);
//   await orderSeeder.seedOrders(10);
//   await locationSeeder.seedLocations(10);
 // await motorcycleSeeder.seedMotorcycles(20);
//   await motorcycleTrialSeeder.seedMotorcycleTrials(10);
//   await concessionSeeder.seedConcessions(20);
// await companySeeder.seedCompanies(20);
//  await breakdownSeeder.seedBreakdowns(10);
//  await appointmentSeeder.seedAppointments(10);
};
