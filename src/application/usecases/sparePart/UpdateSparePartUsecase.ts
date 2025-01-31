import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";

export class UpdateSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(
    id: string,
    nameValue?: string,
    quantityInStockValue?: number,
    criticalLevelValue?: number,
    costValue?: number
  ): Promise<void | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
    if (sparePart instanceof Error) return sparePart;

    await this.sparePartRepository.save(sparePart);
  }
}
