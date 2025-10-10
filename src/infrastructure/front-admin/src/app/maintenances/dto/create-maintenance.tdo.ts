
export enum MaintenanceTypeEnum {
  Preventive = 'Preventive',
  Corrective = 'Corrective',
  Emergency = 'Emergency',
  Routine = 'Routine',
}

export interface CreateMaintenanceDto {
  motorcycleId: string;
  maintenanceType: MaintenanceTypeEnum;
  date: string;
  cost: number;
  mileageAtService: number;
  maintenanceIntervalMileage: number;
  maintenanceIntervalTime: number;
  concessionId: string | null;
}
