import { forwardRef, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderRepositoryImplem } from '@infrastructure/adapters/order.repository.implem';
import { OrderItem } from '@infrastructure/order-items/order-item.entity';
import { OrderItemModule } from '@infrastructure/order-items/order-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    forwardRef(() => OrderItemModule)
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepositoryImplem
  ],
  exports: [
    OrderService,
    OrderRepositoryImplem
  ]
})
export class OrderModule {}
