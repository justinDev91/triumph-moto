import { forwardRef, Module } from '@nestjs/common';
import { RepairController } from './repair.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repair } from './repair.entity';
import { Breakdown } from '@api/breakdowns/breakdown.entity';
import { RepairRepositoryImplem } from '@adapters/repair.repository.implem';
import { RepairService } from './repair.service';
import { BreakdownModule } from '@api/breakdowns/breakdown.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Repair, Breakdown]),
    forwardRef(() => BreakdownModule),
    ],
  controllers: [RepairController],
  providers: [
    RepairService,
    RepairRepositoryImplem
  ],
  exports: [
    RepairService,
    RepairRepositoryImplem
  ]
})
export class RepairModule {}
