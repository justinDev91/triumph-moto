import { MotorcycleRepositoryInterface } from '@application/repositories/MotorcycleRepositoryInterface';
import { UserRepositoryInterface } from '@application/repositories/UserRepositoryInterface';
import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CreateLocationUsecase {
  constructor(
    private readonly locationRepository: LocationRepositoryInterface,
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface
  ) {}

  public async execute(
    motorcycleId: string,
    userId: string,
    startDate: Date,
    endDate: Date,
    cost: number
  ): Promise<void | Error> {
    try {
      const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
      if (motorcycle instanceof Error) return motorcycle;

      const user = await this.userRepository.findOne(userId);
      if (user instanceof Error) return user;

      const locationEntity = LocationEntity.create(
        null,
        motorcycle,
        user,
        startDate,
        endDate,
        "in-progress",
        cost
      );

      if (locationEntity instanceof Error) return locationEntity;

    await this.locationRepository.create(locationEntity);
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
