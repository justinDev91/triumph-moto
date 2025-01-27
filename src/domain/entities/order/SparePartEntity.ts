import { OrderItemQuantityOrderedError } from "@domain/errors/orderItem/OrderItemQuantityOrderedError";
import { SparePartQuantityInStockError } from "@domain/errors/sparePart/SparePartQuantityInStockError";
import { SparePartCost } from "@domain/values/sparePart/SparePartCost";
import { SparePartCriticalLevel } from "@domain/values/sparePart/SparePartCriticalLevel";
import { SparePartName } from "@domain/values/sparePart/SparePartName";
import { SparePartQuantityInStock } from "@domain/values/sparePart/SparePartQuantityInStock";

export class SparePartEntity {
  private totalUsage: number = 0;
  private reservedStock: number = 0;

  private constructor(
    public readonly id: string,
    public readonly name: SparePartName,
    public quantityInStock: SparePartQuantityInStock,
    public criticalLevel: SparePartCriticalLevel,
    public cost: SparePartCost,
  ) {}

  public static create(
    nameValue: string,
    quantityInStockValue: number,
    criticalLevelValue: number,
    costValue: number
  ): SparePartEntity | Error {

    const id = crypto.randomUUID();

    const name = SparePartName.from(nameValue);
    if (name instanceof Error) return name;

    const quantityInStock = SparePartQuantityInStock.from(quantityInStockValue);
    if (quantityInStock instanceof Error) return quantityInStock;

    const criticalLevel = SparePartCriticalLevel.from(criticalLevelValue);
    if (criticalLevel instanceof Error) return criticalLevel;

    const cost = SparePartCost.from(costValue);
    if (cost instanceof Error) return cost;

    return new SparePartEntity(id, name, quantityInStock, criticalLevel, cost);
  }

  restock(quantity: number): void | Error {
    if (quantity < 0) return new SparePartQuantityInStockError();

    const currentQuantity = this.quantityInStock.value;
    const newQuantity = currentQuantity + quantity;

    const newQuantityInStock = SparePartQuantityInStock.from(newQuantity);
    if (newQuantityInStock instanceof Error) return newQuantityInStock;

    this.quantityInStock = newQuantityInStock;
  }

  reserve(quantity: number): boolean | Error {
    if (quantity > this.quantityInStock.value - this.reservedStock) {
      return new OrderItemQuantityOrderedError();
    }

    this.reservedStock += quantity;
    return true;
  }

  releaseReserved(quantity: number): void | Error {
    const quantityValue = SparePartQuantityInStock.from(quantity);
    if (quantityValue instanceof Error) return quantityValue;

    const quantityNumber: number = quantityValue.value;

    this.reservedStock = Math.max(0, this.reservedStock - quantityNumber);
  }

  isStockLow(): boolean {
    return this.quantityInStock.value <= this.criticalLevel.value;
  }

  use(quantity: number): boolean | Error {
    if (quantity > this.quantityInStock.value - this.reservedStock) {
      return new OrderItemQuantityOrderedError();
    }

    const newQuantity = this.quantityInStock.value - quantity;
    const newQuantityInStock = SparePartQuantityInStock.from(newQuantity);
    if (newQuantityInStock instanceof Error) return newQuantityInStock;

    this.quantityInStock = newQuantityInStock;
    this.totalUsage += quantity;
    this.reservedStock = Math.max(0, this.reservedStock - quantity);
    return true;
  }

  getTotalUsage(): number {
    return this.totalUsage;
  }

  getReservedStock(): number {
    return this.reservedStock;
  }
}