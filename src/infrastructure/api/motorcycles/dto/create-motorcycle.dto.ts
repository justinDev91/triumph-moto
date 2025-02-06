import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { MotorStatus } from '@domain/types/motorcycle';

export class CreateMotorcycleDto {
  @ApiProperty({ 
    description: 'Brand of the motorcycle', 
    example: 'Honda' 
  })
  brand: string;

  @ApiProperty({ 
    description: 'Model of the motorcycle', 
    example: 'CBR 600RR' 
  })
  model: string;

  @ApiProperty({ 
    description: 'Manufacturing year of the motorcycle', 
    example: 2022 
  })
  year: number;

  @ApiProperty({ 
    description: 'Current mileage of the motorcycle', 
    example: 15000 
  })
  mileage: number;

  @ApiProperty({ 
    description: 'Current status of the motorcycle', 
    example: 'Available'
  })
  status: MotorStatus;

  @ApiProperty({ 
    description: 'Date of purchase', 
    example: '2023-05-15T00:00:00.000Z' 
  })
  purchaseDate: Date;

  @ApiProperty({ 
    description: 'Date of last service', 
    required: false, 
    example: '2024-01-10T00:00:00.000Z' 
  })
  lastServiceDate?: Date;

  @ApiProperty({ 
    description: 'Mileage for the next scheduled service', 
    example: 20000 
  })
  nextServiceMileage: number;

  @ApiProperty({ 
    description: 'Company assigned to the motorcycle', 
    required: false, 
    example: { 
      name: 'SpeedRiders Ltd.', 
      createdAt: '2023-01-01T12:00:00.000Z' 
    } 
  })
  company?: CompanyEntity | null;
}
