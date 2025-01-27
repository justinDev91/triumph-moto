import { WarrantyCoverageDetailsError } from "../../errors/warranty/WarrantyCoverageDetailsError";
import { Value } from "../Value";

export class WarrantyCoverageDetails implements Value<string> {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): WarrantyCoverageDetails | Error {
    const regex = /^[a-zA-Z0-9\s]*$/; 
    if (!regex.test(value)) {
      return new WarrantyCoverageDetailsError();
    }
    if (value.length > 1000) { 
      return new WarrantyCoverageDetailsError();
    }
    return new WarrantyCoverageDetails(value);
  }

  public is(item: Value<string>): boolean {
    return item.value === this.value;
  }

  public isValue(value: string): boolean {
    return value === this.value;
  }
}
