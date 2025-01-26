import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";

export class CheckUserIsAdminUsecase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async execute(userId: string): Promise<boolean | Error> {
    const user = await this.userRepository.findOne(userId);

    if(user instanceof Error) return user

    return user.isAdmin();
  }
}
