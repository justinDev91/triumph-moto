import { SparePartRepositoryInterface } from '@application/repositories/SparePartRepositoryInterface';
import { SparePartEntity } from '@domain/entities/order/SparePartEntity';
import { SearchQueryCannotBeEmptyError } from "@domain/errors/user/SearchQueryCannotBeEmptyError";

export class SearchByNameUseCase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface
  ) {}

  async execute(query: string): Promise<SparePartEntity[] | Error> {
    if (!query) return new SearchQueryCannotBeEmptyError();
    return this.sparePartRepository.searchByName(query);
  }
}
