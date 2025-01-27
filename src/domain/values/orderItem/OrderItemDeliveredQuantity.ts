import { OrderItemQuantityExceedError } from "@domain/errors/orderItem/OrderItemQuantityExceedError";
import { OrderItemQuantityOrdered } from "./OrderItemQuantityOrdered";

export class OrderItemDeliveredQuantity {
  constructor(public readonly value: number) {}

  static from(deliveredQty: number, quantityOrdered: OrderItemQuantityOrdered): OrderItemDeliveredQuantity | Error {
    if (deliveredQty < 0) return new Error('Delivered quantity cannot be negative');
    if (deliveredQty > quantityOrdered.value) return new OrderItemQuantityExceedError();

    return new OrderItemDeliveredQuantity(deliveredQty);
  }
}
