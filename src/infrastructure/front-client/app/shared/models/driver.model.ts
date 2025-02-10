import { Company } from './company.model';
import { DrivingRecord } from './driving-record.model';
import { User, UserResponse } from './user.model';

export type LicenseType = 'A' | 'B' | 'C';

export interface Driver {
  id: string;
  name: {value: string};
  license: {value: string};
  licenseType: LicenseType;
  yearsOfExperience: {value: number};
  email: {value: string};
  phone: {value: string};
  company: Company;
  user: UserResponse;
  createdAt: Date;
  updatedAt: Date;
  drivingHistory?: DrivingRecord[];
}
