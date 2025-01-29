import { Module } from '@nestjs/common';
import { RepairController } from './repair.controller';
import { RepairService } from './repair.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repair } from './repair.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Repair])],
  controllers: [RepairController],
  providers: [RepairService]
})
export class RepairModule {}
