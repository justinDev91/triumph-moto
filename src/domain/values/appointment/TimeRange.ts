import { InvalidTimeRangeError } from "@domain/errors/appointment/InvalidTimeRangeError";
import { Value } from "../Value";

export class TimeRange implements Value<{ startTime: Date; endTime: Date }> {
  private constructor(
    private readonly startTimeValue: Date,
    private readonly endTimeValue: Date
  ) {}

  public static from(startTime: Date, endTime: Date): TimeRange | Error {
    if (startTime >= endTime) {
      return new InvalidTimeRangeError();
    }

    return new TimeRange(startTime, endTime);
  }

  public get value(): { startTime: Date; endTime: Date } {
    return { startTime: this.startTimeValue, endTime: this.endTimeValue };
  }

  public is(item: Value<{ startTime: Date; endTime: Date }>): boolean {
    return (
      item.value.startTime.getTime() === this.startTimeValue.getTime() &&
      item.value.endTime.getTime() === this.endTimeValue.getTime()
    );
  }

  public isValue(value: { startTime: Date; endTime: Date }): boolean {
    return (
      value.startTime.getTime() === this.startTimeValue.getTime() &&
      value.endTime.getTime() === this.endTimeValue.getTime()
    );
  }
}
