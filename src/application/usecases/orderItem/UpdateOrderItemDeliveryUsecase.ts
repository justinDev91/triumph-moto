import { OrderItemRepository } from "@application/repositories/OrderItemRepositoryInterface";

export class UpdateOrderItemDeliveryUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  public async execute(
    orderItemId: string,
    deliveredQty: number,
  ): Promise<void | Error> {
    const orderItem = await this.orderItemRepository.findById(orderItemId);

    if(orderItem instanceof Error) return orderItem

    orderItem.updateDelivery(deliveredQty);
    await this.orderItemRepository.save(orderItem);
  }
}
