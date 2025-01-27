import { OrderEntity } from "@domain/entities/order/OrderEntity";
import { OrderNotFoundError } from "@domain/errors/order/OrderNotFoundError";

export interface OrderRepositoryInterface {
  save(order: OrderEntity): Promise<void>;
  findById(orderId: string): Promise<OrderEntity | OrderNotFoundError>;
  findByDateRange(startDate: Date, endDate: Date): Promise<OrderEntity[] | OrderNotFoundError>;
}