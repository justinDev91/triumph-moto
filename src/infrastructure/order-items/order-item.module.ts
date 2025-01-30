import { forwardRef, Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { OrderItemRepositoryImplem } from '@infrastructure/adapters/order.item.repository.implem';
import { SparePart } from '@infrastructure/spare-parts/spare-part.entity';
import { OrderItem } from './order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '@infrastructure/orders/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, SparePart]),
    forwardRef(() => OrderModule)
  ],
  controllers: [OrderItemController],
  providers: [
    OrderItemService,
    OrderItemRepositoryImplem
  ],
  exports: [
    OrderItemService,
    OrderItemRepositoryImplem
  ]
})
export class OrderItemModule {}
