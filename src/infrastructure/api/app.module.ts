import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@api/users/users.module';
import { DriversModule } from '@api/drivers/drivers.module';
import { CompanyModule } from '@api/companies/company.module';
import { MotorcycleModule } from '@api/motorcycles/motorcycle.module';
import { ConcessionModule } from '@api/concessions/concession.module';
import { LocationModule } from '@api/locations/location.module';
import { WarrantyModule } from '@api/warranties/warranty.module';
import { SparePartModule } from '@api/spare-parts/spare-part.module';
import { OrderItemModule } from '@api/order-items/order-item.module';
import { OrderModule } from '@api/orders/order.module';
import { MaintenanceModule } from '@api/maintenances/maintenance.module';
import { MotorcycleTrialModule } from '@api/motorcycle-trials/motorcycle-trial.module';
import { BreakdownModule } from '@api/breakdowns/breakdown.module';
import { RepairModule } from '@api/repairs/repair.module';
import { AppointmentModule } from '@api/appointment/appointment.module';
import { User } from '@api/users/user.entity';
import { Driver } from '@api/drivers/driver.entity';
import { Company } from '@api/companies/company.entity';
import { SeederModule } from '@api/seeders/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User, 
      Driver,
      Company
    ]),
    UsersModule,
    DriversModule,
    CompanyModule,
    MotorcycleModule,
    ConcessionModule,
    LocationModule,
    WarrantyModule,
    SparePartModule,
    OrderItemModule,
    OrderModule,
    MaintenanceModule,
    MotorcycleTrialModule,
    BreakdownModule,
    RepairModule,
    AppointmentModule,
    SeederModule
  ],
})
export class AppModule {}
