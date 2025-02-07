import { Company } from './company.model';
import { DrivingRecord } from './driving-record.model';
import { User } from './user.model';

export enum LicenseTypeEnum {
  A = 'A',
  B = 'B',
  C = 'C',
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  licenseType: LicenseTypeEnum;
  yearsOfExperience: number;
  email: string;
  phone: string;
  company: Company;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  drivingHistory?: DrivingRecord[];
}
