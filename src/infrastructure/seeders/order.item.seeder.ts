import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '@infrastructure/order-items/order-item.entity';
import { SparePart } from '@infrastructure/spare-parts/spare-part.entity';
import { Order } from '@infrastructure/orders/order.entity';
import { faker } from '@faker-js/faker';
import { OrderItemQuantityOrdered } from '@domain/values/orderItem/OrderItemQuantityOrdered';
import { OrderItemCostPerUnit } from '@domain/values/orderItem/OrderItemCostPerUnit';
import { OrderItemDeliveredQuantity } from '@domain/values/orderItem/OrderItemDeliveredQuantity';

@Injectable()
export class OrderItemSeeder {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async seedOrderItems(count: number = 10): Promise<void> {
    const spareParts = await this.sparePartRepository.find({ take: 20 });
    const orders = await this.orderRepository.find({ take: 20 });

    if (spareParts.length === 0 || orders.length === 0) {
      console.log('No spare parts or orders found in the database!');
      return;
    }

    const orderItems: OrderItem[] = [];

    for (let i = 0; i < count; i++) {
      const quantityOrderedValue = faker.number.int({ min: 1, max: 20 });
      const quantityOrdered = OrderItemQuantityOrdered.from(quantityOrderedValue);
      if (quantityOrdered instanceof Error) {
        console.error(`Invalid quantity ordered: ${quantityOrderedValue}`);
        continue;
      }

      const costPerUnitValue = faker.number.float({ min: 10, max: 500 });
      const costPerUnitOrError = OrderItemCostPerUnit.from(costPerUnitValue);
      if (costPerUnitOrError instanceof Error) {
        console.error(`Invalid cost per unit: ${costPerUnitValue}`);
        continue;
      }

      const deliveredQuantityValue = faker.number.int({ min: 0, max: quantityOrderedValue });
      const deliveredQuantityOrError = OrderItemDeliveredQuantity.from(deliveredQuantityValue, quantityOrdered);
      if (deliveredQuantityOrError instanceof Error) {
        console.error(`Invalid delivered quantity: ${deliveredQuantityValue}`);
        continue;
      }

      const orderItem = this.orderItemRepository.create({
        sparePart: faker.helpers.arrayElement(spareParts),
        quantityOrdered: quantityOrdered.value,
        costPerUnit: costPerUnitOrError.value,
        deliveredQuantity: deliveredQuantityOrError.value,
        order: faker.helpers.arrayElement(orders),
      });

      orderItems.push(orderItem);
    }

    await this.orderItemRepository.save(orderItems);
    console.log(`${orderItems.length} order items have been created.`);
  }
}
