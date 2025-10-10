import { ApiProperty } from '@nestjs/swagger';

export class UpdateMotorcycleMileageDto {
 
 @ApiProperty({ description: 'New mileage to update' })
  mileage: number;

}
