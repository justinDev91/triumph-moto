import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

  @ApiProperty({
    description: 'The date when the order was placed',
    example: '2025-01-01T00:00:00Z',
  })
  orderDateValue: Date;

  @ApiProperty({
    description: 'The estimated delivery date for the order',
    example: '2025-02-01T00:00:00Z',
  })
  estimatedDeliveryDateValue: Date;
}
