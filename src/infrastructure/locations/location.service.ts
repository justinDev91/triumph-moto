import { Injectable } from '@nestjs/common';
import { LocationEntity } from '@domain/entities/location/LocationEntity';
import { LocationStatus } from '@domain/types/LocationStatus';
import { CalculateLocationCostUsecase } from '@application/usecases/location/CalculateLocationCostUsecase';
import { CancelLocationUsecase } from '@application/usecases/location/CancelLocationUsecase';
import { CreateLocationUsecase } from '@application/usecases/location/CreateLocationUsecase';
import { EndLocationUsecase } from '@application/usecases/location/EndLocationUsecase';
import { FindLocationByMotorcycleUsecase } from '@application/usecases/location/FindLocationByMotorcycleUsecase';
import { FindLocationByUserUsecase } from '@application/usecases/location/FindLocationByUserUsecase';
import { FindLocationsByStatusUsecase } from '@application/usecases/location/FindLocationsByStatusUsecase';
import { GetAllLocationsUsecase } from '@application/usecases/location/GetAllLocationsUsecase';
import { GetLocationByIdUsecase } from '@application/usecases/location/GetLocationByIdUsecase';
import { UpdateLocationUsecase } from '@application/usecases/location/UpdateLocationUsecase';
import { LocationRepositoryImplem } from '@infrastructure/adapters/location.repository.implem';
import { CreateLocationDto } from './dto/create-location.dto';
import { MotorcycleRepositoryImplem } from '@infrastructure/adapters/motorcycle.repository.implem';
import { UserRepositoryImplem } from '@infrastructure/adapters/user.repository.implem';

@Injectable()
export class LocationService {
  private readonly calculateLocationCostUsecase: CalculateLocationCostUsecase;
  private readonly cancelLocationUsecase: CancelLocationUsecase;
  private readonly createLocationUsecase: CreateLocationUsecase;
  private readonly endLocationUsecase: EndLocationUsecase;
  private readonly findLocationByMotorcycleUsecase: FindLocationByMotorcycleUsecase;
  private readonly findLocationByUserUsecase: FindLocationByUserUsecase;
  private readonly findLocationsByStatusUsecase: FindLocationsByStatusUsecase;
  private readonly getAllLocationsUsecase: GetAllLocationsUsecase;
  private readonly getLocationByIdUsecase: GetLocationByIdUsecase;
  private readonly updateLocationUsecase: UpdateLocationUsecase;

  constructor(
    private readonly locationRepository: LocationRepositoryImplem,
    private readonly motorcycleRepository: MotorcycleRepositoryImplem,
    private readonly userRepository: UserRepositoryImplem
  ) {
    this.calculateLocationCostUsecase = new CalculateLocationCostUsecase(locationRepository);
    this.cancelLocationUsecase = new CancelLocationUsecase(locationRepository);
    this.createLocationUsecase = new CreateLocationUsecase(locationRepository, motorcycleRepository, userRepository);
    this.endLocationUsecase = new EndLocationUsecase(locationRepository);
    this.findLocationByMotorcycleUsecase = new FindLocationByMotorcycleUsecase(locationRepository);
    this.findLocationByUserUsecase = new FindLocationByUserUsecase(locationRepository);
    this.findLocationsByStatusUsecase = new FindLocationsByStatusUsecase(locationRepository);
    this.getAllLocationsUsecase = new GetAllLocationsUsecase(locationRepository);
    this.getLocationByIdUsecase = new GetLocationByIdUsecase(locationRepository);
    this.updateLocationUsecase = new UpdateLocationUsecase(locationRepository);
  }

  public async createLocation(createLocationDto: CreateLocationDto): Promise<void | Error> {
    const {motorcycleId, userId, startDate, endDate, cost} = createLocationDto
    await this.createLocationUsecase.execute(motorcycleId, userId, startDate, endDate, cost);
  }

  public async cancelLocation(locationId: string): Promise<LocationEntity | Error> {
    return this.cancelLocationUsecase.execute(locationId);
  }

  public async calculateLocationCost(locationId: string): Promise<number | Error> {
    return this.calculateLocationCostUsecase.execute(locationId);
  }

  public async endLocation(locationId: string, endDate: Date): Promise<LocationEntity | Error> {
    return this.endLocationUsecase.execute(locationId, endDate);
  }

  public async findLocationByMotorcycle(motorcycleId: string): Promise<LocationEntity[] | Error> {
    return this.findLocationByMotorcycleUsecase.execute(motorcycleId);
  }

  public async findLocationByUser(userId: string): Promise<LocationEntity[] | Error> {
    return this.findLocationByUserUsecase.execute(userId);
  }

  public async findLocationsByStatus(status: LocationStatus): Promise<LocationEntity[] | Error> {
    return this.findLocationsByStatusUsecase.execute(status);
  }

  public async getAllLocations(): Promise<LocationEntity[] | Error> {
    return this.getAllLocationsUsecase.execute();
  }

  public async getLocationById(id: string): Promise<LocationEntity | Error> {
    return this.getLocationByIdUsecase.execute(id);
  }

  public async updateLocation(location: LocationEntity): Promise<LocationEntity | Error> {
    return this.updateLocationUsecase.execute(location);
  }
}
