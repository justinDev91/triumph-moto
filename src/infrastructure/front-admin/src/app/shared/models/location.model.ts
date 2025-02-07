import { Motorcycle } from './motorcycle.model';
import { User } from './user.model';

export enum LocationStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface Location {
  id: string;
  motorcycle: Motorcycle;
  user: User;
  startDate: Date;
  endDate?: Date | null;
  status: LocationStatusEnum;
  cost: number;
}
