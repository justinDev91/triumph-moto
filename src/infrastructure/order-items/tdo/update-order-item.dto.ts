import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderItemDto {
  @ApiProperty({ 
    description: 'Quantity of spare parts ordered', 
    example: 5 
  })
  quantityOrdered: number;

  @ApiProperty({ 
    description: 'Cost per unit of the spare part', 
    example: 15.75 
  })
  costPerUnit: number;

}
