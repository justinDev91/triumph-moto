import { Motorcycle } from './motorcycle.model';
import { Concession } from './concession.model';

export type  MaintenanceType = 'Preventive' | 'Corrective'
export interface Maintenance {
  id: string;
  motorcycle: Motorcycle;
  maintenanceType: MaintenanceType;
  date: Date;
  cost: number;
  mileageAtService: number;
  maintenanceIntervalMileage: {value: number};
  maintenanceIntervalTime: {value: number};
  concession?: Concession | null;
}
