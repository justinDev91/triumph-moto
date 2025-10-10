import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";

export class GetAllMotorcyclesUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(): Promise<MotorcycleEntity[] | Error> {
    return await this.motorcycleRepository.findAll();
  }
}
