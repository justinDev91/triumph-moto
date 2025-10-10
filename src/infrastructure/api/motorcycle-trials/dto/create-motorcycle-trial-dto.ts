import { ApiProperty } from '@nestjs/swagger';

export class CreateMotorcycleTrialDto {

  @ApiProperty({
    description: 'MotorcycleId for the trial',
    type: String,
    example: 'motorcycle-12345',
  })
  motorcycleId: string;

  @ApiProperty({
    description: 'DriverId for the trial',
    type: String,
    example: 'driver-67890',
  })
  driverId: string;

  @ApiProperty({
    description: 'The start date of the motorcycle trial',
    type: String,
    format: 'date-time',
    example: '2025-03-01T09:00:00Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the motorcycle trial, if applicable',
    type: String,
    format: 'date-time',
    required: false,
    example: '2025-03-05T18:00:00Z',
  })
  endDate?: Date;
}
