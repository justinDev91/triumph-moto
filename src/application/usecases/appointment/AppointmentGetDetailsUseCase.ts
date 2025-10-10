import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";

export class AppointmentGetDetailsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepositoryInterface) {}

  async execute(appointmentId: string): Promise<object | Error> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (appointment instanceof Error) return appointment;

    return appointment.getDetails();
  }
}
