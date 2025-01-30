import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { OrderEntity } from '@domain/entities/order/OrderEntity';
import { OrderItemEntity } from '@domain/entities/order/OrderItemEntity';
import { SparePartEntity } from '@domain/entities/order/SparePartEntity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body('id') id: string,
    @Body('orderDate') orderDateValue: Date,
    @Body('estimatedDeliveryDate') estimatedDeliveryDateValue: Date
  ): Promise<void | Error> {
    return this.orderService.createOrder(id, orderDateValue, estimatedDeliveryDateValue);
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string): Promise<OrderEntity | Error> {
    return this.orderService.getOrderById(orderId);
  }

  @Get(':orderId/items')
  async getOrderItems(@Param('orderId') orderId: string): Promise<OrderItemEntity[] | Error> {
    return this.orderService.getOrderItems(orderId);
  }

  @Get(':orderId/total-cost')
  async getTotalOrderCost(@Param('orderId') orderId: string): Promise<number | Error> {
    return this.orderService.getTotalOrderCost(orderId);
  }

  @Get(':orderId/estimated-delivery-date')
  async getEstimatedDeliveryDate(@Param('orderId') orderId: string): Promise<Date | Error> {
    return this.orderService.getEstimatedDeliveryDate(orderId);
  }

  @Get(':orderId/order-date')
  async getOrderDate(@Param('orderId') orderId: string): Promise<Date | Error> {
    return this.orderService.getOrderDate(orderId);
  }

  @Get(':orderId/undelivered-items')
  async getUndeliveredItems(@Param('orderId') orderId: string): Promise<OrderItemEntity[] | Error> {
    return this.orderService.getUndeliveredItems(orderId);
  }

  @Put(':orderId/items')
  async addItemToOrder(
    @Param('orderId') orderId: string,
    @Body('itemId') itemId: string,
    @Body('sparePart') sparePart: SparePartEntity,
    @Body('quantity') quantity: number,
    @Body('costPerUnit') costPerUnit: number
  ): Promise<void | Error> {
    return this.orderService.addItemToOrder(orderId, itemId, sparePart, quantity, costPerUnit);
  }

  @Put(':orderId/items/:sparePartId/delivery')
  async updateItemDelivery(
    @Param('orderId') orderId: string,
    @Param('sparePartId') sparePartId: string,
    @Body('deliveredQty') deliveredQty: number
  ): Promise<void | Error> {
    return this.orderService.updateItemDelivery(orderId, sparePartId, deliveredQty);
  }

  @Put(':orderId/items/delivery')
  async updateOrderItemDelivery(
    @Param('orderId') orderId: string,
    @Body('sparePartId') sparePartId: string,
    @Body('deliveredQty') deliveredQty: number
  ): Promise<void | Error> {
    return this.orderService.updateOrderItemDelivery(orderId, sparePartId, deliveredQty);
  }

  @Get(':orderId/fully-delivered')
  async checkIfOrderFullyDelivered(@Param('orderId') orderId: string): Promise<boolean | Error> {
    return this.orderService.checkIfOrderFullyDelivered(orderId);
  }

  @Get('date-range')
  async getOrdersByDateRange(
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date
  ): Promise<OrderEntity[] | Error> {
    return this.orderService.getOrdersByDateRange(startDate, endDate);
  }
}
