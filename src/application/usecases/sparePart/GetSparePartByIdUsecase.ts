import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";
import { SparePartEntity } from "@domain/entities/order/SparePartEntity";

export class GetSparePartByIdUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<SparePartEntity | Error> {
    return await this.sparePartRepository.findById(id);
  }
}
