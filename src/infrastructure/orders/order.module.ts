import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderRepositoryImplem } from '@infrastructure/adapters/order.repository.implem';

@Module({
  // imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderService,
    // OrderRepositoryImplem
  ],
  exports: [
    OrderService,
    // OrderRepositoryImplem
  ]
})
export class OrderModule {}
