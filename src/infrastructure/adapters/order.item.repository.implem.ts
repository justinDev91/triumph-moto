import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";
import { OrderItem } from "@infrastructure/order-items/order-item.entity";
import { SparePart } from "@infrastructure/spare-parts/spare-part.entity";
import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";
import { toDomainOrderItem } from "@infrastructure/helpers/orderItem/to-domain-order-item";
import { toOrmOrderItem } from '@infrastructure/helpers/orderItem/to-orm-order-item';

export class OrderItemRepositoryImplem implements OrderItemRepositoryInterface {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>
  ) {}

    findByOrderId(orderId: string): Promise<OrderItemEntity[] | Error> {
        throw new Error('Method not implemented.');
    }

    async save(orderItem: OrderItemEntity): Promise<OrderItemEntity | Error> {
        try {
            const sparePart = await this.sparePartRepository.findOne({ where: { id: orderItem.sparePart.id } });
            if (!sparePart) return new Error("Spare part not found");
    
            const orderItemToSave = toOrmOrderItem(orderItem, sparePart);
    
            await this.orderItemRepository.save(orderItemToSave);
            return toDomainOrderItem(orderItemToSave, this.sparePartRepository);
        } catch (error) {
            return new Error("Failed to save order item");
        }
   }

  async findById(orderItemId: string): Promise<OrderItemEntity | Error> {
    const orderItem = await this.orderItemRepository.findOne({ where: { id: orderItemId } });
    if (!orderItem) return new Error("Order item not found");

    return toDomainOrderItem(orderItem, this.sparePartRepository);
  }

//   async findByOrderId(orderId: string): Promise<OrderItemEntity[] | Error> {
//     const orderItems = await this.orderItemRepository.find({
//         where: { Order: { id } },
//       });
//     if (!orderItems.length) return new Error("No order items found for this order");

//     const mappedOrderItems = await Promise.all(orderItems.map(toDomainOrderItem.bind(this)));
//     return mappedOrderItems.filter(item => !(item instanceof Error)) as OrderItemEntity[];
//   }

  async findAll(): Promise<OrderItemEntity[] | Error> {
    const orderItems = await this.orderItemRepository.find();
    const mappedOrderItems = await Promise.all(orderItems.map(toDomainOrderItem.bind(this)));
    return mappedOrderItems.filter(item => !(item instanceof Error)) as OrderItemEntity[];
  }

  async update(orderItem: OrderItemEntity): Promise<void> {
    await this.orderItemRepository.update(orderItem.getId(), {
      quantityOrdered: orderItem.quantityOrdered.value,
      costPerUnit: orderItem.costPerUnit.value,
      deliveredQuantity: orderItem.deliveredQuantity.value
    });
  }

  async delete(id: string): Promise<void> {
    await this.orderItemRepository.delete(id);
  }
}
