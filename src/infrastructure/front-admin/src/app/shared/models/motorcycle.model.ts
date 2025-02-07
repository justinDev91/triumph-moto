import { Company } from './company.model';
import { Concession } from './concession.model';
import { Maintenance } from './maintenance.model';

export enum MotorStatusEnum {
  Available = 'Available',
  InService = 'InService',
  Sold = 'Sold',
  Maintenance = 'Maintenance',
}

export interface Motorcycle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  status: MotorStatusEnum;
  purchaseDate: Date;
  lastServiceDate?: Date | null;
  nextServiceMileage: number;
  createdAt: Date;
  updatedAt: Date;
  company?: Company | null;
  concession?: Concession | null;
  maintenance?: Maintenance | null;
}
