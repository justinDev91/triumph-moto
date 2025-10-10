import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserEntity } from "@domain/entities/user/UserEntity";

export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface, 
  ) {}

  async execute(id: string): Promise<UserEntity | Error> {
    return this.userRepository.findOne(id); 
  }
}
