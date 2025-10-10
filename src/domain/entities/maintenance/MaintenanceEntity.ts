import { MaintenanceIntervalMileage } from "@domain/values/maintenance/MaintenanceIntervalMileage";
import { MotorcycleEntity } from "../motorcycle/MotorcycleEntity";
import { MaintenanceIntervalTime } from "@domain/values/maintenance/MaintenanceIntervalTime";
import { ConcessionEntity } from "../concession/ConcessionEntity";
import { MaintenanceType } from "@domain/types/MaintenanceType";

export class MaintenanceEntity {
  private constructor(
    public readonly id: string,
    public readonly motorcycle: MotorcycleEntity,
    public maintenanceType: MaintenanceType,
    public date: Date,
    public cost: number,
    public mileageAtService: number,
    public readonly maintenanceIntervalMileage: MaintenanceIntervalMileage,
    public readonly maintenanceIntervalTime: MaintenanceIntervalTime,
    public concession: ConcessionEntity | null = null,
  ) {}

  public static create(
    id: string,
    motorcycle: MotorcycleEntity,
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number,
    mileageAtService: number,
    maintenanceIntervalMileage: number,
    maintenanceIntervalTime: number,
    concession: ConcessionEntity | null = null,
  ): MaintenanceEntity | Error {
    const mileage = MaintenanceIntervalMileage.from(maintenanceIntervalMileage);
    if (mileage instanceof Error) return mileage;

    const time = MaintenanceIntervalTime.from(maintenanceIntervalTime);
    if (time instanceof Error) return time;

    return new MaintenanceEntity(
      id,
      motorcycle,
      maintenanceType,
      date,
      cost,
      mileageAtService,
      mileage,
      time,
      concession
    );
  }

  public scheduleNextMaintenance(): void {
    const nextMileage =
      this.motorcycle.nextServiceMileage + this.maintenanceIntervalMileage.value;

    const lastServiceDate = this.motorcycle.lastServiceDate || new Date();
    const nextServiceDate = new Date(lastServiceDate);
    nextServiceDate.setDate(
      nextServiceDate.getDate() + this.maintenanceIntervalTime.value
    );

    this.motorcycle.updateServiceDetails(nextMileage, nextServiceDate);
  }

  public needsMaintenance(): boolean {
    const mileageCheck = this.motorcycle.needsService();
    const timeCheck = this.motorcycle.lastServiceDate
      ? (new Date().getTime() - this.motorcycle.lastServiceDate.getTime()) /
          (1000 * 3600 * 24) >= this.maintenanceIntervalTime.value
      : false;

    return mileageCheck || timeCheck;
  }

  public getDetails(): object {
    return {
      id: this.id,
      motorcycleId: this.motorcycle.id,
      maintenanceType: this.maintenanceType,
      date: this.date,
      cost: this.cost,
      concession: this.concession.getDetails(),
      mileageAtService: this.mileageAtService,
      maintenanceIntervalMileage: this.maintenanceIntervalMileage.value,
      maintenanceIntervalTime: this.maintenanceIntervalTime.value,
    };
  }

  public updateDetails(
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number
  ): void | Error {
    this.maintenanceType = maintenanceType;
    this.date = date;
    this.cost = cost;
  }

  public isMaintenanceCompleted(): boolean {
    return !!this.date && this.cost > 0 && this.mileageAtService > 0;
  }

  public isMaintenanceOverdue(): boolean {
    const currentMileage = this.motorcycle.mileage;
    const nextScheduledMileage = this.motorcycle.nextServiceMileage;
    const overdueMileage = currentMileage > nextScheduledMileage;

    const currentDate = new Date();
    const lastServiceDate = this.motorcycle.lastServiceDate || new Date();
    const nextScheduledDate = new Date(lastServiceDate);
    nextScheduledDate.setDate(
      nextScheduledDate.getDate() + this.maintenanceIntervalTime.value
    );
    const overdueTime = currentDate > nextScheduledDate;

    return overdueMileage || overdueTime;
  }

  public updateConcession(concession: ConcessionEntity): void {
    this.concession = concession;
  }

  public predictNextMaintenanceDate(): Date {
    const lastServiceDate = this.motorcycle.lastServiceDate || new Date();
    const nextServiceDate = new Date(lastServiceDate);
    nextServiceDate.setDate(
      nextServiceDate.getDate() + this.maintenanceIntervalTime.value
    );

    return nextServiceDate;
  }
}
