import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";

export class RestockSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(id: string, quantity: number): Promise<void | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
   
    if(sparePart instanceof Error) return sparePart

    sparePart.restock(quantity);
    await this.sparePartRepository.restock(id, sparePart.quantityInStock.value);
  }
}
