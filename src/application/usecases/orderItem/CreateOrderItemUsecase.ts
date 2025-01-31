import { OrderItemRepositoryInterface } from "@application/repositories/OrderItemRepositoryInterface";
import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";
import { OrderItemEntity } from "@domain/entities/order/OrderItemEntity";

export class CreateOrderItemUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepositoryInterface,
    private readonly sparePartRepository: SparePartRepositoryInterface
  ) {}

  public async execute(
    sparePartId: string,
    quantityOrdered: number,
    costPerUnit: number,
    deliveredQuantity: number = 0
  ): Promise<void | Error> {
    const sparePart = await this.sparePartRepository.findById(sparePartId);
    
    if (sparePart instanceof Error) return sparePart;
    
    const orderItem = OrderItemEntity.create(
      null,
      sparePart,
      quantityOrdered,
      costPerUnit,
      deliveredQuantity
    );

    if (orderItem instanceof Error) return orderItem;
    await this.orderItemRepository.save(orderItem);
  }
}
