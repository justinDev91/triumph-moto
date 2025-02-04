import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";

export class UpdateWarrantyUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepositoryInterface) {}

  async execute(
    id: string,
    coverageDetails: string,
    isActive: boolean,
  ): Promise<void | Error> {
    const warranty = await this.warrantyRepository.findById(id);

    if(warranty instanceof Error) return  warranty

    await this.warrantyRepository.update(id, coverageDetails, isActive);

  }
}
