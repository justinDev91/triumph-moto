import { forwardRef, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyRepositoryImplem } from '@adapters/company.repository.implem';
import { UsersModule } from '@api/users/users.module';
import { ConcessionModule } from '@api/concessions/concession.module';
import { Concession } from '@api/concessions/concession.entity';
import { DriversModule } from '@api/drivers/drivers.module';
import { Driver } from '@api/drivers/driver.entity';
import { MotorcycleModule } from '@api/motorcycles/motorcycle.module';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';

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
