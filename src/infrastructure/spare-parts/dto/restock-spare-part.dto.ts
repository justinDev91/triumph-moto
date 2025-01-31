import { ApiProperty } from '@nestjs/swagger';

export class RestockSparePartDto {
  @ApiProperty({ 
    description: 'Quantity to restock', 
    example: '10' 
  })
  quantity: number 
}
