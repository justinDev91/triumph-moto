import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { Maintenance } from "@infrastructure/maintenances/maintenance.entity";
import { MaintenanceTypeEnum } from "@infrastructure/types/MaintenanceTypeEnum";
import { toOrmConcession } from "../concession/to-orm-concession";

export const toOrmMaintenance = (maintenance: MaintenanceEntity): Maintenance => {
    const maintenanceOrm = new Maintenance();
    
    maintenanceOrm.id = maintenance.id;
    maintenanceOrm.maintenanceType = maintenance.maintenanceType as MaintenanceTypeEnum; 
    maintenanceOrm.date = maintenance.date;
    maintenanceOrm.cost = maintenance.cost;
    maintenanceOrm.mileageAtService = maintenance.mileageAtService;
    maintenanceOrm.maintenanceIntervalMileage = maintenance.maintenanceIntervalMileage.value;
    maintenanceOrm.maintenanceIntervalTime = maintenance.maintenanceIntervalTime.value;
  
    maintenanceOrm.concession = maintenance.concession ? toOrmConcession(maintenance.concession) : null;
  
    return maintenanceOrm;
  };