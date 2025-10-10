import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { Location } from "@api/locations/location.entity";
import { LocationStatusEnum } from "@api/types/LocationStatusEnum";
import { toOrmMotorcycleCreate } from "../motorcycle/to-orm-motorcycle-create";
import { toOrmUserCreate } from "../user/to-orm-user-create";

export const toOrmLocationCreate = (location: LocationEntity): Location => {
  const locationOrm = new Location();
  locationOrm.motorcycle = locationOrm.motorcycle ? toOrmMotorcycleCreate(location.motorcycle) : null;
  locationOrm.user =  locationOrm.user ?  toOrmUserCreate(location.user) : null;
  locationOrm.id = location.id;
  locationOrm.startDate = location.startDate.value;
  locationOrm.endDate = location.endDate ? location.endDate.value : null;
  locationOrm.status = location.status as LocationStatusEnum;
  locationOrm.cost = location.cost;
  return locationOrm;
};
