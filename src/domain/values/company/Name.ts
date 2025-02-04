import { NameAlphanumericError } from "@domain/errors/company/NameAlphanumericError";
import { NameLengthError } from "@domain/errors/company/NameLengthError";

export class Name {
  private constructor(public readonly value: string) {}

  public static from(value: string): Name | Error {
    const regex = /^[a-zA-Z0-9.\s-]+$/;

    if (value.length < 3 || value.length > 50) {
      return new NameLengthError();
    }

    if (!regex.test(value)) {
      return new NameAlphanumericError();
    }

    return new Name(value);
  }
}
