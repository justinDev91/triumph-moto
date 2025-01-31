import { Injectable } from '@nestjs/common';
import { OrderItemEntity } from '@domain/entities/order/OrderItemEntity';
import { CreateOrderItemUsecase } from '@application/usecases/orderItem/CreateOrderItemUsecase';
import { DeleteOrderItemUsecase } from '@application/usecases/orderItem/DeleteOrderItemUsecase';
import { GetAllOrderItemsUsecase } from '@application/usecases/orderItem/GetAllOrderItemsUsecase';
import { GetDeliveredQuantityUsecase } from '@application/usecases/orderItem/GetDeliveredQuantityUsecase';
import { GetOrderItemByIdUsecase } from '@application/usecases/orderItem/GetOrderItemByIdUsecase';
import { GetRemainingQuantityUsecase } from '@application/usecases/orderItem/GetRemainingQuantityUsecase';
import { GetTotalCostUsecase } from '@application/usecases/orderItem/GetTotalCostUsecase';
import { IsFullyDeliveredUsecase } from '@application/usecases/orderItem/IsFullyDeliveredUsecase';
import { OrderRepositoryImplem } from '@infrastructure/adapters/order.repository.implem';
import { CreateOrderItemDto } from './tdo/create-order-item.dto';
import { SparePartRepositoryImplem } from '@infrastructure/adapters/spare.part.repository.implem';
import { OrderItemRepositoryImplem } from '@infrastructure/adapters/order.item.repository.implem';
import { UpdateOrderItemDeliveryUsecase } from '@application/usecases/orderItem/UpdateOrderItemDeliveryUsecase';

@Injectable()
export class OrderItemService {
    public readonly createOrderItemUsecase: CreateOrderItemUsecase;
    public readonly deleteOrderItemUsecase: DeleteOrderItemUsecase;
    public readonly getAllOrderItemsUsecase: GetAllOrderItemsUsecase;
    public readonly getDeliveredQuantityUsecase: GetDeliveredQuantityUsecase;
    public readonly getOrderItemByIdUsecase: GetOrderItemByIdUsecase;
    public readonly getRemainingQuantityUsecase: GetRemainingQuantityUsecase;
    public readonly getTotalCostUsecase: GetTotalCostUsecase;
    public readonly isFullyDeliveredUsecase: IsFullyDeliveredUsecase;
    public readonly updateOrderItemDeliveryUsecase: UpdateOrderItemDeliveryUsecase;
  
    constructor(
        private readonly orderItemRepository: OrderItemRepositoryImplem,
        private readonly orderRepository: OrderRepositoryImplem,
        private readonly sparePartRepository: SparePartRepositoryImplem
        
      ) {
      this.createOrderItemUsecase = new CreateOrderItemUsecase(orderItemRepository, sparePartRepository);
      this.deleteOrderItemUsecase = new DeleteOrderItemUsecase(orderItemRepository);
      this.getAllOrderItemsUsecase = new GetAllOrderItemsUsecase(orderItemRepository);
      this.getDeliveredQuantityUsecase = new GetDeliveredQuantityUsecase(orderItemRepository);
      this.getOrderItemByIdUsecase = new GetOrderItemByIdUsecase(orderItemRepository);
      this.getRemainingQuantityUsecase = new GetRemainingQuantityUsecase(orderItemRepository);
      this.getTotalCostUsecase = new GetTotalCostUsecase(orderItemRepository);
      this.isFullyDeliveredUsecase = new IsFullyDeliveredUsecase(orderItemRepository);
      this.updateOrderItemDeliveryUsecase = new UpdateOrderItemDeliveryUsecase(orderItemRepository);
    }

  async createOrderItem(createOrderItemDto : CreateOrderItemDto): Promise<void | Error> {
    const {sparePartId, quantityOrdered, costPerUnit, deliveredQuantity} = createOrderItemDto
   
    return await this.createOrderItemUsecase.execute(
      sparePartId,
      quantityOrdered,
      costPerUnit,
      deliveredQuantity
    );
  }

  async deleteOrderItem(id: string): Promise<void | Error> {
    return await this.deleteOrderItemUsecase.execute(id);
  }

  async getAllOrderItems(): Promise<OrderItemEntity[] | Error> {
    return await this.getAllOrderItemsUsecase.execute();
  }

  async getDeliveredQuantity(orderItemId: string): Promise<number | Error> {
    return await this.getDeliveredQuantityUsecase.execute(orderItemId);
  }

  async getOrderItemById(orderItemId: string): Promise<OrderItemEntity | Error> {
    return await this.getOrderItemByIdUsecase.execute(orderItemId);
  }

  async getRemainingQuantity(orderItemId: string): Promise<number | Error> {
    return await this.getRemainingQuantityUsecase.execute(orderItemId);
  }

  async getTotalCost(orderItemId: string): Promise<number | Error> {
    return await this.getTotalCostUsecase.execute(orderItemId);
  }

  async isFullyDelivered(orderItemId: string): Promise<boolean | Error> {
    return await this.isFullyDeliveredUsecase.execute(orderItemId);
  }

  async updateOrderItemDelivery(
    orderItemId: string,
    quantityOrdered: number
  ): Promise<void | Error> {
    return await this.updateOrderItemDeliveryUsecase.execute(orderItemId, quantityOrdered);
  }
}
