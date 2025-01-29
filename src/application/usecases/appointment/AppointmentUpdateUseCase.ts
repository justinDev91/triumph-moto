import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";
import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { LocationEntity } from "@domain/entities/location/LocationEntity";
import { MaintenanceEntity } from "@domain/entities/maintenance/MaintenanceEntity";
import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { AppointmentReason } from "@domain/types/AppointmentReason";
import { AppointmentStatus } from "@domain/types/AppointmentStatus";

export class AppointmentUpdateUseCase {
    constructor(private readonly repository: AppointmentRepositoryInterface) {}
  
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
      const appointment = await this.repository.findById(id);
  
      if (appointment instanceof Error ) return appointment
    
  
      if (updatedDetails.startTime) appointment.startTime = updatedDetails.startTime;
      if (updatedDetails.endTime) appointment.endTime = updatedDetails.endTime;
      if (updatedDetails.appointmentStatus) appointment.updateStatus(updatedDetails.appointmentStatus);
      if (updatedDetails.reason) appointment.updateReason(updatedDetails.reason);
      if (updatedDetails.location !== undefined) appointment.updateLocation(updatedDetails.location);
      if (updatedDetails.maintenance !== undefined) appointment.updateMaintenance(updatedDetails.maintenance);
      if (updatedDetails.repair !== undefined) appointment.updateRepair(updatedDetails.repair);
      if (updatedDetails.motorcycleTrial !== undefined) appointment.updateMotorcycleTrial(updatedDetails.motorcycleTrial);
  
      await this.repository.save(appointment);
      return appointment;
    }
  }