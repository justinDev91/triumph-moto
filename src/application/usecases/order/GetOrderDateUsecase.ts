import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";

export class GetOrderDateUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(orderId: string): Promise<Date | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    return order.getOrderDate();
  }
}
