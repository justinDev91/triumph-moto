import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";

export class UseSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(id: string, quantity: number): Promise<boolean | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
    
    if(sparePart instanceof Error) return sparePart

    return sparePart.use(quantity);
  }
}
