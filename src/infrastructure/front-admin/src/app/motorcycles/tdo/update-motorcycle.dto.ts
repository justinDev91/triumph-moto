export interface UpdateMotorcycleDto {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  status: string;
  purchaseDate: Date;
  lastServiceDate?: Date;
  nextServiceMileage: number;
  companyId: string
}
