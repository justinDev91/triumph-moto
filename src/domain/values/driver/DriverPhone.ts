import { DriverPhoneError } from '@domain/errors/driver/DriverPhoneError';
import { Value } from '../Value';

export class DriverPhone implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): DriverPhone | DriverPhoneError {
    const phonePattern = /^(\d{10}|\d{1,2}-\d{3}-\d{3}-\d{4}( x\d{1,6})?)$/;
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
