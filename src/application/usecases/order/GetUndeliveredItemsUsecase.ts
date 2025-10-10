import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";

export class GetUndeliveredItemsUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(orderId: string): Promise<OrderItemEntity[] | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    return order.getUndeliveredItems();
  }
}
