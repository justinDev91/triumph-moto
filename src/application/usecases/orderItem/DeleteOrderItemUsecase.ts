import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";

export class DeleteOrderItemUsecase {
  constructor(private readonly orderItemRepository: OrderItemRepositoryInterface) {}

  public async execute(id: string): Promise<void | Error> {
    return await this.orderItemRepository.delete(id);
  }
}
