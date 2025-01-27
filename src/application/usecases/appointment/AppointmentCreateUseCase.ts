import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";
import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { InvalidTimeRangeError } from "@domain/errors/appointment/InvalidTimeRangeError";
import { AppointmentReason } from "@domain/types/AppointmentReason";
import { AppointmentStatus } from "@domain/types/AppointmentStatus";

export class AppointmentCreateUseCase {
    constructor(private readonly repository: AppointmentRepositoryInterface) {}
  
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
      location: LocationEntity| null = null,
      maintenance: MaintenanceEntity| null = null,
      repair: RepairEntity | null = null,
      motorcycleTrial: MotorcycleTrialEntity | null = null
    ): Promise<AppointmentEntity | Error> {
      if (startTime >= endTime) {
        return new InvalidTimeRangeError();
      }
  
      const appointment = AppointmentEntity.create(
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
  
      if (appointment instanceof Error) return appointment;
  
      await this.repository.save(appointment);
      return appointment;
    }
}