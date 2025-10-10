import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";

export class UpdateMileageUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(id: string, newMileage: number): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findById(id);

    if(motorcycle instanceof Error) return motorcycle

    motorcycle.updateMileage(newMileage);

    await this.motorcycleRepository.updateMileage(id, newMileage);
  }
}
