import { EstimatedDeliveryDateError } from "@domain/errors/order/EstimatedDeliveryDateError";
import { Value } from "../Value";

export class EstimatedDeliveryDate implements Value<Date> {
  public readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date, orderDate: Date): EstimatedDeliveryDate | Error {
    if (value < new Date()) {
      return new EstimatedDeliveryDateError();
    }

    const maxDeliveryDate = new Date(orderDate);
    maxDeliveryDate.setDate(maxDeliveryDate.getDate() + 365); 

    if (value > maxDeliveryDate) {
      return new EstimatedDeliveryDateError();
    }

    return new EstimatedDeliveryDate(value);
  }

  public is(item: Value<Date>): boolean {
    return item.value.getTime() === this.value.getTime();
  }

  public isValue(value: Date): boolean {
    return value.getTime() === this.value.getTime();
  }
}
