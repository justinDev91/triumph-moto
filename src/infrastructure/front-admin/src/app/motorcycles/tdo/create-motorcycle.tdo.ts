import { MotorStatus } from "../../shared/models/motorcycle.model";

export interface CreateMotorcycleDto {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  status: MotorStatus;
  purchaseDate: Date;
  lastServiceDate?: Date;
  nextServiceMileage: number;
  companyId: string
}
