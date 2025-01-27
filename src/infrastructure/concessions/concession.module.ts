import { Module } from '@nestjs/common';
import { ConcessionController } from './concession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcessionService } from './concession.service';
import { Concession } from './concession.entity';

@Module({
    controllers: [ConcessionController],
    imports: [TypeOrmModule.forFeature([Concession])],
    providers: [ConcessionService],
    exports: [ConcessionService],
})
export class ConcessionModule {}
