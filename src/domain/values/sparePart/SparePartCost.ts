import { SparePartCostError } from "@domain/errors/sparePart/SparePartCostError";
import { Value } from "../Value";

export class SparePartCost implements Value<number> {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): SparePartCost | Error {
    if (value < 0) {
      return new SparePartCostError();
    }
    return new SparePartCost(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
