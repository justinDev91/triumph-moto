import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { LocationStatus } from "@domain/types/LocationStatus";

export interface LocationRepositoryInterface {
    create(locationEntity: LocationEntity): Promise<LocationEntity>;
    update(updatedData): Promise<LocationEntity>;
    findById(id: string): Promise<LocationEntity | Error>;
    findByMotorcycleId(motorcycleId: string): Promise<LocationEntity[] | Error>;
    findByUserId(userId: string): Promise<LocationEntity[] | Error>;
    deleteById(id: string): Promise<boolean>;
    findByStatus(status: LocationStatus): Promise<LocationEntity[] | Error>;
    findAll():  Promise<LocationEntity[] | Error>;
}