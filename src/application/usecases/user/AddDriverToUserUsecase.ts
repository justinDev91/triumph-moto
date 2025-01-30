import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";
import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";

export class AddDriverToUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly driverRepository: DriverRepositoryInterface
  ) {}

  public async execute(userId: string, driverId: string): Promise<void | Error> {
    const user = await this.userRepository.findOne(userId);
    if (user instanceof Error) return user;
    
    const driver = await this.driverRepository.findOneById(driverId);
    if (driver instanceof Error) return driver;

    driver.user = user;
    await this.driverRepository.update(driver);  
  }
}
