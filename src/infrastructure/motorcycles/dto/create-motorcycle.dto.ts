import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { MotorStatus } from '@domain/types/motorcycle';

export class CreateMotorcycleDto {
  @ApiProperty({ description: 'Brand of the motorcycle' })
  brand: string;

  @ApiProperty({ description: 'Model of the motorcycle' })
  model: string;

  @ApiProperty({ description: 'Manufacturing year of the motorcycle' })
  year: number;

  @ApiProperty({ description: 'Current mileage of the motorcycle' })
  mileage: number;

  @ApiProperty({ description: 'Current status of the motorcycle' })
  status: MotorStatus;

  @ApiProperty({ description: 'Date of purchase' })
  purchaseDate: Date;

  @ApiProperty({ description: 'Date of last service', required: false })
  lastServiceDate?: Date;

  @ApiProperty({ description: 'Mileage for the next scheduled service' })
  nextServiceMileage: number;

  @ApiProperty({ description: 'Timestamp of when the motorcycle was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp of the last update' })
  updatedAt: Date;

  @ApiProperty({ description: 'Company assigned to the motorcycle', required: false })
  company?: CompanyEntity | null;
}
