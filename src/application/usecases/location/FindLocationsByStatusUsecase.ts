import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";
import { LocationStatus } from "@domain/types/LocationStatus";

export class FindLocationsByStatusUsecase {
    constructor(private readonly locationRepository: LocationRepositoryInterface) {}
  
    public async execute(status: LocationStatus): Promise<LocationEntity[] | Error> {
      try {
        return await this.locationRepository.findByStatus(status);
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }