import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";

export interface WarrantyRepositoryInterface {
  save(warranty: WarrantyEntity): Promise<WarrantyEntity | Error>;
  findById(id: string): Promise<WarrantyEntity | Error>;
  findAll(): Promise<WarrantyEntity[] | Error>;
  findByMotorcycleId(motorcycleId: string): Promise<WarrantyEntity | Error>;
  update(id: string, coverageDetails: string, isActive: boolean): Promise<void>;
  remove(id: string): Promise<void>;
}