import { WarrantyStartDateError } from "../../errors/warranty/WarrantyStartDateError";
import { Value } from "../Value";

export class WarrantyStartDate implements Value<Date> {
  public readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date): WarrantyStartDate | Error {
    if (value > new Date()) { 
      return new WarrantyStartDateError();
    }
    return new WarrantyStartDate(value);
  }

  public is(item: Value<Date>): boolean {
    return item.value.getTime() === this.value.getTime();
  }

  public isValue(value: Date): boolean {
    return value.getTime() === this.value.getTime();
  }
}
