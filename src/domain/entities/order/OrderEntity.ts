import { OrderDate } from "@domain/values/order/OrderDate";
import { OrderItemEntity } from "./OrderItemEntity";
import { EstimatedDeliveryDate } from "@domain/values/order/EstimatedDeliveryDate";
import { SparePartEntity } from "./SparePartEntity";
import { SparePartQuantityInStockError } from "@domain/errors/sparePart/SparePartQuantityInStockError";
import { OrderItemQuantityExceedError } from "@domain/errors/orderItem/OrderItemQuantityExceedError";
import { OrderItemNotFoundError } from "@domain/errors/orderItem/OrderItemNotFoundError";

export class OrderEntity {
  private readonly items: OrderItemEntity[] = [];
  private totalCost: number = 0;

  private constructor(
    //Todo: Add user
    public readonly id: string,
    private readonly orderDate: OrderDate,
    private readonly estimatedDeliveryDate: EstimatedDeliveryDate,
  ) {}

  public static create(
id: string, orderDateValue: Date, estimatedDeliveryDateValue: Date, p0?: Promise<Error | OrderItemEntity>,
  ): OrderEntity | Error {    
    const orderDate = OrderDate.from(orderDateValue);
    if (orderDate instanceof Error) return orderDate; 
  
    const estimatedDeliveryDate = EstimatedDeliveryDate.from(
      estimatedDeliveryDateValue,
      orderDate.value
    );
    if (estimatedDeliveryDate instanceof Error) return estimatedDeliveryDate; 
    
    return new OrderEntity(id, orderDate, estimatedDeliveryDate);
  }

  addItem(id: string, sparePart: SparePartEntity, quantity: number, costPerUnit: number): void | Error {
    if (quantity > sparePart.quantityInStock.value) {
      return new SparePartQuantityInStockError(); 
    }

    const item = OrderItemEntity.create(id, sparePart, quantity, costPerUnit);
    if (item instanceof Error) return item;

    this.items.push(item);
    this.totalCost += item.getTotalCost();
  }

  updateItemDelivery(sparePartId: string, deliveredQty: number): void | Error {
    const item = this.items.find((item) => item.sparePart.id === sparePartId);
    if (!item) return new OrderItemNotFoundError();
  
    const availableQuantity = item.quantityOrdered.value;
    const currentDeliveredQuantity = item.deliveredQuantity.value;
  
    if (deliveredQty + currentDeliveredQuantity > availableQuantity) {
      return new OrderItemQuantityExceedError();  
    }
  
    item.updateDelivery(deliveredQty);  
  }
  
  

  getTotalCost(): number {
    return this.totalCost;
  }

  isOrderFullyDelivered(): boolean {
    return this.items.every((item) => item.isFullyDelivered());
  }

  getUndeliveredItems(): OrderItemEntity[] {
    return this.items.filter((item) => !item.isFullyDelivered());
  }

  getItems(): OrderItemEntity[] {
    return this.items;
  }

  getOrderDate(): Date {
    return new Date(this.orderDate.value); 
  }
  
  getEstimatedDeliveryDate(): Date {
    return new Date(this.estimatedDeliveryDate.value); 
  }
  
}
