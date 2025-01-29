import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";
import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";

export class UpdateOrderItemUsecase {
  constructor(private readonly orderItemRepository: OrderItemRepositoryInterface) {}

  public async execute(orderItem: OrderItemEntity): Promise<void | Error> {
    return await this.orderItemRepository.update(orderItem);
  }
}
