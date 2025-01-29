import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { OrderItemRepositoryImplem } from '@infrastructure/adapters/order.item.repository.implem';
import { SparePart } from '@infrastructure/spart-parts/spart-part.entity';
import { OrderItem } from './order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, SparePart])],
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
