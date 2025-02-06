import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@infrastructure/orders/order.entity';
import { OrderItem } from '@infrastructure/order-items/order-item.entity';
import { faker } from '@faker-js/faker';
import { EstimatedDeliveryDate } from '@domain/values/order/EstimatedDeliveryDate';

@Injectable()
export class OrderSeeder {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async seedOrders(count: number = 10): Promise<void> {
    const orderItems = await this.orderItemRepository.find();

    if (orderItems.length === 0) {
      console.log('No order items found in the database!');
      return;
    }

    const orders: Order[] = [];

    for (let i = 0; i < count; i++) {
      const orderDate = faker.date.past({ years: 1 });

      const estimatedDeliveryDateValue = faker.date.soon({ days: 90 });
      const estimatedDeliveryDateOrError = EstimatedDeliveryDate.from(estimatedDeliveryDateValue, orderDate);
      if (estimatedDeliveryDateOrError instanceof Error) {
        console.error(`Invalid estimated delivery date: ${estimatedDeliveryDateValue}`);
        continue;
      }

      const selectedItems = faker.helpers.arrayElements(orderItems, faker.number.int({ min: 1, max: 5 }));
      const totalCost = selectedItems.reduce((sum, item) => sum + item.costPerUnit * item.quantityOrdered, 0);

      const order = this.orderRepository.create({
        orderDate,
        estimatedDeliveryDate: estimatedDeliveryDateOrError.value,
        items: selectedItems,
        totalCost,
      });
      orders.push(order);
    }

    await this.orderRepository.save(orders);
    console.log(`${orders.length} orders have been created.`);
  }
}
