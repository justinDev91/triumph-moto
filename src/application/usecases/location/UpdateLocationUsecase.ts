import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class UpdateLocationUsecase {
  constructor(private readonly locationRepository: LocationRepositoryInterface) {}

  public async execute(location: LocationEntity): Promise<LocationEntity | Error> {
    try {
      const existingLocation = await this.locationRepository.findById(location.id);
      if (existingLocation instanceof Error) return existingLocation;

      existingLocation.startDate = location.startDate;
      existingLocation.endDate = location.endDate;
      existingLocation.status = location.status;
      existingLocation.cost = location.cost;

      return await this.locationRepository.update(existingLocation);
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
