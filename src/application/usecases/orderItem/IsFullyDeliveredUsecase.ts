import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";

export class IsFullyDeliveredUsecase {
  constructor(private readonly orderItemRepository: OrderItemRepositoryInterface
  ) {}

  public async execute(orderItemId: string): Promise<boolean | Error> {
    const orderItem = await this.orderItemRepository.findById(orderItemId);
    if (orderItem instanceof Error) return orderItem;

    return orderItem.isFullyDelivered();
  }
}
