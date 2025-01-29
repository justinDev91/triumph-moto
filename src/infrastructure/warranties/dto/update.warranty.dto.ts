import { ApiProperty } from '@nestjs/swagger';

export class UpdateWarrantyDto {
  
  @ApiProperty({ description: 'Warranty id' })
  id: string;

  @ApiProperty({ description: 'The start date of the warranty', type: Date })
  startDate: Date;

  @ApiProperty({ description: 'The end date of the warranty', type: Date })
  endDate: Date;

  @ApiProperty({ description: 'Details of the warranty coverage' })
  coverageDetails: string;

  @ApiProperty({ description: 'Indicates whether the warranty is active' })
  isActive: boolean;
}
