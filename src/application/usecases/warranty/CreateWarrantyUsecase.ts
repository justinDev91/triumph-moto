import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";

export class CreateWarrantyUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepositoryInterface) {}

  async execute(
    motorcycle: MotorcycleEntity,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): Promise<WarrantyEntity | Error> {

    const warranty = WarrantyEntity.create(
      null,
      motorcycle,
      startDateValue,
      endDateValue,
      coverageDetailsValue,
      isActive
    );

    if (warranty instanceof Error) return warranty;  
  
    return await this.warrantyRepository.save(warranty);

  }
}
