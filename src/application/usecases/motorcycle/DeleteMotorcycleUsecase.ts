import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";

export class DeleteMotorcycleUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(id: string): Promise<void | Error> {
    await this.motorcycleRepository.delete(id);
  }
}
