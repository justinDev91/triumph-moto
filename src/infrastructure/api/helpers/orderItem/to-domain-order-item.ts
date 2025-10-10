import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";
import { OrderItem } from "@api/order-items/order-item.entity";
import { toDomainSparePart } from "../sparPart/to-domain-spare-part";

export const toDomainOrderItem = async (
  orderItem: OrderItem,
): Promise<OrderItemEntity | Error> => {
  const sparePart = await toDomainSparePart(orderItem.sparePart);
  
  if (sparePart instanceof Error) {
    return sparePart;
  }

  return OrderItemEntity.create(
    orderItem.id,
    sparePart ?? null, 
    orderItem.quantityOrdered,
    orderItem.costPerUnit,
    orderItem.deliveredQuantity
  );
};
