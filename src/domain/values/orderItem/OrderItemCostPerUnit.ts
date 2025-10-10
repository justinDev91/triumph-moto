import { OrderItemCostPerUnitError } from "@domain/errors/orderItem/OrderItemCostPerUnitError";
import { Value } from "../Value";

export class OrderItemCostPerUnit implements Value<number> {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): OrderItemCostPerUnit | Error {
    if (value <= 0) {
      return new OrderItemCostPerUnitError();
    }
    return new OrderItemCostPerUnit(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
