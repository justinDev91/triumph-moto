import { ApiProperty } from '@nestjs/swagger';

export class CreateSparePartDto {
  @ApiProperty({ 
    description: 'Name of the spare part', 
    example: 'Brake Pad' 
  })
  name: string;

  @ApiProperty({ 
    description: 'Quantity available in stock', 
    example: 50 
  })
  quantityInStock: number;

  @ApiProperty({ 
    description: 'Critical stock level indicating the need for restocking', 
    example: 10 
  })
  criticalLevel: number;

  @ApiProperty({ 
    description: 'Cost per unit of the spare part', 
    example: 25.5 
  })
  cost: number;
}
