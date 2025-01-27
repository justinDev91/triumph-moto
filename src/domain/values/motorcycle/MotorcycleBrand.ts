import { MotorcycleBrandError } from "../../errors/motorcycle/MotorcycleBrandError";
import { Value } from "../Value";

export class MotorcycleBrand implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): MotorcycleBrand | MotorcycleBrandError {
    if (!value || value.length < 2 || value.length > 50) {
      return new MotorcycleBrandError();
    }
    return new MotorcycleBrand(value);
  }

  public is(item: Value<string>): boolean {
    return this.value === item.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
