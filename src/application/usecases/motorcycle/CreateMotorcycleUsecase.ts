import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";
import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { MotorStatus } from "@domain/types/motorcycle";

export class CreateMotorcycleUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly companyRepository: CompanyRepositoryInterface 
  ) {}

  public async execute(
    brand: string,
    model: string,
    year: number,
    mileage: number,
    status: MotorStatus,
    purchaseDate: Date,
    lastServiceDate: Date | null,
    nextServiceMileage: number,
    companyId: string | null = null
  ): Promise<void | Error> {

   const company = await this.companyRepository.findById(companyId);
      if (company instanceof Error) return company;
  
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
      company
    );

    if (motorcycle instanceof Error) return motorcycle;

    await this.motorcycleRepository.save(motorcycle);
  }
}
