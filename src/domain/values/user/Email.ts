export class Email {
    private constructor(public readonly value: string) {}
  
    public static from(value: string): Email | Error {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return new Error("Invalid email format");
      }
      return new Email(value);
    }
  }
  