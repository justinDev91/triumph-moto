import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CreateWarrantyUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepositoryInterface) {}

  async execute(
    id: string,
    motorcycle: MotorcycleEntity,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): Promise<WarrantyEntity | Error> {
    
    const existingWarranty = await this.warrantyRepository.findByMotorcycleId(motorcycle.id);
    if (existingWarranty) {
      return new Error("Warranty already exists for this motorcycle");
    }

    const warranty = WarrantyEntity.create(
      id,
      motorcycle,
      startDateValue,
      endDateValue,
      coverageDetailsValue,
      isActive
    );

    if (warranty instanceof Error) {
      return warranty;  
    }

    try {
      await this.warrantyRepository.save(warranty);
    } catch (error) {
      return new UnexpectedError("Failed to save warranty: " + error.message);
    }

    return warranty;  
  }
}
