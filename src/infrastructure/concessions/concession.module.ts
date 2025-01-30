import { Module } from '@nestjs/common';
import { ConcessionController } from './concession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcessionService } from './concession.service';
import { Concession } from './concession.entity';
import { ConcessionRepositoryImplem } from '@infrastructure/adapters/concession.repository.implem';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { User } from '@infrastructure/users/user.entity';
import { Company } from '@infrastructure/companies/company.entity';
import { CompanyModule } from '@infrastructure/companies/company.module';

@Module({
    controllers: [ConcessionController],
    imports: [TypeOrmModule.forFeature([
        Concession, 
        Motorcycle,
        User,
        Company
    ]),
    CompanyModule
    ],
    providers: [
        ConcessionService,
        ConcessionRepositoryImplem
    ],
    exports: [
        ConcessionService,
        ConcessionRepositoryImplem
    ],
})
export class ConcessionModule {}
