import { Module } from '@nestjs/common';
import { MotorcycleController } from './motorcycle.controller';
import { MotorcycleService } from './motorcycle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorcycle } from './motorcycle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motorcycle])],
  providers: [MotorcycleService],
  controllers: [MotorcycleController],
  exports: [MotorcycleService]
})
export class MotorcycleModule {}
