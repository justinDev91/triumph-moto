import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
export interface SparePartRepositoryInterface {
  save(sparePart: SparePartEntity): Promise<void>;
  findById(id: string): Promise<SparePartEntity | Error>;
  findAll(): Promise<SparePartEntity[] | Error>;
  remove(id: string):  Promise<void>;
  restock(id, quantity: number):  Promise<void>;
  reserve(id, quantity: number):  Promise<void>;
  use(id, quantityInStock, totalUsage, reservedStock): Promise<void>;
}
