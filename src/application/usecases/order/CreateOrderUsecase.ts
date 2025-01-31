import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { OrderEntity } from "@domain/entities/order/OrderEntity";

export class CreateOrderUsecase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  public async execute(
    orderDate: Date,
    estimatedDeliveryDate: Date,
  ): Promise<void | Error> {
    const order = OrderEntity.create(null, orderDate, estimatedDeliveryDate);

    if(order instanceof Error) return order

    await this.orderRepository.save(order);
  }
}
