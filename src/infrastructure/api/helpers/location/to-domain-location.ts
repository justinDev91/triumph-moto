import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { LocationStatus } from "@domain/types/LocationStatus";
import { Location } from "@api/locations/location.entity";
import { toDomainMotorcycle } from "../motorcycle/to-domain-motorcycle";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { toDomainUser } from "../user/to-domain-user";
import { UserEntity } from "@domain/entities/user/UserEntity";

export const toDomainLocation = (locationOrm: Location): LocationEntity => {


  return LocationEntity.create(
    locationOrm.id,
    locationOrm.motorcycle ? toDomainMotorcycle(locationOrm.motorcycle) as MotorcycleEntity : null,
    locationOrm.user ? toDomainUser(locationOrm.user) as UserEntity: null,
    locationOrm.startDate,
    locationOrm.endDate,
    locationOrm.status as LocationStatus,
    locationOrm.cost
  ) as LocationEntity;
};
