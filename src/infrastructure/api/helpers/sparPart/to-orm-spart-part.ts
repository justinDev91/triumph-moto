import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
import { SparePart } from "@api/spare-parts/spare-part.entity";

export const toOrmSpartPart = (sparePartEntity: SparePartEntity): SparePart => {
    const sparePart = new SparePart();
    sparePart.name = sparePartEntity.name.value;
    sparePart.quantityInStock = sparePartEntity.quantityInStock.value;
    sparePart.criticalLevel = sparePartEntity.criticalLevel.value;
    sparePart.cost = sparePartEntity.cost.value;
    sparePart.totalUsage = sparePartEntity.getTotalUsage();
    sparePart.reservedStock = sparePartEntity.getReservedStock();
    return sparePart;
  }