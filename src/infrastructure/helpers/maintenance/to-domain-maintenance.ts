import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { Maintenance } from "@infrastructure/maintenances/maintenance.entity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { MaintenanceType } from "@domain/types/MaintenanceType";
import { toDomainMotorcycle } from "../motorcycle/to-domain-motorcycle";
import { toDomainConcession } from "../concession/to-domain-concession";

export const toDomainMaintenance = (maintenanceOrm: Maintenance): MaintenanceEntity => {
  const motorcycle = toDomainMotorcycle(maintenanceOrm.motorcycle) as MotorcycleEntity;
  const concession = maintenanceOrm.concession ? toDomainConcession(maintenanceOrm.concession) as ConcessionEntity : null;

  return MaintenanceEntity.create(
    maintenanceOrm.id,
    motorcycle,
    maintenanceOrm.maintenanceType as MaintenanceType,
    maintenanceOrm.date,
    maintenanceOrm.cost,
    maintenanceOrm.mileageAtService,
    maintenanceOrm.maintenanceIntervalMileage,
    maintenanceOrm.maintenanceIntervalTime,
    concession
  ) as MaintenanceEntity;
};
