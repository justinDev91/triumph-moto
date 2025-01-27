import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { OrderEntity } from "@domain/entities/order/OrderEntity";

export class CreateOrderUsecase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  public async execute(
    id: string,
    orderDateValue: Date,
    estimatedDeliveryDateValue: Date,
  ): Promise<void | Error> {
    const order = OrderEntity.create(id, orderDateValue, estimatedDeliveryDateValue);

    if(order instanceof Error) return order

    await this.orderRepository.save(order);
  }
}
