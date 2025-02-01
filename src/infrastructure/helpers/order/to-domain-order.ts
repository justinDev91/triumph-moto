import { OrderEntity } from "@domain/entities/order/OrderEntity";
import { Order } from "@infrastructure/orders/order.entity";

export const toDomainOrder = async (
  order: Order,
): Promise<OrderEntity | Error> => {

  return OrderEntity.create(
    order.id, 
    order.orderDate, 
    order.estimatedDeliveryDate,
  );
};
