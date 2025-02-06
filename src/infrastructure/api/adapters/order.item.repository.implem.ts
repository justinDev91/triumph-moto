import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";
import { OrderItem } from "@api/order-items/order-item.entity";
import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";
import { toDomainOrderItem } from "@helpers/orderItem/to-domain-order-item";
import { toOrmOrderItem } from '@helpers/orderItem/to-orm-order-item';
import { OrderItemNotFoundError } from "@domain/errors/orderItem/OrderItemNotFoundError";
import { SparePart } from "@api/spare-parts/spare-part.entity";

export class OrderItemRepositoryImplem implements OrderItemRepositoryInterface {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>
  ) {}

    async updatedeliveredQty(id: string, quantityOrdered: number): Promise<void> {
      await this.orderItemRepository.update(id, {quantityOrdered});
    }


    async save(orderItem: OrderItemEntity): Promise<OrderItemEntity | Error> {
      
      const orderItemToSave = toOrmOrderItem(orderItem);
      
      await this.orderItemRepository.save({
        ...orderItemToSave,
        sparePart: {
          id: orderItem.sparePart.id,
          name:orderItem.sparePart.name.value,
          quantityInStock:orderItem.sparePart.quantityInStock.value,
          cost:orderItem.sparePart.cost.value,
          totalUsage:orderItem.sparePart.getTotalUsage(),
          reservedStock:orderItem.sparePart.getReservedStock()
        }
      });
      
      return toDomainOrderItem(orderItemToSave);
   }

  async findById(orderItemId: string): Promise<OrderItemEntity | Error> {
    const orderItem = await this.orderItemRepository.findOne({ where: { id: orderItemId } });
    if (!orderItem) return new Error("Order item not found");

    return toDomainOrderItem(orderItem);
  }

  async findByOrderId(orderId: string): Promise<OrderItemEntity[] | Error> {
    const orderItems = await this.orderItemRepository.find({
        where:  { id: orderId  },
      });
    if (!orderItems.length) return new OrderItemNotFoundError()

    const mappedOrderItems = await Promise.all(orderItems.map(toDomainOrderItem.bind(this)));
    return mappedOrderItems.filter(item => !(item instanceof Error)) as OrderItemEntity[];
  }

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
