import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";

export class AppointmentCompleteUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepositoryInterface) {}

  async execute(appointmentId: string): Promise<void | Error> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (appointment instanceof Error) return appointment
    
    const completeError = appointment.complete();

    if (completeError instanceof Error) return completeError;
    
    await this.appointmentRepository.update(appointment);
  }
}
