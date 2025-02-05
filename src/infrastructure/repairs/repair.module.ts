import { forwardRef, Module } from '@nestjs/common';
import { RepairController } from './repair.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repair } from './repair.entity';
import { Breakdown } from '@infrastructure/breakdowns/breakdown.entity';
import { RepairRepositoryImplem } from '@infrastructure/adapters/repair.repository.implem';
import { RepairService } from './repair.service';
import { BreakdownModule } from '@infrastructure/breakdowns/breakdown.module';

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
