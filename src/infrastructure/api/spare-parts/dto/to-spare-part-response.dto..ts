
import { SparePartEntity } from '@domain/entities/order/SparePartEntity';
import { ResponseSparePartDto } from './response-spare-part.dto';

export const toSparePartResponse = (sparePart: SparePartEntity): ResponseSparePartDto => ({
    id: sparePart.id, 
    name: sparePart.name.value,
    quantityInStock: sparePart.quantityInStock.value,
    criticalLevel: sparePart.criticalLevel.value,
    cost: sparePart.cost.value,
});