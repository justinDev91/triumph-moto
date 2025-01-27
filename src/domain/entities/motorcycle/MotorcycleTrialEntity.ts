import { StartDate } from "@domain/values/motorcycle/MotorcycleTrialStartDate";
import { DriverEntity } from "../driver/DriverEntity";
import { MotorcycleEntity } from "./MotorcycleEntity";
import { EndDate } from "@domain/values/motorcycle/MotorcycleTrialEndDate";
import { MotorcycleTrialEndDateError } from "@domain/errors/motorcycle/MotorcycleTrialEndDateError";

export class MotorcycleTrialEntity {
  private constructor(
    public readonly id: string,
    public readonly motorcycle: MotorcycleEntity,
    public readonly driver: DriverEntity,
    public startDate: StartDate,
    public endDate: EndDate | null,
  ) {}

  public static create(
    id: string,
    motorcycle: MotorcycleEntity,
    driver: DriverEntity,
    startDate: Date,
    endDate: Date,
  ): MotorcycleTrialEntity | Error {

    const startDateValue = StartDate.from(startDate);
    if (startDateValue instanceof Error) {
      return startDateValue;
    }
    
    const endDateValue = EndDate.from(startDate, endDate);
    if (endDateValue instanceof Error) {
      return endDateValue;
    }

    return new MotorcycleTrialEntity(id, motorcycle, driver, startDateValue, endDateValue);
  }

  public getTestDuration(): number | null {
    if (this.endDate) {
      const duration = Math.floor(
        (this.endDate.value.getTime() - this.startDate.value.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      return duration;
    }
    return null;
  }

  public endTest(endDate: Date): void {
    const endDateValue = EndDate.from(this.startDate.value, endDate);
    if (endDateValue instanceof Error) {
      throw new MotorcycleTrialEndDateError();
    }
    this.endDate = endDateValue;
  }

  public isTestOngoing(): boolean {
    return this.endDate === null;
  }

  public getTestSummary(): string {
    const duration = this.getTestDuration();
    const status = this.isTestOngoing()
      ? 'Ongoing'
      : `Completed in ${duration} days`;
    return `Moto Test ID: ${this.id} | DriverEntity: ${this.driver.name} | Motorcycle: ${this.motorcycle.model} | Status: ${status}`;
  }
}
