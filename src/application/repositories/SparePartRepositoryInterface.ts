import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
import { SparePartNotFoundError } from "@domain/errors/sparePart/SparePartNotFoundError";

export interface SparePartRepositoryInterface {
  save(sparePart: SparePartEntity): Promise<void>;
  findById(id: string): Promise<SparePartEntity | SparePartNotFoundError>;
  findAll(): Promise<SparePartEntity[] | SparePartNotFoundError>;
}
