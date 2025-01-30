import { ApiProperty } from '@nestjs/swagger';

export class UpdateMotorcycleTrialDto {
  @ApiProperty({
    description: 'The end date of the motorcycle trial, if applicable',
    type: String,
    format: 'date-time',
    required: false,
  })
  endDate?: Date;
}
