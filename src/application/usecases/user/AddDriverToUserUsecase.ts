import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";
import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";

export class AddDriverToUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly driverRepository: DriverRepositoryInterface
  ) {}

  public async execute(userId: string, driver: DriverEntity): Promise<void | Error> {
    const user = await this.userRepository.findOne(userId);

    if(user instanceof Error) return user

    await this.driverRepository.save(driver);
    user.addDriver(driver);

    await this.userRepository.update(user);
  }

}
