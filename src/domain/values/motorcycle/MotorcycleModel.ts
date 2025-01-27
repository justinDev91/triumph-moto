import { MotorcycleModelError } from "../../errors/motorcycle/MotorcycleModelError";
import { Value } from "../Value";

export class MotorcycleModel implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): MotorcycleModel | MotorcycleModelError {
    if (!value || value.length < 2 || value.length > 50) {
      return new MotorcycleModelError();
    }
    return new MotorcycleModel(value);
  }

  public is(item: Value<string>): boolean {
    return this.value === item.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
