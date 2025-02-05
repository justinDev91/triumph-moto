import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { OrderEntity } from "@domain/entities/order/OrderEntity";
import { Order } from "@infrastructure/orders/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "@infrastructure/order-items/order-item.entity";
import { OrderNotFoundError } from "@domain/errors/order/OrderNotFoundError";
import { toDomainSparePart } from "@infrastructure/helpers/sparPart/to-domain-spare-part";
import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
import { toDomainOrder } from "@infrastructure/helpers/order/to-domain-order";
import { toOrmSpartPart } from "@infrastructure/helpers/sparPart/to-orm-spart-part";
import { OrderItemNotFoundError } from "@domain/errors/orderItem/OrderItemNotFoundError";
import { OrderItemAlreadAssignedError } from "@domain/errors/orderItem/OrderItemAlreadAssignedError";

export class OrderRepositoryImplem implements OrderRepositoryInterface {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}
  
  delivery(orderId: string): Promise<void | Error> {
    throw new Error("Method not implemented.");
  }

    async addItem(orderId: string, itemId: string): Promise<void | Error> {
      const [item, order] = await Promise.all([
        this.orderItemRepository.findOne({ where: { id: itemId } }),
        this.orderRepository.findOne({ where: { id: orderId }, relations: ["items"] })
      ]);
    
      if (!item) return new OrderItemNotFoundError();
      if (!order) return new OrderNotFoundError();
      if (order.items.some(existingItem => existingItem.id === itemId)) {
        return new OrderItemAlreadAssignedError();
      }
    
      return this.orderRepository.manager.transaction(async (transactionalEntityManager) => {
        item.order = order;
        await transactionalEntityManager.save(item);
    
        order.items.push(item);
        await transactionalEntityManager.save(order);
      });
    }
    
    async findAll(): Promise<OrderEntity[] | Error> {
      const orders = await this.orderRepository.find({
        relations: ["items"], 
      });

      const mappedOrders = await Promise.all(orders.map(toDomainOrder.bind(this)));

      if(mappedOrders instanceof Error) return mappedOrders

      return mappedOrders.filter(item => !(item instanceof Error)) as OrderEntity[];
    }

    findByDateRange(startDate: Date, endDate: Date): Promise<OrderEntity[] | Error> {
        throw new Error("Method not implemented.");
    }

  async save(order: OrderEntity): Promise<void> {
      const orderToSave = this.orderRepository.create({
        orderDate: order.getOrderDate(),
        estimatedDeliveryDate: order.getEstimatedDeliveryDate(),
        totalCost: order.getTotalCost(),
        items: [], 
      });
      await this.orderRepository.save(orderToSave);
  }

  async findById(orderId: string): Promise<OrderEntity | Error> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: ["items"], 
      }); 
      if (!order) return new OrderNotFoundError();
      const items = await Promise.all(order.items.map(item => 
        this.orderItemRepository.findOne({ where :{id: item.id}})
      ));
      const orderEntity = OrderEntity.create(
        order.id,
        order.orderDate,
        order.estimatedDeliveryDate,
      );

      if (orderEntity instanceof Error) return orderEntity;

      items.forEach((item) => {
        if (item instanceof Error) return;
        const domainSparePart = toDomainSparePart(item.sparePart)
        orderEntity.addItem(
          item.id, domainSparePart as SparePartEntity, 
          item.quantityOrdered, 
          item.costPerUnit,
        );
      });
      return orderEntity;
    } catch (error) {
      return new Error("Failed to find order");
    }
  }

  async update(order: OrderEntity): Promise<void> {
    try {
  
      const orderToUpdate = await this.orderRepository.findOne({
        where: { id: order.id },
        relations: ["items"],
      });
  
      if (!orderToUpdate) throw new OrderNotFoundError();
  
      orderToUpdate.orderDate = order.getOrderDate();
      orderToUpdate.estimatedDeliveryDate = order.getEstimatedDeliveryDate();
      orderToUpdate.totalCost = order.getTotalCost();
  
      const itemsToOrm = order.getItems().map((item) => 
        this.orderItemRepository.create({
          id: item.getId(),
          sparePart: toOrmSpartPart(item.sparePart), 
          quantityOrdered: item.quantityOrdered.value,
          costPerUnit: item.costPerUnit.value,
          deliveredQuantity: item.deliveredQuantity.value,
        })
      );
  
      orderToUpdate.items = itemsToOrm;
      await this.orderRepository.save(orderToUpdate);
    } catch (error) {
      throw new Error("Failed to update order");
    }
  }
  
}
