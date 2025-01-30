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
import { UpdateItemDeliveryUsecase } from '@application/usecases/order/UpdateItemDeliveryUsecase';
import { UpdateOrderItemDeliveryUsecase } from '@application/usecases/order/UpdateOrderItemDeliveryUsecase';
import { OrderEntity } from '@domain/entities/order/OrderEntity';
import { OrderItemEntity } from '@domain/entities/order/OrderItemEntity';
import { SparePartEntity } from '@domain/entities/order/SparePartEntity';
import { OrderRepositoryImplem } from '@infrastructure/adapters/order.repository.implem';

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
  private readonly updateItemDeliveryUsecase: UpdateItemDeliveryUsecase;
  private readonly updateOrderItemDeliveryUsecase: UpdateOrderItemDeliveryUsecase;

  constructor(private readonly orderRepository: OrderRepositoryImplem) {
    this.addItemToOrderUsecase = new AddItemToOrderUsecase(orderRepository);
    this.checkIfOrderFullyDeliveredUsecase = new CheckIfOrderFullyDeliveredUsecase(orderRepository);
    this.createOrderUsecase = new CreateOrderUsecase(orderRepository);
    this.getEstimatedDeliveryDateUsecase = new GetEstimatedDeliveryDateUsecase(orderRepository);
    this.getOrderByIdUsecase = new GetOrderByIdUsecase(orderRepository);
    this.getOrderDateUsecase = new GetOrderDateUsecase(orderRepository);
    this.getOrderItemsUsecase = new GetOrderItemsUsecase(orderRepository);
    this.getOrdersByDateRangeUsecase = new GetOrdersByDateRangeUsecase(orderRepository);
    this.getTotalOrderCostUsecase = new GetTotalOrderCostUsecase(orderRepository);
    this.getUndeliveredItemsUsecase = new GetUndeliveredItemsUsecase(orderRepository);
    this.updateItemDeliveryUsecase = new UpdateItemDeliveryUsecase(orderRepository);
    this.updateOrderItemDeliveryUsecase = new UpdateOrderItemDeliveryUsecase(orderRepository);
  }

  async createOrder(
    id: string,
    orderDateValue: Date,
    estimatedDeliveryDateValue: Date
  ): Promise<void | Error> {
    return this.createOrderUsecase.execute(id, orderDateValue, estimatedDeliveryDateValue);
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
    itemId: string,
    sparePart: SparePartEntity,
    quantity: number,
    costPerUnit: number
  ): Promise<void | Error> {
    return this.addItemToOrderUsecase.execute(orderId, itemId, sparePart, quantity, costPerUnit);
  }

  async updateItemDelivery(
    orderId: string,
    sparePartId: string,
    deliveredQty: number
  ): Promise<void | Error> {
    return this.updateItemDeliveryUsecase.execute(orderId, sparePartId, deliveredQty);
  }

  async updateOrderItemDelivery(
    orderId: string,
    sparePartId: string,
    deliveredQty: number
  ): Promise<void | Error> {
    return this.updateOrderItemDeliveryUsecase.execute(orderId, sparePartId, deliveredQty);
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
