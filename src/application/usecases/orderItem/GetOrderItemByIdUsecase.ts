import { OrderItemRepository } from "@application/repositories/OrderItemRepositoryInterface";
import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";

export class GetOrderItemByIdUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  public async execute(orderItemId: string): Promise<OrderItemEntity | Error> {
    return await this.orderItemRepository.findById(orderItemId);
  }
}
