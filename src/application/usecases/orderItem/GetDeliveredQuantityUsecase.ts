import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";

export class GetDeliveredQuantityUsecase {
  constructor(private readonly orderItemRepository: OrderItemRepositoryInterface) {}

  public async execute(orderItemId: string): Promise<number | Error> {
    const orderItem = await this.orderItemRepository.findById(orderItemId);
    if (orderItem instanceof Error) return orderItem;

    return orderItem.getDeliveredQty();
  }
}
