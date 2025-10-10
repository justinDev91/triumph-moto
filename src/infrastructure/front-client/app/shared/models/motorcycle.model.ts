import { Company } from './company.model';
import { Concession } from './concession.model';
import { Maintenance } from './maintenance.model';


export type MotorStatus = 'Available' | 'InMaintenance' | 'OnTest' | 'Sold';

export interface Motorcycle {
  id: string;
  brand: {
    value: string;
  };
  model: {
    value: string;
  };
  year: {
    value: number;
  };
  mileage: number;
  status: MotorStatus;
  purchaseDate: Date;
  lastServiceDate?: Date | null;
  nextServiceMileage: number;
  createdAt: Date;
  updatedAt: Date;
  company?: Company | null;
  concession?: Concession | null;
  maintenance?: Maintenance | null;
}
