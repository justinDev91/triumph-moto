import { CommonRepairActionEnum } from '@infrastructure/types/CommonRepairActionEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRepairDto {
  @ApiProperty({
    description: 'The ID of the breakdown associated with the repair',
    example: 'bd123456-7890-4abc-defg-123456789abc',
  })
  breakdownId: string;

  @ApiProperty({
    description: 'The date when the repair was performed',
    example: '2025-03-10T00:00:00Z',
  })
  repairDate: Date;

  @ApiProperty({
    description: 'List of repair actions performed',
    example: ['Oil Change', 'Brake Replacement', 'Tire Replacement'],
    isArray: true,
  })
  actions: CommonRepairActionEnum[];

  @ApiProperty({
    description: 'The total cost of the repair',
    example: 250.75,
  })
  cost: number;
}
