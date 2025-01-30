import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@infrastructure/users/users.module';
import { DriversModule } from '@infrastructure/drivers/drivers.module';
import { CompanyModule } from '@infrastructure/companies/company.module';
import { MotorcycleModule } from '@infrastructure/motorcycles/motorcycle.module';
import { ConcessionModule } from '@infrastructure/concessions/concession.module';
import { LocationModule } from '@infrastructure/locations/location.module';
import { WarrantyModule } from '@infrastructure/warranties/warranty.module';
import { SpartPartModule } from '@infrastructure/spare-parts/spare-part.module';
import { OrderItemModule } from '@infrastructure/order-items/order-item.module';
import { OrderModule } from '@infrastructure/orders/order.module';
import { MaintenanceModule } from '@infrastructure/maintenances/maintenance.module';
import { MotorcycleTrialModule } from '@infrastructure/motorcycle-trials/motorcycle-trial.module';
import { BreakdownModule } from '@infrastructure/breakdowns/breakdown.module';
import { RepairModule } from '@infrastructure/repairs/repair.module';
import { AppointmentModule } from '@infrastructure/appointment/appointment.module';

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
    UsersModule,
    DriversModule,
    CompanyModule,
    MotorcycleModule,
    ConcessionModule,
    LocationModule,
    WarrantyModule,
    SpartPartModule,
    OrderItemModule,
    OrderModule,
    MaintenanceModule,
    MotorcycleTrialModule,
    BreakdownModule,
    RepairModule,
    AppointmentModule
  ],
})
export class AppModule {}
