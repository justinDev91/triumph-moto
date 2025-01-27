import { UserEntity } from "../user/UserEntity";
import { AppointmentStatus } from "@domain/types/AppointmentStatus";
import { CompanyEntity } from '../company/CompanyEntity';
import { LocationEntity } from '../location/LocationEntity';
import { MaintenanceEntity } from '../maintenance/MaintenanceEntity';
import { RepairEntity } from '../repair/RepairEntity';
import { MotorcycleTrialEntity } from '../motorcycle/MotorcycleTrialEntity';
import { InvalidTimeRangeError } from '@domain/errors/appointment/InvalidTimeRangeError';
import { AppointmentReason } from "@domain/types/AppointmentReason";
import { AppointmentAlreadyCancelledError } from "@domain/errors/appointment/AppointmentAlreadyCancelledError.";
import { AppointmentAlreadyCompletedError } from "@domain/errors/appointment/AppointmentAlreadyCompletedError";

export class AppointmentEntity {
  private constructor(
    public readonly id: string,
    public readonly user: UserEntity,
    public startTime: Date,
    public endTime: Date,
    private appointmentStatus: AppointmentStatus,
    public readonly createdAt: Date,
    private updatedAt: Date,
    public reason: AppointmentReason,
    public company: CompanyEntity,
    public location: LocationEntity | null = null,
    public maintenance: MaintenanceEntity | null = null,
    public repair: RepairEntity | null = null,
    public motorcycleTrial: MotorcycleTrialEntity | null = null
  ) {}

  public static create(
    id: string,
    user: UserEntity,
    startTime: Date,
    endTime: Date,
    appointmentStatus: AppointmentStatus,
    createdAt: Date,
    updatedAt: Date,
    reason: AppointmentReason,
    company: CompanyEntity,
    location: LocationEntity | null = null,
    maintenance: MaintenanceEntity | null = null,
    repair: RepairEntity | null = null,
    motorcycleTrial: MotorcycleTrialEntity | null = null
  ): AppointmentEntity | Error {
    if (startTime >= endTime) {
      return new InvalidTimeRangeError();
    }

    return new AppointmentEntity(
      id,
      user,
      startTime,
      endTime,
      appointmentStatus,
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

  public getStatus(): AppointmentStatus {
    return this.appointmentStatus;
  }

  public getReason(): AppointmentReason {
    return this.reason;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDetails(): {
    user: UserEntity;
    timeRange: { startTime: Date; endTime: Date };
    status: AppointmentStatus;
    reason: AppointmentReason;
    company: CompanyEntity;
    updatedAt: Date;
    location: LocationEntity | null;
    maintenance: MaintenanceEntity | null;
    repair: RepairEntity | null;
    motorcycleTrial: MotorcycleTrialEntity | null;
  } {
    return {
      user: this.user,
      timeRange: { startTime: this.startTime, endTime: this.endTime },
      status: this.appointmentStatus,
      reason: this.reason,
      company: this.company,
      updatedAt: this.updatedAt,
      location: this.location,
      maintenance: this.maintenance,
      repair: this.repair,
      motorcycleTrial: this.motorcycleTrial,
    };
  }

  public getReasonDetails(): object {
    switch (this.reason) {
      case "Location":
        return this.location ? this.location.getDetails() : {};
      case "Maintenance":
        return this.maintenance
          ? { needsMaintenance: this.maintenance.needsMaintenance() }
          : {};
      case "Repair":
        return this.repair
          ? {
              repairActions: this.repair.actions,
              cost: this.repair.cost.value,
            }
          : {};
      case "MotorcycleTrial":
        return this.motorcycleTrial
          ? {
              summary: this.motorcycleTrial.getTestSummary(),
            }
          : {};
      default:
        return {};
    }
  }

  public updateStatus(newStatus: AppointmentStatus): void {
    if (newStatus !== this.appointmentStatus) {
      this.appointmentStatus = newStatus;
      this.updatedAt = new Date();
    }
  }

  public updateReason(newReason: AppointmentReason): void {
    this.reason = newReason;
    this.updatedAt = new Date();
  }

  public updateLocation(newLocation: LocationEntity | null): void {
    this.location = newLocation;
    this.updatedAt = new Date();
  }

  public updateMaintenance(newMaintenance: MaintenanceEntity | null): void {
    this.maintenance = newMaintenance;
    this.updatedAt = new Date();
  }

  public updateRepair(newRepair: RepairEntity | null): void {
    this.repair = newRepair;
    this.updatedAt = new Date();
  }

  public updateMotorcycleTrial(newTrial: MotorcycleTrialEntity | null): void {
    this.motorcycleTrial = newTrial;
    this.updatedAt = new Date();
  }

  public isPending(): boolean {
    return this.appointmentStatus === "Pending";
  }

  public isCompleted(): boolean {
    return this.appointmentStatus === "Completed";
  }

  public isCancelled(): boolean {
    return this.appointmentStatus === "Cancelled";
  }

  public overlapsWith(anotherAppointment: AppointmentEntity): boolean {
    return (
      this.startTime < anotherAppointment.endTime &&
      anotherAppointment.startTime < this.endTime
    );
  }

  public cancel(): void | Error {
    if (this.appointmentStatus === "Cancelled") return new AppointmentAlreadyCancelledError();
    
    this.appointmentStatus = "Cancelled";
    this.updatedAt = new Date();
  }

  public complete(): void | Error {
    if (this.appointmentStatus === "Completed") return new AppointmentAlreadyCompletedError();
    
    this.appointmentStatus = "Completed";
    this.updatedAt = new Date();
  }
}
