import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";

export class GetUserRoleUsecase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async execute(userId: string): Promise<string | Error> {
    const user = await this.userRepository.findOne(userId);

    if(user instanceof Error) return user

    return user.getRole();
  }
}
