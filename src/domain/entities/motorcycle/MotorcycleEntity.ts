import { ConcessionEntity } from '@domain/entities/concession/ConcessionEntity';
import { MotorStatus } from "@domain/types/motorcycle";
import { MotorcycleBrand } from "@domain/values/motorcycle/MotorcycleBrand";
import { MotorcycleModel } from "@domain/values/motorcycle/MotorcycleModel";
import { MotorcycleYear } from "@domain/values/motorcycle/MotorcycleYear";
import { CompanyEntity } from "../company/CompanyEntity";
import { MotorcycleMileageError } from "@domain/errors/motorcycle/MotorcycleMileageError";
import { MotorcycleUpdateServiceDetailsError } from "@domain/errors/motorcycle/MotorcycleUpdateServiceDetailsError";

export class MotorcycleEntity {
  private constructor(
    public readonly id: string,
    public brand: MotorcycleBrand,
    public model: MotorcycleModel,
    public year: MotorcycleYear,
    private _mileage: number,
    public status: MotorStatus,
    private readonly _purchaseDate: Date,
    private _lastServiceDate: Date | null,
    private _nextServiceMileage: number,
    public readonly createdAt: Date,
    public updatedAt: Date,
    private company: CompanyEntity | null = null,
    private concession: ConcessionEntity | null = null,
  ) {}

  public static create(
    id: string,
    brand: string,
    model: string,
    year: number,
    mileage: number,
    status: MotorStatus,
    purchaseDate: Date,
    lastServiceDate: Date | null,
    nextServiceMileage: number,
    createdAt: Date,
    updatedAt: Date,
    company: CompanyEntity | null = null,
    concession: ConcessionEntity | null = null,
  ): MotorcycleEntity | Error {

    const brandValue = MotorcycleBrand.from(brand);
    if (brandValue instanceof Error) return brandValue;

    const modelValue = MotorcycleModel.from(model);
    if (modelValue instanceof Error) return modelValue;

    const yearValue = MotorcycleYear.from(year);
    if (yearValue instanceof Error) return yearValue;

    return new MotorcycleEntity(
      id,
      brandValue,
      modelValue,
      yearValue,
      mileage,
      status,
      purchaseDate,
      lastServiceDate,
      nextServiceMileage,
      createdAt,
      updatedAt,
      company,
      concession
    );
  }

  public updateMileage(newMileage: number): void {
    if (newMileage < this._mileage) {
      throw new MotorcycleMileageError();
    }
    this._mileage = newMileage;
    this.updatedAt = new Date();
  }

  public needsService(): boolean {
    return this._mileage >= this._nextServiceMileage;
  }

  public updateServiceDetails(newServiceMileage: number, serviceDate: Date): void {
    if (newServiceMileage < this._mileage) {
      throw new MotorcycleUpdateServiceDetailsError();
    }
    this._nextServiceMileage = newServiceMileage;
    this._lastServiceDate = serviceDate;
    this.updatedAt = new Date();
  }

  public updateStatus(newStatus: MotorStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  public assignToCompany(company: CompanyEntity): void {
    this.company = company;
    this.updatedAt = new Date();
  }

  public removeFromCompany(): void {
    this.company = null;
    this.updatedAt = new Date();
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

  public assignToConcession(concession: ConcessionEntity): void {
    this.concession = concession;
    this.updatedAt = new Date();
  }

  public removeFromConcession(): void {
    this.concession = null;
    this.updatedAt = new Date();
  }

  public getConcessionDetails(): object | null {
    if (!this.concession) {
      return null;
    }
    return {
      identifier: this.concession.id,
      name: this.concession.name.value,
      user: this.concession.user,
    };
  }

  public get mileage(): number {
    return this._mileage;
  }

  public get purchaseDate(): Date {
    return this._purchaseDate;
  }

  public get lastServiceDate(): Date | null {
    return this._lastServiceDate;
  }

  public get nextServiceMileage(): number {
    return this._nextServiceMileage;
  }
}
