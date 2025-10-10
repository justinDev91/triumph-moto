
import { SparePartEntity } from './SparePartEntity';
import { OrderItemQuantityOrdered } from '@domain/values/orderItem/OrderItemQuantityOrdered';
import { OrderItemCostPerUnit } from '@domain/values/orderItem/OrderItemCostPerUnit';
import { OrderItemDeliveredQuantity } from '@domain/values/orderItem/OrderItemDeliveredQuantity';
import { OrderItemQuantityExceedError } from '@domain/errors/orderItem/OrderItemQuantityExceedError';
import { OrderItemQuantityLessThanDeliveredError } from '@domain/errors/orderItem/OrderItemQuantityLessThanDeliveredError';

export class OrderItemEntity {
  private constructor(
    private readonly id: string,
    public readonly sparePart: SparePartEntity,
    public quantityOrdered: OrderItemQuantityOrdered,
    public readonly costPerUnit: OrderItemCostPerUnit,
    public deliveredQuantity: OrderItemDeliveredQuantity,
  ) {}

  public static create(
    id: string,
    sparePart: SparePartEntity,
    quantityOrderedValue: number,
    costPerUnitValue: number,
    deliveredQuantityValue: number = 0
  ): OrderItemEntity | Error {

    const quantityOrdered = OrderItemQuantityOrdered.from(quantityOrderedValue);
    if (quantityOrdered instanceof Error) return quantityOrdered;

    const costPerUnit = OrderItemCostPerUnit.from(costPerUnitValue);
    if (costPerUnit instanceof Error) return costPerUnit;

    const deliveredQuantity = OrderItemDeliveredQuantity.from(deliveredQuantityValue, quantityOrdered);
    if (deliveredQuantity instanceof Error) return deliveredQuantity;

    return new OrderItemEntity(id, sparePart, quantityOrdered, costPerUnit, deliveredQuantity);
  }

  getId(): string {
    return this.id;
  }

  getTotalCost(): number {
    return this.quantityOrdered.value * this.costPerUnit.value;
  }

  updateQuantityOrdered(newQuantityOrdered: number): void | Error {
    if (newQuantityOrdered < this.deliveredQuantity.value) {
      return new OrderItemQuantityLessThanDeliveredError();  
    }

    const updatedQuantityOrdered = OrderItemQuantityOrdered.from(newQuantityOrdered);
    if (updatedQuantityOrdered instanceof Error) return updatedQuantityOrdered;

    this.quantityOrdered = updatedQuantityOrdered;
  }

  updateDelivery(deliveredQty: number): void | Error {
    if (deliveredQty > this.quantityOrdered.value) {
      return new OrderItemQuantityExceedError();
    }
  
    const deliveredQuantity = OrderItemDeliveredQuantity.from(deliveredQty, this.quantityOrdered);
    if (deliveredQuantity instanceof Error) return deliveredQuantity;
  
    this.deliveredQuantity = deliveredQuantity;
  }
  

  isFullyDelivered(): boolean {
    return this.deliveredQuantity.value >= this.quantityOrdered.value;
  }

  getRemainingQuantity(): number {
    return this.quantityOrdered.value - this.deliveredQuantity.value;
  }

  getDeliveredQty(): number {
    return this.deliveredQuantity.value;
  }
}
