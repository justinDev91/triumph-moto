import { OrderEntity } from "@domain/entities/order/OrderEntity";

export interface OrderRepositoryInterface {
  save(order: OrderEntity): Promise<void>;
  findById(orderId: string): Promise<OrderEntity | Error>;
  findByDateRange(startDate: Date, endDate: Date): Promise<OrderEntity[] | Error>;
  update(order: OrderEntity): Promise<void>;
  findAll():  Promise<OrderEntity[] | Error>;
}