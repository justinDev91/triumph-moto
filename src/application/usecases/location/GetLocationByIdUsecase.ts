import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";

export class GetLocationByIdUsecase {
  constructor(private readonly locationRepository: LocationRepositoryInterface) {}

  public async execute(id: string): Promise<LocationEntity | Error> {
    return await this.locationRepository.findById(id);
  }
}
