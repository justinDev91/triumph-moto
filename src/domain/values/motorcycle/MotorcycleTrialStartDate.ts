import { MotorcycleTrialStartDateError } from "@domain/errors/motorcycle/MotorcycleTrialStartDateError";
import { Value } from "../Value";

export class StartDate implements Value<Date> {
  constructor(public readonly value: Date) {}

  public static from(value: Date): StartDate | MotorcycleTrialStartDateError {
    const now = new Date();
    if (value < now) {
      return new MotorcycleTrialStartDateError();
    }
    return new StartDate(value);
  }

  public is(item: Value<Date>): boolean {
    return this.value === item.value;
  }

  public isValue(value: Date): boolean {
    return this.value.getTime() === value.getTime();
  }
}
