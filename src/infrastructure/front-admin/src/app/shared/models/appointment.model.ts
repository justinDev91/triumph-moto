import { UserResponse } from './user.model';
import { Company } from './company.model';
import { Location } from './location.model';
import { Maintenance } from './maintenance.model';
import { Repair } from './repair.model';
import { MotorcycleTrial } from './motorcycle-trial.model';

export type AppointmentStatus =  'Scheduled' | 'Cancelled' | 'Completed' | 'Pending';

export type AppointmentReason =
  | "Location"
  | "Maintenance"
  | "Repair"
  | "MotorcycleTrial";


export interface Appointment {
  id: string;
  user: UserResponse;
  startTime: Date;
  endTime: Date;
  appointmentStatus: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
  reason: AppointmentReason;
  company: Company;
  location?: Location | null;
  maintenance?: Maintenance | null;
  repair?: Repair | null;
  motorcycleTrial?: MotorcycleTrial | null;
}
