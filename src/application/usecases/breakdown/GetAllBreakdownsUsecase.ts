import { BreakdownRepositoryInterface } from '@application/repositories/BreakdownRepositoryInterface';
import { BreakdownEntity } from '@domain/entities/breakdown/BreakdownEntity';

export class GetAllBreakdownsTrialUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  public async execute(): Promise<BreakdownEntity[] | Error> {
    return await this.breakdownRepository.findAll();
  }
}
