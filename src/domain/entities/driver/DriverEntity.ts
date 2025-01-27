import { DriverEmailError } from "@domain/errors/driver/DriverEmailError";
import { DriverPhoneError } from "@domain/errors/driver/DriverPhoneError";
import { ExperienceError } from "@domain/errors/driver/ExperienceError";
import { DrivingRecord, LicenseType } from "@domain/types/motorcycle";
import { DriverEmail } from "@domain/values/driver/DriverEmail";
import { DriveLicense } from "@domain/values/driver/DriverLicense";
import { DriveName } from "@domain/values/driver/DriverName";
import { DriverPhone } from "@domain/values/driver/DriverPhone";
import { DriveYearsOfExperience } from "@domain/values/driver/DriverYearsOfExperience";
import { CompanyEntity } from "../company/CompanyEntity";
import { UserEntity } from "../user/UserEntity";


export class DriverEntity {
  
  private readonly drivingHistory: DrivingRecord[] = []

  private constructor(
    public readonly id: string,
    public name: DriveName,
    public license: DriveLicense,
    public licenseType: LicenseType,
    public yearsOfExperience: DriveYearsOfExperience,
    public email: DriverEmail,
    public phone: DriverPhone,
    public company: CompanyEntity | null = null ,
    public user: UserEntity | null = null
  ) {}

  public static create(
    id: string,
    nameValue: string,
    licenseType: LicenseType,
    licenseValue: string,
    yearsOfExperienceValue: number,
    emailValue: string,
    phoneValue: string,
    company: CompanyEntity | null = null,
    user: UserEntity | null = null
  ): DriverEntity | Error {

    const name = DriveName.from(nameValue);
    if (name instanceof Error) return name;

    const license = DriveLicense.from(licenseValue);
    if (license instanceof Error) return license;

    const yearsOfExperience = DriveYearsOfExperience.from(yearsOfExperienceValue);
    if (yearsOfExperience instanceof Error) return yearsOfExperience;

    const email = DriverEmail.from(emailValue);
    if (email instanceof DriverEmailError) return email;

    const phone = DriverPhone.from(phoneValue);
    if (phone instanceof DriverPhoneError) return phone;

    return new DriverEntity(
      id,
      name,
      license,
      licenseType,
      yearsOfExperience,
      email,
      phone,
      company,
      user
    );
  }

  public updateExperience(newYearsOfExperience: number): void | Error {
    const updatedExperience = DriveYearsOfExperience.from(newYearsOfExperience);
    if (updatedExperience instanceof Error) return updatedExperience

    if (updatedExperience.value < this.yearsOfExperience.value) return new ExperienceError();
    
    this.yearsOfExperience = updatedExperience;
  }

  public updateContactInfo(newContactInfo: { email: string; phone: string }): void | Error {
    const updatedEmail = DriverEmail.from(newContactInfo.email);

    if (updatedEmail instanceof Error) return updatedEmail

    const updatedPhone = DriverPhone.from(newContactInfo.phone);

    if(updatedPhone instanceof Error) return updatedPhone

    this.email = updatedEmail;
    this.phone = updatedPhone;
  }

  public addDrivingRecord(record: DrivingRecord): void {
    this.drivingHistory.push(record);
  }

  public getDrivingHistory(): DrivingRecord[] {
    return this.drivingHistory;
  }

  public hasIncidentHistory(): boolean {
    return this.drivingHistory.some((record) => record.type === 'Incident');
  }

  public assignToCompany(company: CompanyEntity): void {
    this.company = company;
  }

  public removeFromCompany(): void {
    this.company = null;
  }

  public getCompanyDetails(): object | null {
    if (!this.company) {
      return null;
    }

    return {
      identifier: this.company.id,
      name: this.company.name.value,
      user: this.company.user,
    };
  }

}