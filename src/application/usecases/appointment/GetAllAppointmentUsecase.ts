import { AppointmentRepositoryInterface } from '@application/repositories/AppointmentRepositoryInterface';
import { AppointmentEntity } from '@domain/entities/appointment/AppointmentEntity';

export class GetAllAppointmentsUsecase {
  constructor(private readonly appointmentRepository: AppointmentRepositoryInterface) {}

  public async execute(): Promise<AppointmentEntity[] | Error> {
    return await this.appointmentRepository.findAll();
  }
}
