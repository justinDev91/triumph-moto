import { Motorcycle } from './motorcycle.model';
import { UserResponse } from './user.model';

export type LocationStatus = 'in-progress' | 'completed' | 'canceled';

export interface Location {
  id: string;
  motorcycle: Motorcycle;
  user: UserResponse;
  startDate: {value : Date};
  endDate:{value : Date};
  status: LocationStatus;
  cost: number;
}
