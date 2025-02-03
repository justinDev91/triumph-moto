import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class EndLocationUsecase {
    constructor(private readonly locationRepository: LocationRepositoryInterface) {}
  
    public async execute(locationId: string): Promise<void | Error> {
      try {
        const location = await this.locationRepository.findById(locationId);
        if (location instanceof Error) return location;
  
        const endResult = location.endLocation();
        if (endResult instanceof Error) return endResult;
  
        await this.locationRepository.endLocation(locationId);
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }