import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { SparePartEntity } from "@domain/entities/order/SparePartEntity";

export class AddItemToOrderUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(
    orderId: string,
    itemId: string,
    sparePart: SparePartEntity,
    quantity: number,
    costPerUnit: number
  ): Promise<void | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    const result = order.addItem(itemId, sparePart, quantity, costPerUnit);
    if (result instanceof Error) return result;

    await this.orderRepository.update(order);
  }
}
