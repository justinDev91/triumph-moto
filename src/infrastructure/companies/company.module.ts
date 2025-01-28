import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem';

@Module({
  controllers: [CompanyController],
  imports: [TypeOrmModule.forFeature([Company])],
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
