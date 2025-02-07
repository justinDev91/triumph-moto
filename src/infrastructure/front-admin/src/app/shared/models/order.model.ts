import { OrderItem } from "./order-item.model";

export interface Order {
  id: string;
  orderDate: Date;
  estimatedDeliveryDate: Date;
  items: OrderItem[];
  totalCost: number;
}
