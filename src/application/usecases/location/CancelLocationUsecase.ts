import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CancelLocationUsecase {
    constructor(private readonly locationRepository: LocationRepositoryInterface) {}
  
    public async execute(locationId: string): Promise<LocationEntity | Error> {
      try {
        const location = await this.locationRepository.findById(locationId);
        if (location instanceof Error) return location;
  
        const cancelResult = location.cancelLocation();
        if (cancelResult instanceof Error) return cancelResult;
  
        return await this.locationRepository.update({ status: location.status, endDate: null });
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }
  