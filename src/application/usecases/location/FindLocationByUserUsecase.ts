import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class FindLocationByUserUsecase {
    constructor(private readonly locationRepository: LocationRepositoryInterface) {}
  
    public async execute(userId: string): Promise<LocationEntity[] | Error> {
      try {
        return await this.locationRepository.findByUserId(userId);
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }