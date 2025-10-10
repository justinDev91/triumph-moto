import { forwardRef, Module } from '@nestjs/common';
import { ConcessionController } from './concession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcessionService } from './concession.service';
import { Concession } from './concession.entity';
import { ConcessionRepositoryImplem } from '@adapters/concession.repository.implem';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { User } from '@api/users/user.entity';
import { Company } from '@api/companies/company.entity';
import { CompanyModule } from '@api/companies/company.module';
import { UsersModule } from '@api/users/users.module';
import { MotorcycleModule } from '@api/motorcycles/motorcycle.module';

@Module({
    controllers: [ConcessionController],
    imports: [TypeOrmModule.forFeature([
        Concession, 
        Motorcycle,
        User,
        Company
    ]),
    forwardRef(() => CompanyModule),
    forwardRef(() => UsersModule),
    forwardRef(() => MotorcycleModule),
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
