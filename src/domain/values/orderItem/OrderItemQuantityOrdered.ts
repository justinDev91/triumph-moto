import { OrderItemQuantityOrderedError } from "@domain/errors/orderItem/OrderItemQuantityOrderedError";
import { Value } from "../Value";

export class OrderItemQuantityOrdered implements Value<number> {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): OrderItemQuantityOrdered | Error {
    if (value <= 0) {
      return new OrderItemQuantityOrderedError();
    }
    return new OrderItemQuantityOrdered(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
