import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";
import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";
import { SparePartEntity } from "@domain/entities/order/SparePartEntity";

export class CreateOrderItemUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepositoryInterface,
  ) {}

  public async execute(
    id: string,
    sparePart: SparePartEntity,
    quantityOrderedValue: number,
    costPerUnitValue: number,
    deliveredQuantityValue: number = 0,
  ): Promise<void | Error> {
    const orderItem = OrderItemEntity.create(
      id,
      sparePart,
      quantityOrderedValue,
      costPerUnitValue,
      deliveredQuantityValue
    );

    if(orderItem instanceof Error) return orderItem

    await this.orderItemRepository.save(orderItem);
  }
}
