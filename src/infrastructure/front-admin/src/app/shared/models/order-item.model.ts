import { SparePart } from './spare-part.model';
import { Order } from './order.model';

export interface OrderItem {
  id: string;
  sparePart: SparePart;
  quantityOrdered: number;
  costPerUnit: number;
  deliveredQuantity: number;
  order?: Order;
}
