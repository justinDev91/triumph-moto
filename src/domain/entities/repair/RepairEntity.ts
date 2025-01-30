import { RepairDate } from "@domain/values/repair/RepairDate";
import { BreakdownEntity } from "../breakdown/BreakdownEntity";
import { CommonRepairAction } from "@domain/types/motorcycle";
import { RepairCost } from "@domain/values/repair/RepairCost";

export class RepairEntity {
  private constructor(
    public id: string,
    public readonly breakdown: BreakdownEntity,
    public readonly repairDate: RepairDate,
    public actions: CommonRepairAction[],
    public readonly cost: RepairCost,
  ) {}

  public static create(
    id: string,
    breakdown: BreakdownEntity,
    repairDateValue: Date,
    actions: CommonRepairAction[],
    costValue: number,
  ): RepairEntity | Error {
    const repairDate = RepairDate.from(repairDateValue);
    if (repairDate instanceof Error) return repairDate;

    const cost = RepairCost.from(costValue);
    if (cost instanceof Error) return cost;

    return new RepairEntity(id, breakdown, repairDate, actions, cost);
  }

  public getDetails() {
    return {
      id: this.id,
      breakdownId: this.breakdown.id,
      repairDate: this.repairDate.value,
      actions: this.actions,
      cost: this.cost.value,
    };
  }

  public isHighCost(threshold: number): boolean {
    return this.cost.value > threshold;
  }

  public updateActions(actions: CommonRepairAction[]): void {
    this.actions = actions;
  }

  public isRepairCompleted(): boolean {
    return !!this.repairDate && this.cost.value > 0;
  }

  public associateRepairWithMotorcycle(): void {
    this.breakdown.motorcycle.status = "InMaintenance";
  }

  public isRepairCoveredByWarranty(): boolean {
    return this.breakdown.isCoveredByWarranty(this.repairDate.value);
  }
}
