import { Name } from "@domain/values/company/Name";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { MotorcycleEntity } from "../motorcycle/MotorcycleEntity";
import { ConcessionEntity } from "../concession/ConcessionEntity";

export class CompanyEntity {
  private drivers: DriverEntity[] = [];
  private motorcycles: MotorcycleEntity[] = [];
  private concessions: ConcessionEntity[] = []; 

  private constructor(
    public readonly id: string,
    public name: Name,
    public user: UserEntity,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  public static create(
    id: string,
    name: string,
    user: UserEntity,
    createdAt: Date,
    updatedAt: Date
  ): CompanyEntity | Error {
    const companyName = Name.from(name);
    if (companyName instanceof Error) return companyName;

    return new CompanyEntity(id, companyName, user, createdAt, updatedAt);
  }

  public addDriver(driver: DriverEntity): void {
    if (!this.drivers.find(d => d.id === driver.id)) {
      this.drivers.push(driver);
      driver.assignToCompany(this);
    }
  }

  public removeDriver(driverId: string): void {
    const driver = this.drivers.find(d => d.id === driverId);
    this.drivers = this.drivers.filter(driver => driver.id !== driverId);
    if (driver) {
      driver.removeFromCompany();
    }
  }

  public getDrivers(): DriverEntity[] {
    return this.drivers;
  }

  public addMotorcycle(motorcycle: MotorcycleEntity): void {
    if (!this.motorcycles.find(m => m.id === motorcycle.id)) {
      this.motorcycles.push(motorcycle);
    }
  }

  public removeMotorcycle(motorcycleId: string): void {
    this.motorcycles = this.motorcycles.filter(
      (motorcycle) => motorcycle.id !== motorcycleId
    );
  }

  public getMotorcycles(): MotorcycleEntity[] {
    return this.motorcycles;
  }

  public addConcession(concession: ConcessionEntity): void {
    if (!this.concessions.find(c => c.id === concession.id)) {
      this.concessions.push(concession);
      concession.assignToCompany(this);
    }
  }

  public removeConcession(concessionId: string): void {
    const concession = this.concessions.find(c => c.id === concessionId);
    this.concessions = this.concessions.filter(
      (concession) => concession.id !== concessionId
    );
    if (concession) {
      concession.removeFromCompany();
    }
  }

  public getConcessions(): ConcessionEntity[] {
    return this.concessions;
  }

  public updateName(newName: string): void | Error {
    const newCompanyName = Name.from(newName);
    if (newCompanyName instanceof Error) return newCompanyName;

    this.name = newCompanyName;
    this.updatedAt = new Date();
  }

  public getDetails(): {
    id: string;
    name: string;
    user: UserEntity;
    motorcycles: MotorcycleEntity[];
    concessions: ConcessionEntity[];
  } {
    return {
      id: this.id,
      name: this.name.value,
      user: this.user,
      motorcycles: this.motorcycles,
      concessions: this.concessions,
    };
  }
}
