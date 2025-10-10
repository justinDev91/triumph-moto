import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";

export class DeleteWarrantyUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepositoryInterface) {}

  async execute(id: string): Promise<void | Error> {
    const warranty = await this.warrantyRepository.findById(id);

    if (warranty instanceof Error) return warranty
     

    await this.warrantyRepository.remove(id);
  }
}
