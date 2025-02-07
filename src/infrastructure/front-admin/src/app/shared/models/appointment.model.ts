import { User } from './user.model';
import { Company } from './company.model';
import { Location } from './location.model';
import { Maintenance } from './maintenance.model';
import { Repair } from './repair.model';
import { MotorcycleTrial } from './motorcycle-trial.model';

export enum AppointmentStatusEnum {
  Scheduled = "Scheduled",
  Cancelled = "Cancelled",
  Completed = "Completed",
  Pending = "Pending",
}

export enum AppointmentReasonEnum {
  Location = "Location",
  Maintenance = "Maintenance",
  Repair = "Repair",
  MotorcycleTrial = "MotorcycleTrial",
}

export interface Appointment {
  id: string;
  user: User;
  startTime: Date;
  endTime: Date;
  appointmentStatus: AppointmentStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  reason: AppointmentReasonEnum;
  company: Company;
  location?: Location | null;
  maintenance?: Maintenance | null;
  repair?: Repair | null;
  motorcycleTrial?: MotorcycleTrial | null;
}
