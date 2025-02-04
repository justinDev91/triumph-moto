import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";

export class GetWarrantyDetailsUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepositoryInterface) {}

  async execute(id: string): Promise<object | Error> {
    const warranty = await this.warrantyRepository.findById(id);
    console.log("waaaaaa", warranty)
    if (warranty instanceof Error) return warranty 

    return warranty.getDetails();
  }
}
