import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserEntity } from "@domain/entities/user/UserEntity";

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(email: string): Promise<UserEntity | Error> {
    return this.userRepository.findOneByEmail(email);
  }
}
