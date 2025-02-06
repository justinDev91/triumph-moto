import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ 
    description: 'ID of the spare part', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  sparePartId: string;

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

  @ApiProperty({ 
    description: 'Quantity of spare parts delivered (optional)', 
    required: false, 
    example: 3 
  })
  deliveredQuantity?: number;
}
