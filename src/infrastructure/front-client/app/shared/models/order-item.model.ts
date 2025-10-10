import { SparePart } from './spare-part.model';
import { Order } from './order.model';

export interface OrderItem {
  id: string;
  sparePart: SparePart;
  quantityOrdered: {value: number};
  costPerUnit:{value: number};
  deliveredQuantity: {value: number};
  order?: Order;
}
