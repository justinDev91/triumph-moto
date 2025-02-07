import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserNotFoundError } from "@domain/errors/user/UserNotFoundError";

export class ToggleUserStatusUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(userId: string): Promise<void | Error> {
    const user = await this.userRepository.findOne(userId);
    
    if (user instanceof Error) return new UserNotFoundError();
    

    user.toggleStatus()

    return await this.userRepository.toggleStatus(userId, user);

  }
}
