import { Motorcycle } from './motorcycle.model';

export interface Warranty {
  id: string;
  motorcycle?: Motorcycle;
  startDate: Date;
  endDate: Date;
  coverageDetails: string;
  isActive: boolean;
}
