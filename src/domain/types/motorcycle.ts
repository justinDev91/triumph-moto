
export type MotorStatus =  'Available' | 'InMaintenance' | 'OnTest' | 'Sold'

export interface DrivingRecord {
    date: Date;
    motorcycleId: string;
    type: 'Test Drive' | 'Incident';
    details: string;
}

export interface MaintenanceRecord {
  maintenanceId: string;
  motorcycleId: string;
  maintenanceType: 'Preventive' | 'Corrective';
  date: Date;
  mileageAtService: number;
  cost: number;
  technicianRecommendation: string;
  managerId: string;
}

export type MaintenanceNotificationType =  'StockAlert' | 'ServiceReminder' | 'IncidentReport'

export type CommonRepairAction = 
  | 'Oil Change'
  | 'Brake Replacement'
  | 'Tire Replacement'
  | 'Chain Adjustment'
  | 'Clutch Adjustment'
  | 'Battery Replacement'
  | 'Spark Plug Replacement'
  | 'Fuel System Cleaning'
  | 'Fork Seals Replacement'
  | 'Transmission Fluid Change'
  | 'Suspension Adjustment'
  | 'Electrical System Diagnostics'
  | 'Coolant Change'
  | 'Headlight Replacement'
  | 'Exhaust Repair'
  | 'Bodywork Repair'
  | 'Engine Repair'
  | 'Clutch Repair';

  export interface SparePartOrderRecord {
    orderId: string;
    sparePartId: string;
    partName: string;
    orderDate: Date;
    quantityOrdered: number;
    costPerUnit: number;
    totalCost: number;
    estimatedDeliveryDate: Date;
    deliveredQuantity: number;
    remainingQuantity: number;
  }

export type LicenseType = 'A' | 'B' | 'C';
