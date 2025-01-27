import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
