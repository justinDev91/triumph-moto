export type DrivingRecordType = 'Test Drive' | 'Incident';

export interface DrivingRecord {
  date: Date;
  motorcycleId: string;
  type: DrivingRecordType;
  details: string;
}
