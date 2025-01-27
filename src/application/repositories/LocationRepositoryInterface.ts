import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { LocationNotFoundError } from "@domain/errors/location/LocationNotFoundError";
import { LocationStatus } from "@domain/types/LocationStatus";

export interface LocationRepositoryInterface {
    create(locationEntity: LocationEntity): Promise<LocationEntity>;
    update(id: string, updatedData: Partial<LocationEntity>): Promise<LocationEntity>;
    findById(id: string): Promise<LocationEntity | LocationNotFoundError>;
    findByMotorcycleId(motorcycleId: string): Promise<LocationEntity[] | LocationNotFoundError>;
    findByUserId(userId: string): Promise<LocationEntity[] | LocationNotFoundError>;
    deleteById(id: string): Promise<boolean>;
    findByStatus(status: LocationStatus): Promise<LocationEntity[] | LocationNotFoundError>;
}