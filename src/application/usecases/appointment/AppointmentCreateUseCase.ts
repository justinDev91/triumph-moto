import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";
import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { MaintenanceRepositoryInterface } from "@application/repositories/MaintenanceRepositoryInterface";
import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";
import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { AppointmentReason } from "@domain/types/AppointmentReason";
import { AppointmentStatus } from "@domain/types/AppointmentStatus";

export class AppointmentCreateUseCase {
  constructor(
    private readonly repository: AppointmentRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
    private readonly companyRepository: CompanyRepositoryInterface,
    private readonly locationRepository: LocationRepositoryInterface,
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
    private readonly repairRepository: RepairRepositoryInterface,
    private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryInterface
  ) {}

  public async createAppointment(
    userId: string,
    startTime: Date,
    endTime: Date,
    status: AppointmentStatus,
    reason: AppointmentReason,
    companyId: string,
    locationId: string | null = null,
    maintenanceId: string | null = null,
    repairId: string | null = null,
    motorcycleTrialId: string | null = null
  ): Promise<void | Error> {
    const user = await this.userRepository.findOne(userId);
    if (user instanceof Error) return user;

    const company = await this.companyRepository.findById(companyId);
    if (company instanceof Error) return company;

    let location: LocationEntity |  Error | null = null;
    if (locationId) {
      location = await this.locationRepository.findById(locationId);
      if (location instanceof Error) return location;
    }

    let repair: RepairEntity | Error | null = null;
    if (repairId) {
      repair = await this.repairRepository.findById(repairId);
      if (repair instanceof Error) return repair;
    }

    let maintenance: MaintenanceEntity | Error | null = null;
    if (maintenanceId) {
      maintenance = await this.maintenanceRepository.findById(maintenanceId);
      if (maintenance instanceof Error) return maintenance;
    }

    let motorcycleTrial: MotorcycleTrialEntity | Error | null = null;
    if (motorcycleTrialId) {
      motorcycleTrial = await this.motorcycleTrialRepository.findById(motorcycleTrialId);
      if (motorcycleTrial instanceof Error) return motorcycleTrial;
    }

    const appointment = AppointmentEntity.create(
      null,
      user,
      startTime,
      endTime,
      status,
      new Date(),
      new Date(),
      reason,
      company,
      location as LocationEntity,
      maintenance as MaintenanceEntity,
      repair as RepairEntity,
      motorcycleTrial as MotorcycleTrialEntity
    );

    if (appointment instanceof Error) return appointment;
    await this.repository.save(appointment);
  }
}
