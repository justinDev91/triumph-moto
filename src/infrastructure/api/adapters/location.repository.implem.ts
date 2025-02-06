import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { LocationStatusEnum } from "@api/types/LocationStatusEnum";  
import { LocationNotFoundError } from "@domain/errors/location/LocationNotFoundError";  
import {  Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { toOrmLocation } from "@helpers/location/to-orm-location";
import { toDomainLocation } from "@helpers/location/to-domain-location";
import { InjectRepository } from "@nestjs/typeorm";
import { Motorcycle } from "@api/motorcycles/motorcycle.entity";
import { User } from "@api/users/user.entity";
import { Location } from "@api/locations/location.entity";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/MotorcycleNotFoundError";
import { UserNotFoundError } from "@domain/errors/user/UserNotFoundError";

@Injectable()
export class LocationRepositoryImplem implements LocationRepositoryInterface {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ) {}
  
  async endLocation(id: string): Promise<void> {
    await this.locationRepository.update(id, {
      endDate: new Date(),
      status: LocationStatusEnum.COMPLETED,
    });
  }

  async cancel(id: string): Promise<void> {
    await this.locationRepository.update(id, {
       status: LocationStatusEnum.CANCELED,
       endDate: null,
      });
  }

  public async create(location: LocationEntity): Promise<void | Error> {

    try {
      const motorcycle = await this.motorcycleRepository.findOne({
        where: { id: location.motorcycle.id },
      });

      if (!motorcycle)  return new MotorcycleNotFoundError()

      const user = await this.userRepository.findOne({
        where: { id: location.user.id },
      });

      if (!user) return new UserNotFoundError();
      
      const locationToSave = this.locationRepository.create({
        motorcycle,
        user,
        startDate:  new Date(location.startDate.value),
        endDate: new Date(location.endDate.value),
        cost: location.cost,
      });
      
      await this.locationRepository.save(locationToSave);
    } catch (error) {
      return new Error("Failed to save location: " + (error instanceof Error ? error.message : "Unknown error"));
    }
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
