import { Module } from '@nestjs/common';
import { WarrantyController } from './warranty.controller';
import { WarrantyService } from './warranty.service';
import { WarrantyRepositoryImplem } from '@adapters/warranty.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warranty } from './warranty.entity';
import { MotorcycleModule } from '@api/motorcycles/motorcycle.module';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature(
    [
      Warranty, 
      Motorcycle
    ]),
    MotorcycleModule,
  ],
  controllers: [WarrantyController],
  providers: [
    WarrantyService,
    WarrantyRepositoryImplem,
  ],
  exports: [
    WarrantyService, 
    WarrantyRepositoryImplem,
  ],
})
export class WarrantyModule {}
