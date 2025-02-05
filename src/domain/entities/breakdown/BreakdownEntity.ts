import { BreakdownDescription } from "@domain/values/breakdown/BreakdownDescription";
import { MotorcycleEntity } from "../motorcycle/MotorcycleEntity";
import { BreakdownReportedDate } from "@domain/values/breakdown/BreakdownReportedDate";
import { WarrantyEntity } from "../warranty/WarrantyEntity";
import { BreakdownInvalidWarrantyError } from "@domain/errors/breakdown/BreakdownInvalidWarrantyError";
import { RepairEntity } from "../repair/RepairEntity";

export class BreakdownEntity {
  private repairs: RepairEntity[] = [];

  private constructor(
    public readonly id: string,
    public readonly motorcycle: MotorcycleEntity,
    public description: BreakdownDescription,
    public readonly reportedDate: BreakdownReportedDate,
    public warranty: WarrantyEntity | null,
  ) {}

  public static create(
    id: string,
    motorcycle: MotorcycleEntity,
    descriptionValue: string,
    reportedDateValue: Date,
    warranty: WarrantyEntity | null,
  ): BreakdownEntity | Error {
    const description = BreakdownDescription.from(descriptionValue);
    if (description instanceof Error) return description;

    const reportedDate = BreakdownReportedDate.from(reportedDateValue);
    if (reportedDate instanceof Error) return reportedDate;

    return new BreakdownEntity(id, motorcycle, description, reportedDate, warranty);
  }

  public addRepair(repair: RepairEntity): void {
    this.repairs.push(repair);
    this.motorcycle.status = 'InMaintenance';
  }

  public getRepairHistory(): RepairEntity[] {
    return this.repairs;
  }

  public clearRepairHistory(): void {
    this.repairs = [];
  }

  public calculateTotalRepairCost(): number {
    return this.repairs.reduce((total, repair) => total + repair.cost.value, 0);
  }

  public isCoveredByWarranty(checkDate: Date): boolean {
    if (!this.warranty) {
      return false    }
    return this.warranty.isWarrantyValid(checkDate);
  }

  public getBreakdownDetails(): object {
    return {
      id: this.id,
      motorcycleId: this.motorcycle.id,
      description: this.description.value,
      reportedDate: this.reportedDate.value,
      warranty: this.warranty ? this.warranty.getDetails() : null,
      repairs: this.repairs.map((repair) => repair.getDetails()),
      totalRepairCost: this.calculateTotalRepairCost(),
    };
  }

  public updateBreakdownDescription(newDescription: string): void | Error {
    const updatedDescription = BreakdownDescription.from(newDescription);
    if (updatedDescription instanceof Error) return updatedDescription;

    this.description = updatedDescription;
  }

  public removeRepair(repairId: string): void | Error {
    const repairIndex = this.repairs.findIndex((repair) => repair.id === repairId);
    if (repairIndex === -1) {
      return new Error(`Repair with id ${repairId} not found`);
    }
    this.repairs.splice(repairIndex, 1);
    this.motorcycle.status = 'Available';
  }

  public markBreakdownResolved(): void {
    this.motorcycle.status = 'Available';
    this.clearRepairHistory();
  }

  public markBreakdownInProgress(): void {
    this.motorcycle.status = 'InMaintenance';
  }

  public getBreakdownStatus(): string {
    return this.motorcycle.status;
  }
}
