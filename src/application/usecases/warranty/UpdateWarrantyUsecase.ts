import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";

export class UpdateWarrantyUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepositoryInterface) {}

  async execute(
    id: string,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): Promise<WarrantyEntity | Error> {
    const warranty = await this.warrantyRepository.findById(id);

    if(warranty instanceof Error) return  warranty

    const updatedWarranty = WarrantyEntity.create(
      id,
      warranty.motorcycle,
      startDateValue,
      endDateValue,
      coverageDetailsValue,
      isActive
    );

    if (updatedWarranty instanceof Error) {
      return updatedWarranty;
    }

    await this.warrantyRepository.update(updatedWarranty);

    return updatedWarranty;
  }
}
