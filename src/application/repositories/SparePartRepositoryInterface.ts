import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
export interface SparePartRepositoryInterface {
  save(sparePart: SparePartEntity): Promise<void>;
  findById(id: string): Promise<SparePartEntity | Error>;
  findAll(): Promise<SparePartEntity[] | Error>;
}
