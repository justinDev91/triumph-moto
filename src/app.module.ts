import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@infrastructure/users/users.module';
import { DriversModule } from '@infrastructure/drivers/drivers.module';
import { CompanyModule } from '@infrastructure/companies/company.module';
import { MotorcycleModule } from '@infrastructure/motorcycles/motorcycle.module';
import { ConcessionModule } from '@infrastructure/concessions/concession.module';

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
    ConcessionModule
  ],
})
export class AppModule {}
