import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeeder } from '@api/seeders/user.seeder';
import { DriverSeeder } from '@api/seeders/driver.seeder';
import { User } from '@api/users/user.entity';
import { Driver } from '@api/drivers/driver.entity';
import { Company } from '@api/companies/company.entity';
import { WarrantySeeder } from './warranty.seeder';
import { Warranty } from '@api/warranties/warranty.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { SparePart } from '@api/spare-parts/spare-part.entity';
import { SparePartSeeder } from './spare.part.seeder';
import { Repair } from '@api/repairs/repair.entity';
import { Breakdown } from '@api/breakdowns/breakdown.entity';
import { RepairSeeder } from './repair.seeder';
import { OrderItem } from '@api/order-items/order-item.entity';
import { Order } from '@api/orders/order.entity';
import { OrderItemSeeder } from './order.item.seeder';
import { OrderSeeder } from './order.seeder';
import { Location } from '@api/locations/location.entity';
import { LocationSeeder } from './location.seeder';
import { Concession } from '@api/concessions/concession.entity';
import { MotorcycleSeeder } from './motorcycle.seeders';
import { MotorcycleTrial } from '@api/motorcycle-trials/motorcycle-trial.entity';
import { MotorcycleTrialSeeder } from './motorcycle.trial.seeder';
import { Maintenance } from '@api/maintenances/maintenance.entity';
import { MaintenanceSeeder } from './maintenance.seeder';
import { ConcessionSeeder } from './concession.seeder';
import { CompanySeeder } from './company.seeder';
import { BreakdownSeeder } from './breakdown.seeder';
import { Appointment } from '@api/appointment/appointment.entity';
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
