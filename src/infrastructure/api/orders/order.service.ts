import { Injectable } from '@nestjs/common';
import { AddItemToOrderUsecase } from '@application/usecases/order/AddItemToOrderUsecase';
import { CheckIfOrderFullyDeliveredUsecase } from '@application/usecases/order/CheckIfOrderFullyDeliveredUsecase';
import { CreateOrderUsecase } from '@application/usecases/order/CreateOrderUsecase';
import { GetEstimatedDeliveryDateUsecase } from '@application/usecases/order/GetEstimatedDeliveryDateUsecase';
import { GetOrderByIdUsecase } from '@application/usecases/order/GetOrderByIdUsecase';
import { GetOrderDateUsecase } from '@application/usecases/order/GetOrderDateUsecase';
import { GetOrderItemsUsecase } from '@application/usecases/order/GetOrderItemsUsecase';
import { GetOrdersByDateRangeUsecase } from '@application/usecases/order/GetOrdersByDateRangeUsecase';
import { GetTotalOrderCostUsecase } from '@application/usecases/order/GetTotalOrderCostUsecase';
import { GetUndeliveredItemsUsecase } from '@application/usecases/order/GetUndeliveredItemsUsecase';
import { OrderEntity } from '@domain/entities/order/OrderEntity';
import { OrderItemEntity } from '@domain/entities/order/OrderItemEntity';
import { OrderRepositoryImplem } from '@adapters/order.repository.implem';
import { CreateOrderDto } from './tdo/create-order-dto';
import { GetAllOrdersUsecase } from '@application/usecases/order/GetAllOrdersUsecase';
import { AddItemToOrderDto } from './tdo/add-item-to-order.dto';
import { SparePartRepositoryImplem } from '@adapters/spare.part.repository.implem';
import { OrderItemRepositoryImplem } from '@adapters/order.item.repository.implem';
import { ItemDeliveryUsecase } from '@application/usecases/order/UpdateItemDeliveryUsecase';

@Injectable()
export class OrderService {
  private readonly addItemToOrderUsecase: AddItemToOrderUsecase;
  private readonly checkIfOrderFullyDeliveredUsecase: CheckIfOrderFullyDeliveredUsecase;
  private readonly createOrderUsecase: CreateOrderUsecase;
  private readonly getEstimatedDeliveryDateUsecase: GetEstimatedDeliveryDateUsecase;
  private readonly getOrderByIdUsecase: GetOrderByIdUsecase;
  private readonly getOrderDateUsecase: GetOrderDateUsecase;
  private readonly getOrderItemsUsecase: GetOrderItemsUsecase;
  private readonly getOrdersByDateRangeUsecase: GetOrdersByDateRangeUsecase;
  private readonly getTotalOrderCostUsecase: GetTotalOrderCostUsecase;
  private readonly getUndeliveredItemsUsecase: GetUndeliveredItemsUsecase;
  private readonly ItemDeliveryUsecase: ItemDeliveryUsecase;
  private readonly getAllOrdersUsecase : GetAllOrdersUsecase;

  constructor(
    private readonly orderRepository: OrderRepositoryImplem,
    private readonly sparePartRepository: SparePartRepositoryImplem,
    private readonly orderItemRepository: OrderItemRepositoryImplem
  ) {
    this.addItemToOrderUsecase = new AddItemToOrderUsecase(orderRepository, sparePartRepository, orderItemRepository);
    this.checkIfOrderFullyDeliveredUsecase = new CheckIfOrderFullyDeliveredUsecase(orderRepository);
    this.createOrderUsecase = new CreateOrderUsecase(orderRepository);
    this.getEstimatedDeliveryDateUsecase = new GetEstimatedDeliveryDateUsecase(orderRepository);
    this.getOrderByIdUsecase = new GetOrderByIdUsecase(orderRepository);
    this.getOrderDateUsecase = new GetOrderDateUsecase(orderRepository);
    this.getOrderItemsUsecase = new GetOrderItemsUsecase(orderRepository);
    this.getOrdersByDateRangeUsecase = new GetOrdersByDateRangeUsecase(orderRepository);
    this.getTotalOrderCostUsecase = new GetTotalOrderCostUsecase(orderRepository);
    this.getUndeliveredItemsUsecase = new GetUndeliveredItemsUsecase(orderRepository);
    this.ItemDeliveryUsecase = new ItemDeliveryUsecase(orderRepository);
    this.getAllOrdersUsecase = new GetAllOrdersUsecase(orderRepository)
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<void | Error> {
    return this.createOrderUsecase.execute(createOrderDto.orderDateValue, createOrderDto.estimatedDeliveryDateValue);
  }

  async getAllOrders(): Promise<OrderEntity[] | Error>  {
    return await this.getAllOrdersUsecase.execute();
  }

  async getOrderById(orderId: string): Promise<OrderEntity | Error> {
    return this.getOrderByIdUsecase.execute(orderId);
  }

  async getOrderItems(orderId: string): Promise<OrderItemEntity[] | Error> {
    return this.getOrderItemsUsecase.execute(orderId);
  }

  async getTotalOrderCost(orderId: string): Promise<number | Error> {
    return this.getTotalOrderCostUsecase.execute(orderId);
  }

  async getEstimatedDeliveryDate(orderId: string): Promise<Date | Error> {
    return this.getEstimatedDeliveryDateUsecase.execute(orderId);
  }

  async getOrderDate(orderId: string): Promise<Date | Error> {
    return this.getOrderDateUsecase.execute(orderId);
  }

  async getUndeliveredItems(orderId: string): Promise<OrderItemEntity[] | Error> {
    return this.getUndeliveredItemsUsecase.execute(orderId);
  }

  async addItemToOrder(
    orderId: string,
    addItemToOrderDto : AddItemToOrderDto
  ): Promise<void | Error> {
    const {itemId} = addItemToOrderDto
    return this.addItemToOrderUsecase.execute(orderId, itemId);
  }

  async updateItemDelivery(
    orderId: string,
  ): Promise<void | Error> {
    return this.ItemDeliveryUsecase.execute(orderId);
  }


  async checkIfOrderFullyDelivered(orderId: string): Promise<boolean | Error> {
    return this.checkIfOrderFullyDeliveredUsecase.execute(orderId);
  }

  async getOrdersByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<OrderEntity[] | Error> {
    return this.getOrdersByDateRangeUsecase.execute(startDate, endDate);
  }
}
