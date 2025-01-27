import { BreakdownDescriptionError } from "@domain/errors/breakdown/BreakdownDescriptionError";
import { Value } from "../Value";

export class BreakdownDescription implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): BreakdownDescription | BreakdownDescriptionError {
    if (value.length < 5) {
      return new BreakdownDescriptionError();
    }
    if (value.length > 300) {
      return new BreakdownDescriptionError();
    }
    return new BreakdownDescription(value);
  }

  public is(item: Value<string>): boolean {
    return item.value === this.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
