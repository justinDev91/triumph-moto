import { Company } from "./company.model";
import { Concession } from "./concession.model";
import { Driver } from "./driver.model";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  administrator: boolean;
  isActive: boolean;
  companies?: Company[];
  concessions?: Concession[];
  drivers?: Driver[];
}
