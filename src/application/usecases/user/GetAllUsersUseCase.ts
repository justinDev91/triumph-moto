import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserEntity } from "@domain/entities/user/UserEntity";

export class GetAllUsersUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface, 
  ) {}

  async execute(): Promise<UserEntity[] | Error> {
    return this.userRepository.findAll();
  }
}
