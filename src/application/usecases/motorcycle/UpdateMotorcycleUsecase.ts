import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";

export class UpdateMotorcycleUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(motorcycle: MotorcycleEntity): Promise<void | Error> {
    await this.motorcycleRepository.update(motorcycle);
  }
}
