import { SparePartNameError } from "@domain/errors/sparePart/SparePartNameError";
import { Value } from "../Value";

export class SparePartName implements Value<string> {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): SparePartName | Error {
    if (!/^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(value)) {
      return new SparePartNameError();
    }
    if (value.length > 50) {
      return new SparePartNameError();
    }
    return new SparePartName(value);
  }

  public is(item: Value<string>): boolean {
    return item.value === this.value;
  }

  public isValue(value: string): boolean {
    return value === this.value;
  }
}
