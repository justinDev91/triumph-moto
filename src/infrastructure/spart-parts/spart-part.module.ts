import { Module } from '@nestjs/common';
import { SpartPartController } from './spart-part.controller';
import { SpartPartService } from './spart-part.service';

@Module({
  controllers: [SpartPartController],
  providers: [SpartPartService]
})
export class SpartPartModule {}
