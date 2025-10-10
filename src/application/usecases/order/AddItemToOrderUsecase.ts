import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";
import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";

export class AddItemToOrderUsecase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly sparePartRepository: SparePartRepositoryInterface,
    private readonly orderItemRepository: OrderItemRepositoryInterface
  ) {}

  async execute(
    orderId: string,
    itemId: string,
  ): Promise<void | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    const item = await this.orderItemRepository.findById(itemId);
    if (item instanceof Error) return item;
    
    const sparePart = await this.sparePartRepository.findById(item.sparePart.id);
    if (sparePart instanceof Error) return sparePart;

    const result = order.addItem(itemId, sparePart, item.quantityOrdered.value, item.costPerUnit.value);
    if (result instanceof Error) return result;

    return await this.orderRepository.addItem(orderId, itemId);
  }
}
