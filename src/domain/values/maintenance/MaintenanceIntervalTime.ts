import { MaintenanceIntervalTimeError } from "@domain/errors/maintenance/MaintenanceIntervalTime";
import { Value } from "../Value";

const MAX_TIME_DAYS = 365;

export class MaintenanceIntervalTime implements Value<number> {
  private constructor(public readonly value: number) {}

  public static from(value: number): MaintenanceIntervalTime | MaintenanceIntervalTimeError{
    if (value <= 0) {
      return new MaintenanceIntervalTimeError();
    }
    if (value > MAX_TIME_DAYS) {
      return new MaintenanceIntervalTimeError();
    }
    return new MaintenanceIntervalTime(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return this.value === value;
  }
}
