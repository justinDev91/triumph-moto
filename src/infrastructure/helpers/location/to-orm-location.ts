import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { Location } from "@infrastructure/locations/location.entity";
import { toOrmMotorcycle } from "../motorcycle/to-orm-motorcycle";
import { toOrmUser } from "../user/to-orm-user";
import { LocationStatusEnum } from "@infrastructure/types/LocationStatusEnum";

export const toOrmLocation = (location: LocationEntity): Location => {
  const locationOrm = new Location();
  toOrmMotorcycle(location.motorcycle);
  toOrmUser(location.user);
  locationOrm.startDate = location.startDate.value;
  locationOrm.endDate = location.endDate ? location.endDate.value : null;
  locationOrm.status = location.status as LocationStatusEnum;
  locationOrm.cost = location.cost;
  return locationOrm;
};
