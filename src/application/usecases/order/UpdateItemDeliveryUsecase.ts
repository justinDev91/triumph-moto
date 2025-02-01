import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";

export class UpdateItemDeliveryUsecase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  public async execute(
    orderId: string,
    sparePartId: string,
    deliveredQty: number,
  ): Promise<void | Error> {
    const order = await this.orderRepository.findById(orderId);
  
    if(order instanceof Error) return order

    order.updateItemDelivery(sparePartId, deliveredQty);
    
    await this.orderRepository.update(order);
  }
}
