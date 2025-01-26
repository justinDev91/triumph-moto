import { DriverPhoneError } from '@domain/errors/driver/DriverPhoneError';
import { Value } from '../Value';

export class DriverPhone implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): DriverPhone | DriverPhoneError {
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(value)) {
      return new DriverPhoneError();
    }
    return new DriverPhone(value);
  }

  public is(item: Value<string>): boolean {
    return this.value === item.value;
  }

  public isValue(value: string): boolean {
    return value === this.value;
  }
}
