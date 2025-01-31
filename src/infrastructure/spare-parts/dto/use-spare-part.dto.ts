import { ApiProperty } from '@nestjs/swagger';

export class UseSparePartDto {
  @ApiProperty({ 
    description: 'Quantity to use', 
    example: '10' 
  })
  quantity: number 
}
