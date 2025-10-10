import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";
import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";
import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CreateBreakdownUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepositoryInterface,
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly warrantyRepository: WarrantyRepositoryInterface
  ) {}

  public async execute(
    motorcycleId: string,
    description: string,
    warrantyId: string | null
  ): Promise<void | Error> {

    const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    let warranty: WarrantyEntity | null = null;
    if (warrantyId) {
      const foundWarranty = await this.warrantyRepository.findById(warrantyId);
      if (foundWarranty instanceof Error) return foundWarranty;
      warranty = foundWarranty;
    }

    const breakdown = BreakdownEntity.create(null, motorcycle, description, new Date(), warranty);
    if (breakdown instanceof Error) return breakdown;

    try {
      await this.breakdownRepository.save(breakdown);
    } catch (error) {
      return new UnexpectedError(`Failed to save breakdown: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
