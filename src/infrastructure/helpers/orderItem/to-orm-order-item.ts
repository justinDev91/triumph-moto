import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";
import { OrderItem } from "@infrastructure/order-items/order-item.entity";
import { SparePart } from "@infrastructure/spart-parts/spart-part.entity";

export const toOrmOrderItem = (domainOrderItem: OrderItemEntity, sparePart: SparePart): OrderItem => {
    return {
      sparePart: sparePart,
      quantityOrdered: domainOrderItem.quantityOrdered.value,
      costPerUnit: domainOrderItem.costPerUnit.value,
      deliveredQuantity: domainOrderItem.deliveredQuantity.value
    } as OrderItem;
};
