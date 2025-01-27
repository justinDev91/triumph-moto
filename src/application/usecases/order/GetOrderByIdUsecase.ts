import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { OrderEntity } from "@domain/entities/order/OrderEntity";

export class GetOrderByIdUsecase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  public async execute(orderId: string): Promise<OrderEntity | Error> {
    return await this.orderRepository.findById(orderId);
  }
}
