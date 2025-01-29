import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";
import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
import { SparePartNotFoundError } from "@domain/errors/sparePart/SparePartNotFoundError";
import { OrderItem } from "@infrastructure/order-items/order-item.entity";

export const toDomainOrderItem = async(orderItem: OrderItem, sparePartRepository): Promise<OrderItemEntity | Error> => {
    const sparePart = await sparePartRepository.findOne({ where: { id: orderItem.id } });
    if (!sparePart) return new SparePartNotFoundError();

    return OrderItemEntity.create(
      orderItem.id,
      SparePartEntity.create(
        sparePart.id,
        sparePart.name,
        sparePart.quantityInStock,
        sparePart.criticalLevel,
        sparePart.cost
      ) as SparePartEntity,
      orderItem.quantityOrdered,
      orderItem.costPerUnit,
      orderItem.deliveredQuantity
    ) as OrderItemEntity;
}
