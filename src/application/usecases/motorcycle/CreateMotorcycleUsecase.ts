import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { MotorStatus } from "@domain/types/motorcycle";

export class CreateMotorcycleUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(
    brand: string,
    model: string,
    year: number,
    mileage: number,
    status: MotorStatus,
    purchaseDate: Date,
    lastServiceDate: Date | null,
    nextServiceMileage: number,
    company: CompanyEntity | null = null,
  ): Promise<void | Error> {

    const motorcycle = MotorcycleEntity.create(
      null,
      brand,
      model,
      year,
      mileage,
      status,
      purchaseDate,
      lastServiceDate,
      nextServiceMileage,
      null,
      null,
      company,
    );

    if(motorcycle instanceof Error) return motorcycle

    await this.motorcycleRepository.save(motorcycle);
  }
}
