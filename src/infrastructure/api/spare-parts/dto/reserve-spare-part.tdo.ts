import { ApiProperty } from '@nestjs/swagger';

export class ReserveSparePartDto {
  @ApiProperty({ 
    description: 'Quantity to reserve', 
    example: '10' 
  })
  quantity: number 
}
