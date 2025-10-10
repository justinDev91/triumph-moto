import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { AppointmentReason } from "@domain/types/AppointmentReason";
import { AppointmentStatus } from "@domain/types/AppointmentStatus";

export interface AppointmentRepositoryInterface {
    findById(appointmentId: string): Promise<AppointmentEntity | Error>;
    findByUser(userId: string): Promise<AppointmentEntity[] | Error>;
    findByCompany(companyId: string): Promise<AppointmentEntity[] | Error>;
    findByDateRange(
      startTime: Date,
      endTime: Date,
      companyId: string
    ): Promise<AppointmentEntity[] | Error>;
    save(appointment: AppointmentEntity): Promise<void>;
    update(appointment: AppointmentEntity): Promise<void>;
    delete(appointmentId: string): Promise<void>;
    findAll(): Promise<AppointmentEntity[] | Error>;
    updateStatus(id: string, appointmentStatus: AppointmentStatus, reason: AppointmentReason):  Promise<void>;
    cancel(id: string):  Promise<void>;
    complete(id: string):  Promise<void>;

  }
  