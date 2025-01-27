import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";
import { AppointmentStatus } from "@domain/types/AppointmentStatus";

export class AppointmentUpdateStatusUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepositoryInterface) {}

  async execute(appointmentId: string, newStatus: AppointmentStatus): Promise<void | Error> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (appointment instanceof Error) return appointment

    appointment.updateStatus(newStatus);
    await this.appointmentRepository.update(appointment);
  }
}
