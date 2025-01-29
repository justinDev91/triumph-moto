import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";

export class CreateBreakdownUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  public async execute(
    id: string,
    motorcycle: MotorcycleEntity,
    description: string,
    reportedDate: Date,
    warranty: WarrantyEntity | null,
  ): Promise<BreakdownEntity | Error> {
    return await BreakdownEntity.create(id, motorcycle, description, reportedDate, warranty);
  }
}
