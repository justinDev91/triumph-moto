import { SparePartCriticalLevelError } from "@domain/errors/sparePart/SparePartCriticalLevelError";
import { Value } from "../Value";

export class SparePartCriticalLevel implements Value<number> {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): SparePartCriticalLevel | Error {
    if (value < 0) {
      return new SparePartCriticalLevelError();
    }
    if (value < 4) {
      return new SparePartCriticalLevelError();
    }
    return new SparePartCriticalLevel(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
