import { MaintenanceTypeEnum } from '@infrastructure/types/MaintenanceTypeEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaintenanceDto {
  @ApiProperty({
    description: 'ID of the motorcycle associated with the maintenance',
    example: 'motorcycle-67890',
  })
  motorcycleId: string;

  @ApiProperty({
    description: 'Type of maintenance performed',
    enum: MaintenanceTypeEnum,
    example: 'Preventive',
  })
  maintenanceType: MaintenanceTypeEnum;

  @ApiProperty({
    description: 'Date when the maintenance was performed',
    example: '2025-01-15T00:00:00Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Cost of the maintenance service',
    example: 150.75,
  })
  cost: number;

  @ApiProperty({
    description: 'Mileage of the motorcycle at the time of service',
    example: 12000,
  })
  mileageAtService: number;

  @ApiProperty({
    description: 'Maintenance interval based on mileage',
    example: 5000,
  })
  maintenanceIntervalMileage: number;

  @ApiProperty({
    description: 'Maintenance interval based on time (in months)',
    example: 6,
  })
  maintenanceIntervalTime: number;

  @ApiProperty({
    description: 'ID of the concession associated with the maintenance (nullable)',
    example: 'concession-12345',
    nullable: true,
  })
  concessionId: string | null;
}
