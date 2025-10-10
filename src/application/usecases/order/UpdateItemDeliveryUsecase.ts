import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";

export class ItemDeliveryUsecase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  public async execute(
    orderId: string,
  ): Promise<void | Error> {
    const order = await this.orderRepository.findById(orderId);
    
    if(order instanceof Error) return order
    
    await this.orderRepository.delivery(orderId);
  }
}
