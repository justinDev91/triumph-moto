import { Module } from '@nestjs/common';
import { WarrantyController } from './warranty.controller';
import { WarrantyService } from './warranty.service';
import { WarrantyRepositoryImplem } from '@infrastructure/adapters/warranty.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warranty } from './warranty.entity';
import { MotorcycleModule } from '@infrastructure/motorcycles/motorcycle.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Warranty]),
    MotorcycleModule
  ],
  controllers: [WarrantyController],
  providers: [
    WarrantyService,
    WarrantyRepositoryImplem,
  ],
  exports: [
    WarrantyService, 
    WarrantyRepositoryImplem
  ]
})
export class WarrantyModule {}
