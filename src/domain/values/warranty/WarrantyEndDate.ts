import { WarrantyEndDateError } from "../../errors/warranty/WarrantyEndDateError"; 
import { Value } from "../Value";

export class WarrantyEndDate implements Value<Date> {
  public readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date | string, startDate: Date | string): WarrantyEndDate | Error {
    const endDate = value instanceof Date ? value : new Date(value);
    const warrantyStartDate = startDate instanceof Date ? startDate : new Date(startDate);

    if (endDate < new Date()) {
      return new WarrantyEndDateError();
    }


    if ((endDate.getTime() - warrantyStartDate.getTime()) > 365 * 24 * 60 * 60 * 1000) {
      return new WarrantyEndDateError();
    }

    return new WarrantyEndDate(endDate);
  }

  public is(item: Value<Date>): boolean {
    return item.value.getTime() === this.value.getTime();
  }

  public isValue(value: Date): boolean {
    return value.getTime() === this.value.getTime();
  }
}
