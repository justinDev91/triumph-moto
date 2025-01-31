import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";

export class DeleteSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<void | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
    if (sparePart instanceof Error) return sparePart;

    await this.sparePartRepository.remove(id);
  }
}
