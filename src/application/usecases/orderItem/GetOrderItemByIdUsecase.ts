import {OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";
import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";

export class GetOrderItemByIdUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepositoryInterface,
  ) {}

  public async execute(orderItemId: string): Promise<OrderItemEntity | Error> {
    return await this.orderItemRepository.findById(orderItemId);
  }
}
