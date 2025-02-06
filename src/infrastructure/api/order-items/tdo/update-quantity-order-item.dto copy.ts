import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderItemQuantityDto {
  @ApiProperty({ 
    description: 'Quantity of spare parts ordered', 
    example: 5 
  })
  quantityOrdered: number;

}
