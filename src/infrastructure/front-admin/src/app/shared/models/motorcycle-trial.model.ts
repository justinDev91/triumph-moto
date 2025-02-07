import { Motorcycle } from './motorcycle.model';
import { Driver } from './driver.model';

export interface MotorcycleTrial {
  id: string;
  motorcycle: Motorcycle;
  driver: Driver;
  startDate: Date;
  endDate?: Date | null;
}
