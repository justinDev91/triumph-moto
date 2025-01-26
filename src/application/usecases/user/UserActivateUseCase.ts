import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserEntity } from "@domain/entities/user/UserEntity";

export class UserActivateUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(userId: string): Promise<UserEntity | Error> {
    const user = await this.userRepository.findOne(userId);

    if (user instanceof Error) return user

    user.activate();

    await this.userRepository.update(user);

    return user;
  }
}
