import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
import { SparePart } from "@infrastructure/spart-parts/spart-part.entity";

export const toDomainSparePart = (sparePart: SparePart) :SparePartEntity| Error => {
    return SparePartEntity.create(
      sparePart.id,
      sparePart.name,
      sparePart.quantityInStock,
      sparePart.criticalLevel,
      sparePart.cost,      
    );
}