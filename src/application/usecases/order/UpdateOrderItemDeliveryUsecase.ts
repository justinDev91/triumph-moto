import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";

export class UpdateOrderItemDeliveryUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(orderId: string, sparePartId: string, deliveredQty: number): Promise<void | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    const result = order.updateItemDelivery(sparePartId, deliveredQty);
    if (result instanceof Error) return result;

    await this.orderRepository.update(order);
  }
}
