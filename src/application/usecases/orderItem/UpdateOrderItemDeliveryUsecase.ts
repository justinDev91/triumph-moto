import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";

export class UpdateOrderItemDeliveryUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepositoryInterface,
  ) {}

  public async execute(
    orderItemId: string,
    quantityOrdered: number,
  ): Promise<void | Error> {
    const orderItem = await this.orderItemRepository.findById(orderItemId);

    if(orderItem instanceof Error) return orderItem

    orderItem.updateQuantityOrdered(quantityOrdered);

    await this.orderItemRepository.updatedeliveredQty(orderItemId, quantityOrdered);
  }
}
