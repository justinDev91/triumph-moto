import { Motorcycle } from './motorcycle.model';

export interface Warranty {
  id: string;
  motorcycle?: Motorcycle;
  startDate: { value: Date };
  endDate: { value: Date };
  coverageDetails: { value: string };
  isActive: boolean;
}
