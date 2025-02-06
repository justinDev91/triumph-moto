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
        Order

    ]),
  ],
  providers: [
    UserSeeder, 
    DriverSeeder,
    WarrantySeeder,
    SparePartSeeder,
    RepairSeeder,
    OrderItemSeeder,
    OrderSeeder
],
  exports: [
    UserSeeder, 
    DriverSeeder,
    WarrantySeeder,
    SparePartSeeder,
    RepairSeeder,
    OrderItemSeeder,
    OrderSeeder
],
})
export class SeederModule {}
