import { Motorcycle } from './motorcycle.model';
import { Concession } from './concession.model';

export enum MaintenanceTypeEnum {
  Routine = 'Routine',
  Repair = 'Repair',
}

export interface Maintenance {
  id: string;
  motorcycle: Motorcycle;
  maintenanceType: MaintenanceTypeEnum;
  date: Date;
  cost: number;
  mileageAtService: number;
  maintenanceIntervalMileage: number;
  maintenanceIntervalTime: number;
  concession?: Concession | null;
}
