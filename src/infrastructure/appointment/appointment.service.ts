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
import { AppointmentRepositoryImplem } from '@infrastructure/adapters/appointment.repository.implem';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UserRepositoryImplem } from '@infrastructure/adapters/user.repository.implem';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem';
import { LocationRepositoryImplem } from '@infrastructure/adapters/location.repository.implem';
import { MaintenanceRepositoryImpleme } from '@infrastructure/adapters/maintenance.repository.implem';
import { RepairRepositoryImplem } from '@infrastructure/adapters/repair.repository.implem';
import { MotorcycleTrialRepositoryImplem } from '@infrastructure/adapters/motorcycle.trial.repository.implem';
import { GetAllAppointmentsUsecase } from '@application/usecases/appointment/GetAllAppointmentUsecase';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  private readonly appointmentCancelUseCase: AppointmentCancelUseCase;
  private readonly appointmentCompleteUseCase: AppointmentCompleteUseCase;
  private readonly appointmentCreateUseCase: AppointmentCreateUseCase;
  private readonly appointmentDeleteUseCase: AppointmentDeleteUseCase;
  private readonly appointmentGetDetailsUseCase: AppointmentGetDetailsUseCase;
  private readonly appointmentUpdateStatusUseCase: AppointmentUpdateStatusUseCase;
  private readonly appointmentUpdateUseCase: AppointmentUpdateUseCase;
  private readonly getAllAppointmentsUsecase : GetAllAppointmentsUsecase;

  constructor(
    private readonly appointmentRepository: AppointmentRepositoryImplem,
    private readonly userRepository: UserRepositoryImplem,
    private readonly companyRepository: CompanyRepositoryImplem,
    private readonly locationRepository: LocationRepositoryImplem,
    private readonly maintenanceRepository: MaintenanceRepositoryImpleme,
    private readonly repairRepository: RepairRepositoryImplem,
    private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryImplem
  ) {
    this.appointmentCancelUseCase = new AppointmentCancelUseCase(this.appointmentRepository);
    this.appointmentCompleteUseCase = new AppointmentCompleteUseCase(this.appointmentRepository);
    this.appointmentCreateUseCase = new AppointmentCreateUseCase(
      this.appointmentRepository,
      this.userRepository,
      this.companyRepository,
      this.locationRepository,
      this.maintenanceRepository,
      this.repairRepository,
      this.motorcycleTrialRepository
    );
    this.appointmentDeleteUseCase = new AppointmentDeleteUseCase(this.appointmentRepository);
    this.appointmentGetDetailsUseCase = new AppointmentGetDetailsUseCase(this.appointmentRepository);
    this.appointmentUpdateStatusUseCase = new AppointmentUpdateStatusUseCase(this.appointmentRepository);
    this.appointmentUpdateUseCase = new AppointmentUpdateUseCase(this.appointmentRepository);
    this.getAllAppointmentsUsecase = new GetAllAppointmentsUsecase(this.appointmentRepository)
  }

  public async createAppointment(createAppointmentDto : CreateAppointmentDto): Promise<void | Error> {
    const {userId, startTime, endTime, status, reason, companyId, locationId, maintenanceId,repairId, motorcycleTrialId } = createAppointmentDto
    await this.appointmentCreateUseCase.createAppointment(
      userId, 
      startTime, 
      endTime, 
      status, 
      reason, 
      companyId, 
      locationId, 
      maintenanceId, 
      repairId, 
      motorcycleTrialId
    );
  }

  public async updateAppointment(
    id: string,
    updateAppointmentDto : UpdateAppointmentDto
  ): Promise<void | Error> {
    const {appointmentStatus, reason} = updateAppointmentDto;

    return await this.appointmentUpdateUseCase.updateAppointmentUsecase(id, appointmentStatus, reason);
  }

  async getAllAppointments(): Promise<AppointmentEntity[] | Error> {
        return await this.getAllAppointmentsUsecase.execute();
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
