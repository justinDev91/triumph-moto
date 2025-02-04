import { forwardRef, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem';
import { UsersModule } from '@infrastructure/users/users.module';
import { ConcessionModule } from '@infrastructure/concessions/concession.module';
import { Concession } from '@infrastructure/concessions/concession.entity';
import { DriversModule } from '@infrastructure/drivers/drivers.module';
import { Driver } from '@infrastructure/drivers/driver.entity';
import { MotorcycleModule } from '@infrastructure/motorcycles/motorcycle.module';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';

@Module({
  controllers: [CompanyController],
  imports: [
    TypeOrmModule.forFeature([Company, Concession, Driver, Motorcycle]),
    forwardRef(() => ConcessionModule),
    forwardRef(() => UsersModule),
    forwardRef(() => DriversModule),
    forwardRef(() => MotorcycleModule),
  ],
  providers: [
    CompanyService,
    CompanyRepositoryImplem
  ],
  exports: [
    CompanyService, 
    CompanyRepositoryImplem
  ],
})
export class CompanyModule {}
