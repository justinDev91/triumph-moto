import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { Maintenance } from "@infrastructure/maintenances/maintenance.entity";
import { MaintenanceTypeEnum } from "@infrastructure/types/MaintenanceTypeEnum";
import { toOrmMotorcycleCreate } from "../motorcycle/to-orm-motorcycle-create";
import { toOrmConcessionCreate } from "../concession/to-orm-concession-create";

export const toOrmMaintenanceCreate = (maintenance: MaintenanceEntity): Maintenance => {
    const maintenanceOrm = new Maintenance();
    maintenanceOrm.maintenanceType = maintenance.maintenanceType as MaintenanceTypeEnum; 
    
    maintenanceOrm.date = maintenance.date instanceof Date ? maintenance.date : new Date(maintenance.date);
    
    maintenanceOrm.cost = maintenance.cost;
    maintenanceOrm.mileageAtService = maintenance.mileageAtService;
    maintenanceOrm.maintenanceIntervalMileage = maintenance.maintenanceIntervalMileage.value;
    maintenanceOrm.maintenanceIntervalTime = maintenance.maintenanceIntervalTime.value;
    maintenanceOrm.concession = maintenance.concession ? toOrmConcessionCreate(maintenance.concession) : null;
    maintenanceOrm.motorcycle = maintenance.motorcycle ? toOrmMotorcycleCreate(maintenance.motorcycle) : null;

    return maintenanceOrm;
};
