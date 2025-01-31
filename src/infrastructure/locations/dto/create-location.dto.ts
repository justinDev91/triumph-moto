import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {

  @ApiProperty({
    description: 'ID of the motorcycle associated with the location',
    example: 'motorcycle-67890',
  })
  motorcycleId: string;

  @ApiProperty({
    description: 'User ID associated with the location',
    example: 'user-112233',
  })
  userId: string;

  @ApiProperty({
    description: 'Start date of the location record',
    example: '2025-01-01T00:00:00Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date of the location record',
    example: '2025-02-01T00:00:00Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Cost associated with the location',
    example: 100.50,
  })
  cost: number;
}
