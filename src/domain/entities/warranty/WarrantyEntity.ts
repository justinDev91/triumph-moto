import { WarrantyStartDate } from "@domain/values/warranty/WarrantyStartDate";
import { MotorcycleEntity } from "../motorcycle/MotorcycleEntity";
import { WarrantyEndDate } from "@domain/values/warranty/WarrantyEndDate";
import { WarrantyCoverageDetails } from "@domain/values/warranty/WarrantyCoverageDetails";

export class WarrantyEntity {
  private constructor(
    public readonly id: string,
    public readonly motorcycle: MotorcycleEntity,
    public readonly startDate: WarrantyStartDate,
    public readonly endDate: WarrantyEndDate,
    public readonly coverageDetails: WarrantyCoverageDetails,
    public readonly isActive: boolean,
  ) {}

  public static create(
    id: string,
    motorcycle: MotorcycleEntity,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): WarrantyEntity | Error {
    
    const startDate = WarrantyStartDate.from(startDateValue);
    if (startDate instanceof Error) return startDate;

    const endDate = WarrantyEndDate.from(endDateValue, startDate.value);
    if (endDate instanceof Error) return endDate;

    const coverageDetails = WarrantyCoverageDetails.from(coverageDetailsValue);
    if (coverageDetails instanceof Error) return coverageDetails;

    return new WarrantyEntity(
      id,
      motorcycle,
      startDate,
      endDate,
      coverageDetails,
      isActive
    );
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0)); 
  }

  public isWarrantyValid(checkDate: Date): boolean {
    const normalizedCheckDate = this.normalizeDate(checkDate);
    const normalizedStartDate = this.normalizeDate(this.startDate.value);
    const normalizedEndDate = this.normalizeDate(this.endDate.value);

    return normalizedCheckDate >= normalizedStartDate && normalizedCheckDate <= normalizedEndDate && this.isActive;
  }

  public isRepairCovered(repairDate: Date): boolean {
    return this.isWarrantyValid(repairDate);
  }

  public getDetails() {
    return {
      id: this.id,
      motorcycleId: this.motorcycle.id,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      coverageDetails: this.coverageDetails.value,
      isActive: this.isActive
    };
  }
}
