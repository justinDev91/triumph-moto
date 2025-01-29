import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { OrderEntity } from "@domain/entities/order/OrderEntity";
import { Order } from "@infrastructure/orders/order.entity"; // ORM Order model
import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface"; 
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "@infrastructure/order-items/order-item.entity";
import { OrderNotFoundError } from "@domain/errors/order/OrderNotFoundError";

export class OrderRepositoryImplem implements OrderRepositoryInterface {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly orderItemRepositoryInterface: OrderItemRepositoryInterface,
  ) {}
    findByDateRange(startDate: Date, endDate: Date): Promise<OrderEntity[] | Error> {
        throw new Error("Method not implemented.");
    }

  async save(order: OrderEntity): Promise<void> {
    try {
      const orderToSave = this.orderRepository.create({
        orderDate: order.getOrderDate(),
        estimatedDeliveryDate: order.getEstimatedDeliveryDate(),
        totalCost: order.getTotalCost(),
        items: [], 
      });

      await this.orderRepository.save(orderToSave);

      for (const item of order.getItems()) {
        const orderItemToSave = this.orderItemRepository.create({
          id: item.sparePart.id,
          quantityOrdered: item.quantityOrdered.value,
          costPerUnit: item.costPerUnit.value,
          deliveredQuantity: item.deliveredQuantity.value,
        });

        await this.orderItemRepository.save(orderItemToSave);
      }
    } catch (error) {
      throw new Error("Failed to save the order");
    }
  }

  async findById(orderId: string): Promise<OrderEntity | Error> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: ["items"], 
      });

      if (!order) return new OrderNotFoundError();

      const items = await Promise.all(order.items.map(item => 
        this.orderItemRepositoryInterface.findById(item.id)
      ));

      const orderEntity = OrderEntity.create(
        order.id,
        order.orderDate,
        order.estimatedDeliveryDate
      );

      if (orderEntity instanceof Error) return orderEntity;

      items.forEach((item) => {
        if (item instanceof Error) return;
        orderEntity.addItem(item.getId(), item.sparePart, item.quantityOrdered.value, item.costPerUnit.value);
      });

      return orderEntity;
    } catch (error) {
      return new Error("Failed to find order");
    }
  }

  async update(order: OrderEntity): Promise<void> {
    try {
      const orderToUpdate = await this.orderRepository.findOne({ where: { id: order.id } });
      if (!orderToUpdate) throw new Error("Order not found");

      orderToUpdate.orderDate = order.getOrderDate();
      orderToUpdate.estimatedDeliveryDate = order.getEstimatedDeliveryDate();
      orderToUpdate.totalCost = order.getTotalCost();

      await this.orderRepository.save(orderToUpdate);

      for (const item of order.getItems()) {
        await this.orderItemRepository.update(item.getId(), {
          quantityOrdered: item.quantityOrdered.value,
          costPerUnit: item.costPerUnit.value,
          deliveredQuantity: item.deliveredQuantity.value,
        });
      }
    } catch (error) {
      throw new Error("Failed to update order");
    }
  }
}
