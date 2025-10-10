import { forwardRef, Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { OrderItemRepositoryImplem } from '@adapters/order.item.repository.implem';
import { SparePart } from '@api/spare-parts/spare-part.entity';
import { OrderItem } from './order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '@api/orders/order.module';
import { SparePartModule } from '@api/spare-parts/spare-part.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, SparePart]),
    forwardRef(() => OrderModule),
    SparePartModule
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
