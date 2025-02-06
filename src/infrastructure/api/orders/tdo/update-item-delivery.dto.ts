import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDeliveryDto {
  @ApiProperty({ 
    description: 'Quantity delivered', 
    example: 5 
  })
  deliveredQty: number;
}
