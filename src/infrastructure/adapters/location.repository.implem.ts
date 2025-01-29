import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { LocationStatusEnum } from "@infrastructure/types/LocationStatusEnum";  
import { LocationNotFoundError } from "@domain/errors/location/LocationNotFoundError";  
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { toOrmLocation } from "@infrastructure/helpers/location/to-orm-location";
import { toDomainLocation } from "@infrastructure/helpers/location/to-domain-location";
import { Location } from "@infrastructure/locations/location.entity";

@Injectable()
export class LocationRepositoryImplementation implements LocationRepositoryInterface {
  constructor(
    private readonly locationRepository: Repository<Location>
  ) {}

  public async create(location: LocationEntity): Promise<LocationEntity> {
    const locationOrm = toOrmLocation(location);  

    const savedLocation = await this.locationRepository.save(locationOrm);
    return toDomainLocation(savedLocation);  
  }

  public async update(updatedData: LocationEntity): Promise<LocationEntity> {
    const locationOrm = toOrmLocation(updatedData);
    const updatedLocation = await this.locationRepository.save(locationOrm);
    return toDomainLocation(updatedLocation);
  }

  public async findById(id: string): Promise<LocationEntity | Error> {
    const locationOrm = await this.locationRepository.findOne({
      where: { id },
      relations: ["motorcycle", "user"],
    });

    if (!locationOrm) {
      return new LocationNotFoundError();
    }

    return toDomainLocation(locationOrm);
  }


  public async findByMotorcycleId(motorcycleId: string): Promise<LocationEntity[] | Error> {
    const locationsOrm = await this.locationRepository.find({
      where: { motorcycle: { id: motorcycleId } },
      relations: ["motorcycle", "user"],
    });

    if (locationsOrm.length === 0) {
      return new LocationNotFoundError();
    }

    return locationsOrm.map((locationOrm) => toDomainLocation(locationOrm));
  }

  public async findByUserId(userId: string): Promise<LocationEntity[] | Error> {
    const locationsOrm = await this.locationRepository.find({
      where: { user: { id: userId } },
      relations: ["motorcycle", "user"],
    });

    if (locationsOrm.length === 0) {
      return new LocationNotFoundError();
    }

    return locationsOrm.map((locationOrm) => toDomainLocation(locationOrm));
  }

  public async deleteById(id: string): Promise<boolean> {
    const locationOrm = await this.locationRepository.findOne({ where: { id } });

    if (!locationOrm) {
      throw new LocationNotFoundError();
    }

    await this.locationRepository.remove(locationOrm);
    return true;
  }

  public async findByStatus(status: LocationStatusEnum): Promise<LocationEntity[] | Error> {
    const locationsOrm = await this.locationRepository.find({
      where: { status },
      relations: ["motorcycle", "user"],
    });

    if (locationsOrm.length === 0) {
      return new LocationNotFoundError();
    }

    return locationsOrm.map((locationOrm) => toDomainLocation(locationOrm));
  }

  public async findAll(): Promise<LocationEntity[] | Error> {
    const locationsOrm = await this.locationRepository.find({
      relations: ["motorcycle", "user"],
    });

    if (locationsOrm.length === 0) {
      return new LocationNotFoundError();
    }

    return locationsOrm.map((locationOrm) => toDomainLocation(locationOrm));
  }
}
