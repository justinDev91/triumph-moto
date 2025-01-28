import { Password } from "@domain/values/user/Password";
import { Username } from "@domain/values/user/Username";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { Email } from "@domain/values/user/Email";

export class UserEntity {
  private drivers: DriverEntity[] = [];

  private constructor(
    public id: string,
    public firstName: Username,
    public lastName: Username,
    public email: Email,  
    public password: Password,
    public readonly createdAt: Date,
    public readonly administrator: boolean, 
    public updatedAt: Date,
    public isActive: boolean = true, 
  ) {}
  
  public static create(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: Date,
    administrator: boolean,
    updatedAt: Date,
    isActive: boolean = true,  
  ): UserEntity | Error {

    const firstNameValue = Username.from(firstName);  
    if (firstNameValue instanceof Error) return firstNameValue; 

    const lastNameValue = Username.from(lastName); 
    if (lastNameValue instanceof Error) return lastNameValue; 

    const emailValue = Email.from(email);  
    if (emailValue instanceof Error) return emailValue;

    const passwordValue = Password.from(password); 
    if (passwordValue instanceof Error) return passwordValue; 

    return new UserEntity(
      id,
      firstNameValue,
      lastNameValue,
      emailValue,
      passwordValue,
      createdAt,
      administrator,  
      updatedAt,
      isActive, 
    );
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  public isAdmin(): boolean {
    return this.administrator;
  }

  public getRole(): string {
    return this.administrator ? "Administrator" : "User";
  }

  public addDriver(driver: DriverEntity): void {
    this.drivers.push(driver);
  }

  public removeDriver(driverId: string): void {
    this.drivers = this.drivers.filter((driver) => driver.id !== driverId);
  }

  public getDrivers(): DriverEntity[] {
    return this.drivers;
  }
}
