import { BreakdownReportedDateError } from "@domain/errors/breakdown/BreakdownReportedDateError";
import { Value } from "../Value";

export class BreakdownReportedDate implements Value<Date> {
  private constructor(public readonly value: Date) {}

  public static from(value: Date): BreakdownReportedDate | BreakdownReportedDateError {
    const currentDate = new Date();
    if (value > currentDate) {
      return new BreakdownReportedDateError();
    }
    return new BreakdownReportedDate(value);
  }

  public is(item: Value<Date>): boolean {
    return item.value.getTime() === this.value.getTime();
  }

  public isValue(value: Date): boolean {
    return this.value.getTime() === value.getTime();
  }
}
