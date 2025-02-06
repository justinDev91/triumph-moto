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
import { Repair } from '@infrastructure/repairs/repair.entity';
import { Breakdown } from '@infrastructure/breakdowns/breakdown.entity';
import { RepairSeeder } from './repair.seeder';
import { OrderItem } from '@infrastructure/order-items/order-item.entity';
import { Order } from '@infrastructure/orders/order.entity';
import { OrderItemSeeder } from './order.item.seeder';
import { OrderSeeder } from './order.seeder';
import { Location } from '@infrastructure/locations/location.entity';
import { LocationSeeder } from './location.seeder';
import { Concession } from '@infrastructure/concessions/concession.entity';
import { MotorcycleSeeder } from './motorcycle.seeders';
import { MotorcycleTrial } from '@infrastructure/motorcycle-trials/motorcycle-trial.entity';
import { MotorcycleTrialSeeder } from './motorcycle.trial.seeder';
import { Maintenance } from '@infrastructure/maintenances/maintenance.entity';
import { MaintenanceSeeder } from './maintenance.seeder';
import { ConcessionSeeder } from './concession.seeder';
import { CompanySeeder } from './company.seeder';
import { BreakdownSeeder } from './breakdown.seeder';
import { Appointment } from '@infrastructure/appointment/appointment.entity';
import { AppointmentSeeder } from './appointment.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        User, 
        Driver, 
        Company,
        Warranty,
        Motorcycle,
        SparePart,
        Repair,
        Breakdown,
        OrderItem,
        Order,
        Location,
        Concession,
        MotorcycleTrial,
        Maintenance,
        Appointment
    ]),
  ],
  providers: [
    UserSeeder, 
    DriverSeeder,
    WarrantySeeder,
    SparePartSeeder,
    RepairSeeder,
    OrderItemSeeder,
    OrderSeeder,
    LocationSeeder,
    MotorcycleSeeder,
    MotorcycleTrialSeeder,
    MaintenanceSeeder,
    ConcessionSeeder,
    CompanySeeder,
    BreakdownSeeder,
    AppointmentSeeder
],
  exports: [
    UserSeeder, 
    DriverSeeder,
    WarrantySeeder,
    SparePartSeeder,
    RepairSeeder,
    OrderItemSeeder,
    OrderSeeder,
    LocationSeeder,
    MotorcycleSeeder,
    MotorcycleTrialSeeder,
    MaintenanceSeeder,
    ConcessionSeeder,
    CompanySeeder,
    BreakdownSeeder,
    AppointmentSeeder

],
})
export class SeederModule {}
