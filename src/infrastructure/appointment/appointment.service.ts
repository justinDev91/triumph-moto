import { Injectable } from '@nestjs/common';
import { AppointmentCancelUseCase } from '@application/usecases/appointment/AppointmentCancelUseCase';
import { AppointmentCompleteUseCase } from '@application/usecases/appointment/AppointmentCompleteUseCase';
import { AppointmentCreateUseCase } from '@application/usecases/appointment/AppointmentCreateUseCase';
import { AppointmentDeleteUseCase } from '@application/usecases/appointment/AppointmentDeleteUseCase';
import { AppointmentGetDetailsUseCase } from '@application/usecases/appointment/AppointmentGetDetailsUseCase';
import { AppointmentUpdateStatusUseCase } from '@application/usecases/appointment/AppointmentUpdateStatusUseCase';
import { AppointmentUpdateUseCase } from '@application/usecases/appointment/AppointmentUpdateUseCase';
import { AppointmentStatus } from '@domain/types/AppointmentStatus';
import { AppointmentEntity } from '@domain/entities/appointment/AppointmentEntity';
import { MotorcycleTrialEntity } from '@domain/entities/motorcycle/MotorcycleTrialEntity';
import { RepairEntity } from '@domain/entities/repair/RepairEntity';
import { MaintenanceEntity } from '@domain/entities/maintenance/MaintenanceEntity';
import { LocationEntity } from '@domain/entities/location/LocationEntity';
import { AppointmentReason } from '@domain/types/AppointmentReason';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { AppointmentRepositoryImplem } from '@infrastructure/adapters/appointment.repository.implem';

@Injectable()
export class AppointmentService {
  private readonly appointmentCancelUseCase: AppointmentCancelUseCase;
  private readonly appointmentCompleteUseCase: AppointmentCompleteUseCase;
  private readonly appointmentCreateUseCase: AppointmentCreateUseCase;
  private readonly appointmentDeleteUseCase: AppointmentDeleteUseCase;
  private readonly appointmentGetDetailsUseCase: AppointmentGetDetailsUseCase;
  private readonly appointmentUpdateStatusUseCase: AppointmentUpdateStatusUseCase;
  private readonly appointmentUpdateUseCase: AppointmentUpdateUseCase;

  constructor(
    private readonly appointmentRepository: AppointmentRepositoryImplem
  ) {
    this.appointmentCancelUseCase = new AppointmentCancelUseCase(this.appointmentRepository);
    this.appointmentCompleteUseCase = new AppointmentCompleteUseCase(this.appointmentRepository);
    this.appointmentCreateUseCase = new AppointmentCreateUseCase(this.appointmentRepository);
    this.appointmentDeleteUseCase = new AppointmentDeleteUseCase(this.appointmentRepository);
    this.appointmentGetDetailsUseCase = new AppointmentGetDetailsUseCase(this.appointmentRepository);
    this.appointmentUpdateStatusUseCase = new AppointmentUpdateStatusUseCase(this.appointmentRepository);
    this.appointmentUpdateUseCase = new AppointmentUpdateUseCase(this.appointmentRepository);
  }

  public async createAppointment(
    id: string,
    user: UserEntity,
    startTime: Date,
    endTime: Date,
    status: AppointmentStatus,
    createdAt: Date,
    updatedAt: Date,
    reason: AppointmentReason,
    company: CompanyEntity,
    location: LocationEntity | null = null,
    maintenance: MaintenanceEntity | null = null,
    repair: RepairEntity | null = null,
    motorcycleTrial: MotorcycleTrialEntity | null = null
  ): Promise<AppointmentEntity | Error> {
    return await this.appointmentCreateUseCase.createAppointment(
      id, 
      user, 
      startTime, 
      endTime, 
      status, 
      createdAt, 
      updatedAt, 
      reason, 
      company, 
      location, 
      maintenance, 
      repair, 
      motorcycleTrial
    );
  }

  public async updateAppointment(
    id: string,
    updatedDetails: {
      startTime?: Date;
      endTime?: Date;
      appointmentStatus?: AppointmentStatus;
      reason?: AppointmentReason;
      location?: LocationEntity | null;
      maintenance?: MaintenanceEntity | null;
      repair?: RepairEntity | null;
      motorcycleTrial?: MotorcycleTrialEntity | null;
    }
  ): Promise<AppointmentEntity | Error> {
    return await this.appointmentUpdateUseCase.updateAppointment(id, updatedDetails);
  }

  public async updateAppointmentStatus(appointmentId: string, newStatus: AppointmentStatus): Promise<void | Error> {
    return await this.appointmentUpdateStatusUseCase.execute(appointmentId, newStatus);
  }

  public async cancelAppointment(appointmentId: string): Promise<void | Error> {
    return await this.appointmentCancelUseCase.execute(appointmentId);
  }

  public async completeAppointment(appointmentId: string): Promise<void | Error> {
    return await this.appointmentCompleteUseCase.execute(appointmentId);
  }

  public async deleteAppointment(id: string): Promise<void | Error> {
    return await this.appointmentDeleteUseCase.deleteAppointment(id);
  }

  public async getAppointmentDetails(appointmentId: string): Promise<object | Error> {
    return await this.appointmentGetDetailsUseCase.execute(appointmentId);
  }
}
