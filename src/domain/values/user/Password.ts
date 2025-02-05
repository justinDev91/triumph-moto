import { PasswordTooShortError } from "@domain/errors/user/PasswordTooShortError";
import { Value } from "../Value";

import { PasswordDoesNotIncludeLowercaseLetterError } from "@domain/errors/user/PasswordDoesNotIncludeLowercaseLetterError";
import { PasswordDoesNotIncludeNumberError } from "@domain/errors/user/PasswordDoesNotIncludeNumberError";
import { PasswordDoesNotIncludeUppercaseLetterError } from "@domain/errors/user/PasswordDoesNotIncludeUppercaseLetterError";
import { PasswordDoesNotIncludeSymbolError } from "@domain/errors/user/PasswordDoesNotIncludeSymbolError";

export class Password implements Value<string> {
  private constructor(private readonly hashedValue: string) {}

  public static from(value: string): Password | Error {
    if (value.length < 8) return new PasswordTooShortError();

    // if (!/(?=\d)/.test(value)) return new PasswordDoesNotIncludeNumberError();

    if (!/(?=[a-z])/.test(value)) return new PasswordDoesNotIncludeLowercaseLetterError();

    if (!/(?=[A-Z])/.test(value)) return new PasswordDoesNotIncludeUppercaseLetterError();

    // if (!/(?=[^a-zA-Z0-9])/.test(value)) return new PasswordDoesNotIncludeSymbolError();

    return new Password(value);
  }


  public is(item: Value<string>): boolean {
    return item.value === this.hashedValue;
  }

  public isValue(value: string): boolean {
    return value === this.hashedValue;
  }

  public get value(): string {
    return this.hashedValue;
  }
}
