import { Module } from '@nestjs/common';
import { BreakdownController } from './breakdown.controller';
import { BreakdownService } from './breakdown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breakdown } from './breakdown.entity';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { Warranty } from '@infrastructure/warranties/warranty.entity';
import { Repair } from '@infrastructure/repairs/repair.entity';
import { BreakdownRepositoryImplem } from '@infrastructure/adapters/breakdown.repository.implem';
import { MotorcycleModule } from '@infrastructure/motorcycles/motorcycle.module';
import { WarrantyModule } from '@infrastructure/warranties/warranty.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Breakdown, 
      Motorcycle, 
      Warranty,
      Repair
  ]),
    MotorcycleModule,
    WarrantyModule
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
