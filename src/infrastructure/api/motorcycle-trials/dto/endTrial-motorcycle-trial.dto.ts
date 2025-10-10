import { ApiProperty } from '@nestjs/swagger';

export class EndTrialMotorcycleTrialDto {

  @ApiProperty({
    description: 'The end date of the motorcycle trial, if applicable',
    type: String,
    format: 'date-time',
    required: false,
    example: '2025-03-05T18:00:00Z',
  })
  endDate?: Date;
}
