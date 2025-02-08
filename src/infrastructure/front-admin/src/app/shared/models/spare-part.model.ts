export interface SparePart {
  id: string;
  name: {
    value: string;
  };
  quantityInStock: {
    value: number;
  };
  criticalLevel: {
    value: number;
  };
  cost: {
    value: string;
  };
  totalUsage: number;
  reservedStock: number;
}
