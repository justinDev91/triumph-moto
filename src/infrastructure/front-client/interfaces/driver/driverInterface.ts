import { LicenseType } from '@triumph-motorcycles/types';

export default interface Driver {
  id: string;
  name: string;
  licenseType: LicenseType;
  license: string;
  yearsOfExperience: number;
  email: string;
  phone: string;
}
