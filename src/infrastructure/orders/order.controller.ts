import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from '@domain/entities/order/OrderEntity';
import { OrderItemEntity } from '@domain/entities/order/OrderItemEntity';
import { SparePartEntity } from '@domain/entities/order/SparePartEntity';
import { OrderService } from './order.service';
import { CreateOrderDto } from './tdo/create-order-dto';
import { AddItemToOrderDto } from './tdo/add-item-to-order.dto';
import { UpdateItemDeliveryDto } from './tdo/update-item-delivery.dto';

@ApiTags('orders') 
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<void | Error> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all orders', type: [OrderEntity] })
  async getAllOrders(): Promise<OrderEntity[] | Error> {
    return await this.orderService.getAllOrders();
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, description: 'Order retrieved successfully', type: OrderEntity })
  async getOrderById(@Param('orderId') orderId: string): Promise<OrderEntity | Error> {
    return this.orderService.getOrderById(orderId);
  }

  @Get(':orderId/items')
  @ApiResponse({ status: 200, description: 'Order items retrieved successfully', type: [OrderItemEntity] })
  async getOrderItems(@Param('orderId') orderId: string): Promise<OrderItemEntity[] | Error> {
    return this.orderService.getOrderItems(orderId);
  }

  @Get(':orderId/total-cost')
  @ApiResponse({ status: 200, description: 'Total order cost retrieved successfully', type: Number })
  async getTotalOrderCost(@Param('orderId') orderId: string): Promise<number | Error> {
    return this.orderService.getTotalOrderCost(orderId);
  }

  @Get(':orderId/estimated-delivery-date')
  @ApiResponse({ status: 200, description: 'Estimated delivery date retrieved successfully', type: Date })
  async getEstimatedDeliveryDate(@Param('orderId') orderId: string): Promise<Date | Error> {
    return this.orderService.getEstimatedDeliveryDate(orderId);
  }

  @Get(':orderId/order-date')
  @ApiResponse({ status: 200, description: 'Order date retrieved successfully', type: Date })
  async getOrderDate(@Param('orderId') orderId: string): Promise<Date | Error> {
    return this.orderService.getOrderDate(orderId);
  }

  @Get(':orderId/undelivered-items')
  @ApiResponse({ status: 200, description: 'Undelivered items retrieved successfully', type: [OrderItemEntity] })
  async getUndeliveredItems(@Param('orderId') orderId: string): Promise<OrderItemEntity[] | Error> {
    return this.orderService.getUndeliveredItems(orderId);
  }

  @Put(':orderId/items')
  @ApiResponse({ status: 200, description: 'Item added to order successfully' })
  async addItemToOrder(
    @Param('orderId') orderId: string,
    @Body() addItemToOrderDto : AddItemToOrderDto,
  ): Promise<void | Error> {
    return this.orderService.addItemToOrder(orderId, addItemToOrderDto);
  }

  @Put(':orderId/delivery')
  @ApiResponse({ status: 200, description: 'Order Items delivery successfully' })
  async updateItemDelivery(
    @Param('orderId') orderId: string,
  ): Promise<void | Error> {
    return this.orderService.updateItemDelivery(orderId);
  }

  @Get(':orderId/fully-delivered')
  @ApiResponse({ status: 200, description: 'Check if order is fully delivered', type: Boolean })
  async checkIfOrderFullyDelivered(@Param('orderId') orderId: string): Promise<boolean | Error> {
    return this.orderService.checkIfOrderFullyDelivered(orderId);
  }

  @Get('date-range')
  @ApiResponse({ status: 200, description: 'Orders retrieved by date range', type: [OrderEntity] })
  async getOrdersByDateRange(
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date
  ): Promise<OrderEntity[] | Error> {
    return this.orderService.getOrdersByDateRange(startDate, endDate);
  }
}
