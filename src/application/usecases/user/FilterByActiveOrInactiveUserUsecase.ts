import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { InvalidStatusError } from "@domain/errors/user/InvalidStatusError";

export class FilterByActiveOrInactiveUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(status: 'active' | 'inactive'): Promise<UserEntity[] | Error> {
    if (status !== 'active' && status !== 'inactive') {
      return new InvalidStatusError();
    }
    
    const users = await this.userRepository.findByStatus(status === 'active');
    return users;
  }
}
