import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";
import { OrderItem } from "@infrastructure/order-items/order-item.entity";
import { toOrmSpartPart } from "../sparPart/to-orm-spart-part";

export const toOrmOrderItem = (domainOrderItem: OrderItemEntity): OrderItem => {
    return {
      sparePart: toOrmSpartPart(domainOrderItem.sparePart) ?? null,
      quantityOrdered: domainOrderItem.quantityOrdered.value,
      costPerUnit: domainOrderItem.costPerUnit.value,
      deliveredQuantity: domainOrderItem.deliveredQuantity.value
    } as OrderItem;
};
