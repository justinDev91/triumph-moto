import { Name } from "@domain/values/company/Name";
import { MotorcycleEntity } from "../motorcycle/MotorcycleEntity";
import { UserEntity } from "../user/UserEntity";
import { CompanyEntity } from "../company/CompanyEntity";

export class ConcessionEntity {
  private motorcycles: MotorcycleEntity[] = [];

  private constructor(
    public readonly id: string,
    public name: Name,
    public user: UserEntity,
    public company: CompanyEntity,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  public static create(
    id: string,
    name: string,
    user: UserEntity,
    company: CompanyEntity,
    createdAt: Date,
    updatedAt: Date
  ): ConcessionEntity | Error {
    const nameValue = Name.from(name);
    if (nameValue instanceof Error) return nameValue;

    return new ConcessionEntity(id, nameValue, user, company, createdAt, updatedAt);
  }

  public updateName(newNameValue: string): void | Error {
    const newName = Name.from(newNameValue);
    if (newName instanceof Error) return newName;

    this.name = newName;
    this.updatedAt = new Date();
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

  public assignToCompany(company: CompanyEntity): void {
    this.company = company;
    this.updatedAt = new Date();
  }

  public removeFromCompany(): void {
    this.company = null!;
    this.updatedAt = new Date();
  }

  public getDetails(): {
    id: string;
    name: string;
    user: UserEntity;
    motorcycles?: MotorcycleEntity[] | null;
    company?: CompanyEntity | null;
  } {
    return {
      id: this.id,
      name: this.name.value,
      user: this.user,
      motorcycles: this.motorcycles,
      company: this.company,
    };
  }
}
