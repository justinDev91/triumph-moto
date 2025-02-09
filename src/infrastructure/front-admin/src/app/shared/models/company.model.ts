import { Concession } from "./concession.model";
import { Driver } from "./driver.model";
import { Motorcycle } from "./motorcycle.model";
import { User } from "./user.model";

export interface Company {
  id: string;
  name: {value: string};
  user: User;
  drivers?: Driver[];
  motorcycles?: Motorcycle[];
  concessions?: Concession[];
  createdAt: Date;
  updatedAt: Date;
}
