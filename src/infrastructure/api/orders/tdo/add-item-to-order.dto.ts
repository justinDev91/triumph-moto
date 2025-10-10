import { ApiProperty } from '@nestjs/swagger';

export class AddItemToOrderDto {
  @ApiProperty({ description: 'Unique identifier for the order item' })
  itemId: string;
}
