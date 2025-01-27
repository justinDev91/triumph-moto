import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";
import { LocationStatus } from "@domain/types/LocationStatus";

export class CreateLocationUsecase {
    constructor(private readonly locationRepository: LocationRepositoryInterface) {}
  
    public async execute(
      id: string,
      motorcycle: MotorcycleEntity,
      user: UserEntity,
      startDate: Date,
      endDate: Date,
      status: LocationStatus,
      cost: number
    ): Promise<LocationEntity | Error> {
      try {
        const location = LocationEntity.create(id, motorcycle, user, startDate, endDate, status, cost);
        if (location instanceof Error) return location;
  
        return await this.locationRepository.create(location);
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }