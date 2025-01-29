import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";

export interface WarrantyRepositoryInterface {
  save(warranty: WarrantyEntity): Promise<WarrantyEntity | Error>;
  findById(id: string): Promise<WarrantyEntity | Error>;
  findAll(): Promise<WarrantyEntity[] | Error>;
  findByMotorcycleId(motorcycleId: string): Promise<WarrantyEntity | Error>;
  update(warranty: WarrantyEntity): Promise<void>;
  remove(id: string): Promise<void>;
}