import { ApiProperty } from '@nestjs/swagger';

export class UpdateMotorcycleServiceDetailsDto {

  @ApiProperty({ description: 'Updated mileage after the service' })
  mileage: number;

  @ApiProperty({ description: 'Date when the service was performed' })
  date: Date;
}
