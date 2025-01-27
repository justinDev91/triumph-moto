import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";
import { OrderItemNotFoundError } from "@domain/errors/orderItem/OrderItemNotFoundError";

export interface OrderItemRepository {
  save(orderItem: OrderItemEntity): Promise<void>;
  findById(orderItemId: string): Promise<OrderItemEntity | OrderItemNotFoundError>;
  findByOrderId(orderId: string): Promise<OrderItemEntity[] | OrderItemNotFoundError>;
}
