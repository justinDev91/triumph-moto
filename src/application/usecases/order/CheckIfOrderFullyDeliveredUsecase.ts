import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";

export class CheckIfOrderFullyDeliveredUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(orderId: string): Promise<boolean | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    return order.isOrderFullyDelivered();
  }
}
