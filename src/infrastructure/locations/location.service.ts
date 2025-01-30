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
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { LocationRepositoryImplem } from '@infrastructure/adapters/location.repository.implem';

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
    private readonly locationRepository: LocationRepositoryImplem
  ) {
    this.calculateLocationCostUsecase = new CalculateLocationCostUsecase(locationRepository);
    this.cancelLocationUsecase = new CancelLocationUsecase(locationRepository);
    this.createLocationUsecase = new CreateLocationUsecase(locationRepository);
    this.endLocationUsecase = new EndLocationUsecase(locationRepository);
    this.findLocationByMotorcycleUsecase = new FindLocationByMotorcycleUsecase(locationRepository);
    this.findLocationByUserUsecase = new FindLocationByUserUsecase(locationRepository);
    this.findLocationsByStatusUsecase = new FindLocationsByStatusUsecase(locationRepository);
    this.getAllLocationsUsecase = new GetAllLocationsUsecase(locationRepository);
    this.getLocationByIdUsecase = new GetLocationByIdUsecase(locationRepository);
    this.updateLocationUsecase = new UpdateLocationUsecase(locationRepository);
  }

  public async createLocation(
    id: string,
    motorcycle: MotorcycleEntity,
    user: UserEntity,
    startDate: Date,
    endDate: Date,
    status: LocationStatus,
    cost: number
  ): Promise<LocationEntity | Error> {
    return this.createLocationUsecase.execute(id, motorcycle, user, startDate, endDate, status, cost);
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
