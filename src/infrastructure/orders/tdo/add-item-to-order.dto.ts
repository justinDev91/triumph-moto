import { ApiProperty } from '@nestjs/swagger';

export class AddItemToOrderDto {
  @ApiProperty({ description: 'Unique identifier for the order item' })
  itemId: string;

  @ApiProperty({ description: 'Unique identifier for the spare part' })
  sparePartId: string;

  @ApiProperty({ description: 'Quantity of the spare part to be added' })
  quantity: number;

  @ApiProperty({ description: 'Cost per unit of the spare part' })
  costPerUnit: number;
}
