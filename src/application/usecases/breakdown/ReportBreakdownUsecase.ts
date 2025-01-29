import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";

export class ReportBreakdownUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  public async execute(
    motorcycle: MotorcycleEntity,
    descriptionValue: string,
    reportedDateValue: Date,
    warranty: WarrantyEntity | null,
  ): Promise<void | Error> {
    const breakdown = BreakdownEntity.create(
      null,
      motorcycle,
      descriptionValue,
      reportedDateValue,
      warranty,
    );

    if (breakdown instanceof Error) return breakdown;

    await this.breakdownRepository.save(breakdown);
  }
}
