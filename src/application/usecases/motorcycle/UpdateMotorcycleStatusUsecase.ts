import { MotorcycleRepositoryInterface } from '@application/repositories/MotorcycleRepositoryInterface';
import { MotorStatus } from '@domain/types/motorcycle';

export class UpdateMotorcycleStatusUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(id: string, newStatus: MotorStatus): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findById(id);

    if(motorcycle instanceof Error) return motorcycle

    motorcycle.updateStatus(newStatus);

    await this.motorcycleRepository.updateStatus(id, newStatus);
  }
}
