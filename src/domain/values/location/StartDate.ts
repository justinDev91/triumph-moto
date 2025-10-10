import { StartDateError } from "@domain/errors/location/StartDateError";

export class StartDate {
    private constructor(public readonly value: Date) {}
  
    public static from(value: Date): StartDate | Error {
      if (value.getTime() > new Date().getTime()) {
        return new  StartDateError;
      }
      return new StartDate(value);
    }
  }