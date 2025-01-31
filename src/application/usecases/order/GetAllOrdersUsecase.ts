import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { OrderEntity } from "@domain/entities/order/OrderEntity";

export class GetAllOrdersUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  public async execute():Promise<OrderEntity[] | Error> {
    return await this.orderRepository.findAll();
  }
}
