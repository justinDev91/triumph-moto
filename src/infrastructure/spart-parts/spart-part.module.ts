import { Module } from '@nestjs/common';
import { SpartPartController } from './spart-part.controller';
import { SpartPartService } from './spart-part.service';
import { SparePartRepositoryImplem } from '@infrastructure/adapters/spare.part.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './spart-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  controllers: [SpartPartController],
  providers: [
    SpartPartService,
    SparePartRepositoryImplem
  ],
  exports: [
    SpartPartService, 
    SparePartRepositoryImplem,
  ]
})
export class SpartPartModule {}
