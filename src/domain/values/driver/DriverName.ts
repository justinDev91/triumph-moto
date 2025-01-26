import { DriverNameError } from '../../errors/driver/DriverNameError';
import { Value } from '../Value';

export class DriveName implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): DriveName | Error {
    const normalizedValue = value.trim();

    if (normalizedValue.length < 3 || normalizedValue.length > 30) {
      return new DriverNameError();
    }

    if (!/^[a-zA-Z\s]+$/.test(normalizedValue)) {
      return new DriverNameError();
    }

    return new DriveName(normalizedValue);
  }

  public is(item: Value<string>): boolean {
    return this.value === item.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
