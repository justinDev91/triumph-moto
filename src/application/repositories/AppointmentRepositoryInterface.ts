import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { AppointmentNotFoundError } from "@domain/errors/appointment/AppointmentNotFoundError";

export interface AppointmentRepositoryInterface {
    findById(appointmentId: string): Promise<AppointmentEntity | AppointmentNotFoundError>;
    findByUser(userId: string): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
    findByCompany(companyId: string): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
    findByDateRange(
      startTime: Date,
      endTime: Date,
      companyId: string
    ): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
    save(appointment: AppointmentEntity): Promise<void>;
    update(appointment: AppointmentEntity): Promise<void>;
    delete(appointmentId: string): Promise<void>;
  }
  