import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { MotorStatus } from "@domain/types/motorcycle";

export class CreateMotorcycleUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(
    id: string,
    brand: string,
    model: string,
    year: number,
    mileage: number,
    status: MotorStatus,
    purchaseDate: Date,
    lastServiceDate: Date | null,
    nextServiceMileage: number,
    createdAt: Date,
    updatedAt: Date,
    company: CompanyEntity | null = null,
  ): Promise<void | Error> {

    const motorcycle = MotorcycleEntity.create(
      id,
      brand,
      model,
      year,
      mileage,
      status,
      purchaseDate,
      lastServiceDate,
      nextServiceMileage,
      createdAt,
      updatedAt,
      company,
    );

    if(motorcycle instanceof Error) return motorcycle

    await this.motorcycleRepository.save(motorcycle);
  }
}
