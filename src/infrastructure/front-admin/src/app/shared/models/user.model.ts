import { Company } from "./company.model";
import { Concession } from "./concession.model";
import { Driver } from "./driver.model";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  administrator: boolean;
  isActive: boolean;
  companies?: Company[];
  concessions?: Concession[];
  drivers?: Driver[];
}

export interface UserResponse {
  id: string;
  firstName: {value: string};
  lastName:  {value: string};
  email:  {value: string};
  administrator: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  companies?: Company[];
  concessions?: Concession[];
  drivers?: Driver[];
}
