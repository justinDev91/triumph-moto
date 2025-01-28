import { Module } from '@nestjs/common';
import { WarrantyController } from './warranty.controller';
import { WarrantyService } from './warranty.service';

@Module({
  controllers: [WarrantyController],
  providers: [WarrantyService]
})
export class WarrantyModule {}
