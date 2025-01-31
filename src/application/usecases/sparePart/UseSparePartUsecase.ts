import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";

export class UseSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(id: string, quantity: number): Promise<boolean | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
    
    if(sparePart instanceof Error) return sparePart

    sparePart.use(quantity)

    await this.sparePartRepository.use(
      id, 
      sparePart.quantityInStock.value,
      sparePart.getTotalUsage(),
      sparePart.getReservedStock()
    )
    return true

  }
}
