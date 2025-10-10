import { MotorcycleYearError } from "../../errors/motorcycle/MotorcycleYearError";
import { Value } from "../Value";

export class MotorcycleYear implements Value<number> {
  private constructor(public readonly value: number) {}

  public static from(value: number): MotorcycleYear | MotorcycleYearError {
    const currentYear = new Date().getFullYear();
    if (value < 1900 || value > currentYear) {
      return new MotorcycleYearError();
    }
    return new MotorcycleYear(value);
  }

  public is(item: Value<number>): boolean {
    return this.value === item.value;
  }

  public isValue(value: number): boolean {
    return this.value === value;
  }
}
