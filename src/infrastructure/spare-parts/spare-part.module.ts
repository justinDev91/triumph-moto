import { Module } from '@nestjs/common';
import { SparePartController } from './spare-part.controller';
import { SparePartService } from './spare-part.service';
import { SparePartRepositoryImplem } from '@infrastructure/adapters/spare.part.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './spare-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  controllers: [SparePartController],
  providers: [
    SparePartService,
    SparePartRepositoryImplem
  ],
  exports: [
    SparePartService, 
    SparePartRepositoryImplem,
  ]
})
export class SpartPartModule {}
