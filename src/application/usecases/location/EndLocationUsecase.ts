import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class EndLocationUsecase {
    constructor(private readonly locationRepository: LocationRepositoryInterface) {}
  
    public async execute(locationId: string, endDate: Date): Promise<LocationEntity | Error> {
      try {
        const location = await this.locationRepository.findById(locationId);
        if (location instanceof Error) return location;
  
        const endResult = location.endLocation(endDate);
        if (endResult instanceof Error) return endResult;
  
        return await this.locationRepository.update({ endDate: location.endDate, status: location.status });
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }