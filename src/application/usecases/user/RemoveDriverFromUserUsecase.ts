import { DriverRepositoryInterface } from '@application/repositories/DriverRepositoryInterface';
import { UserRepositoryInterface } from '@application/repositories/UserRepositoryInterface';

export class RemoveDriverFromUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly driverRepository: DriverRepositoryInterface
  ) {}

  public async execute(userId: string, driverId: string): Promise<void | Error> {
    const user = await this.userRepository.findOne(userId);

    if(user instanceof Error) return user

    await this.driverRepository.delete(driverId);
    user.removeDriver(driverId);

    await this.userRepository.update(user);
  }
}
