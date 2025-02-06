import { forwardRef, Module } from '@nestjs/common';
import { MotorcycleController } from './motorcycle.controller';
import { MotorcycleService } from './motorcycle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorcycle } from './motorcycle.entity';
import { MotorcycleRepositoryImplem } from '@adapters/motorcycle.repository.implem';
import { CompanyModule } from '@api/companies/company.module';
import { ConcessionModule } from '@api/concessions/concession.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Motorcycle]),
    forwardRef(() => CompanyModule),
    forwardRef(() => ConcessionModule),
  ],
  providers: [
    MotorcycleService,
    MotorcycleRepositoryImplem,
  ],
  controllers: [MotorcycleController],
  exports: [
    MotorcycleService,
    MotorcycleRepositoryImplem
  ]
})
export class MotorcycleModule {}
