import { WarrantyEndDateError } from "../../errors/warranty/WarrantyEndDateError";
import { Value } from "../Value";

export class WarrantyEndDate implements Value<Date> {
  public readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date, startDate: Date): WarrantyEndDate | Error {
    if (value < new Date()) {
      return new WarrantyEndDateError();
    }
    if ((value.getTime() - startDate.getTime()) > 365 * 24 * 60 * 60 * 1000) {
      return new WarrantyEndDateError();
    }
    return new WarrantyEndDate(value);
  }

  public is(item: Value<Date>): boolean {
    return item.value.getTime() === this.value.getTime();
  }

  public isValue(value: Date): boolean {
    return value.getTime() === this.value.getTime();
  }
}
