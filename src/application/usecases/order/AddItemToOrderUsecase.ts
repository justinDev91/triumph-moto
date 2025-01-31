import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";

export class AddItemToOrderUsecase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly sparePartRepository: SparePartRepositoryInterface
  ) {}

  async execute(
    orderId: string,
    itemId: string,
    sparePartId: string,
    quantity: number,
    costPerUnit: number
  ): Promise<void | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    const sparePart = await this.sparePartRepository.findById(sparePartId);
    if (sparePart instanceof Error) return sparePart;

    const result = order.addItem(itemId, sparePart, quantity, costPerUnit);
    if (result instanceof Error) return result;

    await this.orderRepository.update(order);
  }
}
