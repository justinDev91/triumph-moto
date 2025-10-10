import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";

export class AppointmentCancelUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepositoryInterface) {}

  async execute(appointmentId: string): Promise<void | Error> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (appointment instanceof Error) return appointment

    const cancelError = appointment.cancel();

    if (cancelError instanceof Error) return cancelError;
    
    await this.appointmentRepository.cancel(appointmentId);
  }
}
