import { EndDateError } from "@domain/errors/location/EndDateError";
import { StartDate } from "./StartDate";

export class EndDate {
    private constructor(public readonly value: Date) {}
  
    public static from(value: Date, startDate: StartDate): EndDate | Error {
      if (value.getTime() < startDate.value.getTime()) {
        return new EndDateError();
      }
      return new EndDate(value);
    }
  }