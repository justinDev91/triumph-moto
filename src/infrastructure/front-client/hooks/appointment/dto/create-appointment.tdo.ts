
export type AppointmentStatus =  'Scheduled' | 'Cancelled' | 'Completed' | 'Pending';

export type AppointmentReason =
  | "Location"
  | "Maintenance"
  | "Repair"
  | "MotorcycleTrial";

  export interface CreateAppointmentDto {
    userId: string;
    startTime: Date;
    endTime: Date;
    status: AppointmentStatus,
    reason: AppointmentReason,
    companyId: string;
    locationId?: string;
    maintenanceId?: string;
    repairId?: string;
    motorcycleTrialId?: string;
}
  
