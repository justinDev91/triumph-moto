import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { Maintenance } from "@api/maintenances/maintenance.entity";
import { MaintenanceTypeEnum } from "@api/types/MaintenanceTypeEnum";
import { toOrmConcession } from "../concession/to-orm-concession";
import { toOrmMotorcycle } from "../motorcycle/to-orm-motorcycle";

export const toOrmMaintenance = (maintenance: MaintenanceEntity): Maintenance => {
    const maintenanceOrm = new Maintenance();
    maintenanceOrm.maintenanceType = maintenance.maintenanceType as MaintenanceTypeEnum; 
    maintenanceOrm.date = maintenance.date;
    maintenanceOrm.cost = maintenance.cost;
    maintenanceOrm.mileageAtService = maintenance.mileageAtService;
    maintenanceOrm.maintenanceIntervalMileage = maintenance.maintenanceIntervalMileage.value;
    maintenanceOrm.maintenanceIntervalTime = maintenance.maintenanceIntervalTime.value;
    maintenanceOrm.concession = maintenance.concession ? toOrmConcession(maintenance.concession) : null;
    maintenanceOrm.motorcycle = maintenance.motorcycle ? toOrmMotorcycle( maintenance.motorcycle) : null;
  
    return maintenanceOrm;
  };