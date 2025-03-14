import { UserResponse } from './user.model';
import { Company } from './company.model';
import { Motorcycle } from './motorcycle.model';

export interface Concession {
  id: string;
  name: {value : string};
  user: UserResponse;
  motorcycles?: Motorcycle[];
  company?: Company | null;
  createdAt: Date;
  updatedAt: Date;
}
