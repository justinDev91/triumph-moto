import { StartDate } from "@domain/values/motorcycle/MotorcycleTrialStartDate";
import { MotorcycleEntity } from "../motorcycle/MotorcycleEntity";
import { UserEntity } from "../user/UserEntity";
import { EndDate } from "@domain/values/motorcycle/MotorcycleTrialEndDate";
import { LocationStatus } from "@domain/types/LocationStatus";
import { EndLocationError } from "@domain/errors/location/EndLocationError";
import { CancelLocationError } from "@domain/errors/location/CancelLocationError";
import { EndDateError } from "@domain/errors/location/EndDateError";

export class LocationEntity {

  private constructor(
    public id: string,
    public motorcycle: MotorcycleEntity,
    public user: UserEntity,
    public startDate: StartDate,
    public endDate: EndDate | null,
    public status: LocationStatus,
    public cost: number,
  ) {
   
  }

  public static create(
    id: string,
    motorcycle: MotorcycleEntity,
    user: UserEntity,
    startDate: Date,
    endDate: Date,
    status: LocationStatus,
    cost: number
  ): LocationEntity | Error {
    
    const startDateValue = StartDate.from(startDate);
    if ( startDateValue instanceof Error) return startDateValue;

    const endDateValue = EndDate.from(endDate, startDate);
    if (endDateValue instanceof Error) return endDateValue;

    return new LocationEntity(id, motorcycle, user, startDateValue, endDateValue, status, cost);
  }

  public endLocation(): void | Error {
    if (this.status === 'completed' || this.status === 'canceled') return new EndLocationError();
    
    const endDate = new Date();
    
    const endDateValue = EndDate.from(this.startDate.value, endDate);
    if (endDateValue instanceof Error) return endDateValue;

    this.endDate = endDateValue;
    this.status = 'completed';
  }

  public cancelLocation(): void | Error {
    if (this.status === 'completed' || this.status === 'canceled') return new CancelLocationError();
    
    this.status = 'canceled';
    this.endDate = null;
  }

  public calculateCost(): number | Error {
    if (!this.endDate) return new EndDateError();
    console.log("this.endDate.value.getTime()", this.endDate, this.endDate.value.getTime())
    console.log("this.startDate.value.getTime()", this.startDate, this.startDate.value.getTime())


    const durationInMilliseconds = this.endDate.value.getTime() - this.startDate.value.getTime();
    console.log("durationInMilliseconds", durationInMilliseconds)
    const durationInHours = durationInMilliseconds / (1000 * 3600);
    this.cost = Math.round(durationInHours * 10); 
  }

  public getDetails(): object {
    return {
      id: this.id, 
      motorcycle: this.motorcycle,
      user: this.user,
      startDate: this.startDate.value,
      endDate: this.endDate ? this.endDate.value : null,
      status: this.status,
      cost: this.cost,
    };
  }
}
