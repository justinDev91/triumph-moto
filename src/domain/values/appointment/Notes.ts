import { InvalidNoteError } from "@domain/errors/appointment/InvalidNoteError";
import { Value } from "../Value";

  export class Notes implements Value<string> {
    private constructor(private readonly noteValue: string) {}

    public static from(value: string): Notes | Error {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        return new InvalidNoteError();
      }

      return new Notes(value.trim());
    }

    public get value(): string {
      return this.noteValue;
    }

    public is(item: Value<string>): boolean {
      return item.value === this.noteValue;
    }

    public isValue(value: string): boolean {
      return value === this.noteValue;
    }
  }
