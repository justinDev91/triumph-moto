import { WarrantyRepositoryInterface } from "@application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { SearchQueryCannotBeEmptyError } from "@domain/errors/user/SearchQueryCannotBeEmptyError";

export class SearchWarrantyByMotorcycleBrandUseCase {
  constructor(
    private readonly warrantyRepository: WarrantyRepositoryInterface,
  ) {}

  async execute(query: string): Promise<WarrantyEntity[] | Error> {
    if (!query) return new SearchQueryCannotBeEmptyError()
    return this.warrantyRepository.searchByMotorcycleBrand(query);
  }
}
