import { RepairCostError } from "../../errors/repair/RepairCostError";
import { Value } from "../Value";

export class RepairCost implements Value<number> {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): RepairCost | Error {
    if (value < 0) {
      return new RepairCostError();
    }
    return new RepairCost(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
