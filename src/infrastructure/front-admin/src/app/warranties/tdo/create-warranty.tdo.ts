export interface CreateWarrantyDto {
   motorcycleId: string;
   warrantyType: string;
   startDate: Date;
   endDate: Date;
   description: string;
}
