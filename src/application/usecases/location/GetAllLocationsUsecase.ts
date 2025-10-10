import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class GetAllLocationsUsecase {
  constructor(private readonly locationRepository: LocationRepositoryInterface) {}

  public async execute(): Promise<LocationEntity[] | UnexpectedError> {
    try {
      const locations = await this.locationRepository.findAll();

      if(locations instanceof Error) return locations

      if (!locations || locations.length === 0) {
        throw new Error("No locations found");
      }

      return locations;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
