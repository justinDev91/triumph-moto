import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";

export class GetAllWarrantiesUseCase {
  constructor(
    private readonly warrantyRepository: WarrantyRepositoryInterface, 
  ) {}

  async execute(): Promise<WarrantyEntity[] | Error> {
    return this.warrantyRepository.findAll();
  }
}
