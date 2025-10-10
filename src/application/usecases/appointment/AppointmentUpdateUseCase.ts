import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";
import { AppointmentReason } from "@domain/types/AppointmentReason";
import { AppointmentStatus } from "@domain/types/AppointmentStatus";

export class AppointmentUpdateUseCase {
    constructor(private readonly repository: AppointmentRepositoryInterface) {}
  
    public async updateAppointmentUsecase(
      id: string,
      appointmentStatus: AppointmentStatus,
      reason: AppointmentReason,
    ): Promise<void | Error> {

      await this.repository.updateStatus(id, appointmentStatus, reason);
    }
  }