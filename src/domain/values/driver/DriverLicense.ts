import { ExperienceError } from '@domain/errors/driver/ExperienceError';
import { Value } from '../Value';


export class DriveLicense implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): DriveLicense | Error {
    if (!/^[A-Z0-9]{10}$/.test(value)) {
      return new ExperienceError();
    }
    return new DriveLicense(value);
  }

  public is(item: Value<string>): boolean {
    return this.value === item.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
