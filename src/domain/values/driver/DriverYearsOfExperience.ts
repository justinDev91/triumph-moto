import { ExperienceError } from '@domain/errors/driver/ExperienceError';
import { Value } from '../Value'; 

export class DriveYearsOfExperience implements Value<number> {
  private constructor(public readonly value: number) {}

  public static from(value: number): DriveYearsOfExperience | ExperienceError {
    if ( value < 3) {
      return new ExperienceError();
    }
    return new DriveYearsOfExperience(value);
  }

  public is(item: Value<number>): boolean {
    return this.value === item.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
