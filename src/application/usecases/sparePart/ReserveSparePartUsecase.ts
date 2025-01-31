import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";

export class ReserveSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(id: string, quantity: number): Promise<boolean | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
    
    if(sparePart instanceof Error) return sparePart

    sparePart.reserve(quantity);

    await this.sparePartRepository.reserve(id, sparePart.getReservedStock())

    return true
  }
}
