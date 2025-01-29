import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";

export class GetAllOrderItemsUsecase {
  constructor(private readonly orderItemRepository: OrderItemRepositoryInterface) {}

  public async execute() {
    return await this.orderItemRepository.findAll();
  }
}
