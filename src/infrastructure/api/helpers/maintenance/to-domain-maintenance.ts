import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { Maintenance } from "@api/maintenances/maintenance.entity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { MaintenanceType } from "@domain/types/MaintenanceType";
import { toDomainMotorcycle } from "../motorcycle/to-domain-motorcycle";
import { toDomainConcession } from "../concession/to-domain-concession";

export const toDomainMaintenance = (maintenanceOrm: Maintenance): MaintenanceEntity => {

  return MaintenanceEntity.create(
    maintenanceOrm.id,
    maintenanceOrm.motorcycle ? toDomainMotorcycle(maintenanceOrm.motorcycle) as MotorcycleEntity : null,
    maintenanceOrm.maintenanceType as MaintenanceType,
    maintenanceOrm.date,
    maintenanceOrm.cost,
    maintenanceOrm.mileageAtService,
    maintenanceOrm.maintenanceIntervalMileage,
    maintenanceOrm.maintenanceIntervalTime,
    maintenanceOrm.concession ? toDomainConcession(maintenanceOrm.concession) : null
  ) as MaintenanceEntity;
};
