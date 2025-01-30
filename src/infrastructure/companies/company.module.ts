import { forwardRef, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem';
import { UsersModule } from '@infrastructure/users/users.module';

@Module({
  controllers: [CompanyController],
  imports: [
    TypeOrmModule.forFeature([Company]),
    forwardRef(() => UsersModule)
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
