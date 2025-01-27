import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { WarrantyNotFoundError } from "@domain/errors/warranty/WarrantyNotFoundError";

export interface WarrantyRepositoryInterface {
  save(warranty: WarrantyEntity): Promise<void>;
  findById(id: string): Promise<WarrantyEntity | WarrantyNotFoundError>;
  findByMotorcycleId(motorcycleId: string): Promise<WarrantyEntity | WarrantyNotFoundError>;
  update(warranty: WarrantyEntity): Promise<void>;
  deleteById(id: string): Promise<void>;
}