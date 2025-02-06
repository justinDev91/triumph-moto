import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { OrderItemEntity } from '@domain/entities/order/OrderItemEntity';
import { OrderItemService } from './order-item.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderItemDto } from './tdo/create-order-item.dto';
import { UpdateOrderItemQuantityDto } from './tdo/update-quantity-order-item.dto copy';

@ApiTags('order-items')
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Order item created successfully', type: OrderItemEntity })
  async createOrderItem(
    @Body() createOrderItemDto: CreateOrderItemDto
  ): Promise<void | Error> {
    return await this.orderItemService.createOrderItem(createOrderItemDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Order item deleted successfully' })
  async deleteOrderItem(@Param('id') id: string): Promise<void | Error> {
    return await this.orderItemService.deleteOrderItem(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all order items', type: [OrderItemEntity] })
  async getAllOrderItems(): Promise<OrderItemEntity[] | Error> {
    return await this.orderItemService.getAllOrderItems();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get order item by ID', type: OrderItemEntity })
  async getOrderItemById(@Param('id') orderItemId: string): Promise<OrderItemEntity | Error> {
    return await this.orderItemService.getOrderItemById(orderItemId);
  }

  @Get(':id/delivered-quantity')
  @ApiResponse({ status: 200, description: 'Get delivered quantity for the order item', type: Number })
  async getDeliveredQuantity(@Param('id') orderItemId: string): Promise<number | Error> {
    return await this.orderItemService.getDeliveredQuantity(orderItemId);
  }

  @Get(':id/remaining-quantity')
  @ApiResponse({ status: 200, description: 'Get remaining quantity for the order item', type: Number })
  async getRemainingQuantity(@Param('id') orderItemId: string): Promise<number | Error> {
    return await this.orderItemService.getRemainingQuantity(orderItemId);
  }

  @Get(':id/total-cost')
  @ApiResponse({ status: 200, description: 'Get total cost for the order item', type: Number })
  async getTotalCost(@Param('id') orderItemId: string): Promise<number | Error> {
    return await this.orderItemService.getTotalCost(orderItemId);
  }

  @Get(':id/fully-delivered')
  @ApiResponse({ status: 200, description: 'Check if the order item is fully delivered', type: Boolean })
  async isFullyDelivered(@Param('id') orderItemId: string): Promise<boolean | Error> {
    return await this.orderItemService.isFullyDelivered(orderItemId);
  }

  @Put(':orderItemId/quantity')
  @ApiResponse({ status: 200, description: 'Update order item quantity' })
  async updateOrderItemDelivery(
    @Param('orderItemId') orderItemId: string,
    @Body() UpdateOrderItemQuantityDto: UpdateOrderItemQuantityDto
  ): Promise<void | Error> {
    return await this.orderItemService.updateOrderItemDelivery(
      orderItemId,
      UpdateOrderItemQuantityDto.quantityOrdered,
    );
  }

}
