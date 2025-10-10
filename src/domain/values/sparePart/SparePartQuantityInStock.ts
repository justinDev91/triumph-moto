import { SparePartQuantityInStockError } from "@domain/errors/sparePart/SparePartQuantityInStockError";
import { Value } from "../Value";

export class SparePartQuantityInStock implements Value<number> {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): SparePartQuantityInStock | Error {
    if (value < 0) {
      return new SparePartQuantityInStockError();
    }
    return new SparePartQuantityInStock(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
