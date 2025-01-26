import { DriverEmailError } from '@domain/errors/driver/DriverEmailError';
import { Value } from '../Value';

export class DriverEmail implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): DriverEmail | DriverEmailError {
    const normalizedValue = /\S+@\S+\.\S+/;
    if (!normalizedValue.test(value)) {
      return new DriverEmailError();
    }
    return new DriverEmail(value);
  }

  public is(item: Value<string>): boolean {
    return this.value === item.value;
  }

  public isValue(value: string): boolean {
    return value === this.value;
  }
}
