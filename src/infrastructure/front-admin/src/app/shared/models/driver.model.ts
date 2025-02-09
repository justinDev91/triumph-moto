import { Company } from './company.model';
import { DrivingRecord } from './driving-record.model';
import { User } from './user.model';

export type LicenseType = 'A' | 'B' | 'C';

export interface Driver {
  id: string;
  name: {value: string};
  license: {value: string};
  licenseType: LicenseType;
  yearsOfExperience: number;
  email: {value: string};
  phone: {value: string};
  company: Company;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  drivingHistory?: DrivingRecord[];
}
