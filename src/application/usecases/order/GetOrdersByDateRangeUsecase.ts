import { OrderRepositoryInterface } from "@application/repositories/OrderRepositoryInterface";
import { OrderEntity } from "@domain/entities/order/OrderEntity";

export class GetOrdersByDateRangeUsecase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  public async execute(startDate: Date, endDate: Date): Promise<OrderEntity[] | Error> {
    return await this.orderRepository.findByDateRange(startDate, endDate);
  }
}
