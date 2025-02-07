import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { SearchQueryCannotBeEmptyError } from "@domain/errors/user/SearchQueryCannotBeEmptyError";

export class SearchUserByFirstOrLastNameUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(query: string): Promise<UserEntity[] | Error> {
    if (!query) return new SearchQueryCannotBeEmptyError();
    return this.userRepository.findByFirstOrLastName(query);
  }
}
