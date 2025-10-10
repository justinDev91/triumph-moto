import { NameLengthError } from "../../errors/company/NameLengthError";
import { NameAlphanumericError } from "../../errors/concession/NameAlphanumericError";

export class Name {
    private constructor(public readonly value: string) {}
  
    public static from(value: string): Name | Error {
      const regex = /^[a-zA-Z0-9.]+$/;
  
      if (value.length < 3 || value.length > 50) {
        return new NameLengthError();
      }
  
      if (!regex.test(value)) {
        return new NameAlphanumericError();
      }
  
      return new Name(value);
    }
  }
  