import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";

export interface OrderItemRepositoryInterface {
  save(orderItem: OrderItemEntity): Promise<OrderItemEntity | Error>;
  findById(orderItemId: string): Promise<OrderItemEntity | Error>;
  findByOrderId(orderId: string): Promise<OrderItemEntity[] | Error>;
  findAll(): Promise<OrderItemEntity[] | Error>;
  update(orderItem: OrderItemEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
