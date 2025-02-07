import { Motorcycle } from './motorcycle.model';
import { Repair } from './repair.model';
import { Warranty } from './warranty.model';

export interface Breakdown {
  id: string;
  motorcycle: Motorcycle;
  description: string;
  reportedDate: Date;
  warranty?: Warranty | null;
  repairs: Repair[];
}
