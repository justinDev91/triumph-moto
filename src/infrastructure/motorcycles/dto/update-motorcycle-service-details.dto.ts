import { ApiProperty } from '@nestjs/swagger';

export class UpdateMotorcycleServiceDetailsDto {
  @ApiProperty({ description: 'Unique identifier of the motorcycle' })
  id: string;

  @ApiProperty({ description: 'Updated mileage after the service' })
  newServiceMileage: number;

  @ApiProperty({ description: 'Date when the service was performed' })
  serviceDate: Date;
}
