import { forwardRef, Module } from '@nestjs/common';
import { BreakdownController } from './breakdown.controller';
import { BreakdownService } from './breakdown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breakdown } from './breakdown.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Warranty } from '@api/warranties/warranty.entity';
import { Repair } from '@api/repairs/repair.entity';
import { BreakdownRepositoryImplem } from '@adapters/breakdown.repository.implem';
import { MotorcycleModule } from '@api/motorcycles/motorcycle.module';
import { WarrantyModule } from '@api/warranties/warranty.module';
import { RepairModule } from '@api/repairs/repair.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Breakdown, 
      Motorcycle, 
      Warranty,
      Repair
  ]),
    MotorcycleModule,
    WarrantyModule,
    forwardRef(() => RepairModule),
  ],
  controllers: [BreakdownController],
  providers: [
    BreakdownService,
    BreakdownRepositoryImplem
  ],
  exports: [
    BreakdownService,
    BreakdownRepositoryImplem
  ]
})
export class BreakdownModule {}
