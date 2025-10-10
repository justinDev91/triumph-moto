import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";

export class FindBreakdownByIdUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  public async execute(breakdownId: string): Promise<BreakdownEntity | Error> {
    return await this.breakdownRepository.findOneById(breakdownId);
  }
}
