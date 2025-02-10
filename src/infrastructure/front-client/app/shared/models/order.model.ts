import { OrderItem } from "./order-item.model";

export interface Order {
  id: string;
  orderDate: {value: Date};
  estimatedDeliveryDate: {value: Date};
  items: OrderItem[];
  totalCost: number;
}
