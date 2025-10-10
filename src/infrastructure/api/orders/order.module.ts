import { forwardRef, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderRepositoryImplem } from '@adapters/order.repository.implem';
import { OrderItem } from '@api/order-items/order-item.entity';
import { OrderItemModule } from '@api/order-items/order-item.module';
import { SparePartModule } from '@api/spare-parts/spare-part.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    forwardRef(() => OrderItemModule),
    SparePartModule
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
