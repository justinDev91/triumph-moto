import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";

export class UpdateServiceDetailsUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(id: string, newServiceMileage: number, serviceDate: Date): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findById(id);

    if(motorcycle instanceof Error) return motorcycle

    motorcycle.updateServiceDetails(newServiceMileage, serviceDate);

    await this.motorcycleRepository.updateServiceDetails(id, newServiceMileage, serviceDate);
  }
}
