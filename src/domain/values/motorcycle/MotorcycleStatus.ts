import { MotorcycleStatusError } from "../../errors/motorcycle/MotorcycleStatusError";
import { Value } from "../Value";

export class MotorcycleStatus implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): MotorcycleStatus | MotorcycleStatusError {
    const validStatuses = ['Available', 'Sold', 'In Service', 'Reserved, InMaintenance'];
    if (!validStatuses.includes(value)) {
      return new MotorcycleStatusError();
    }
    return new MotorcycleStatus(value);
  }

  public is(item: Value<string>): boolean {
    return this.value === item.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
