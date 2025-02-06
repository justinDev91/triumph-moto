import { ApiProperty } from '@nestjs/swagger';

export class UpdateWarrantyDto {

  @ApiProperty({ description: 'Details of the warranty coverage' })
  coverageDetails: string;

  @ApiProperty({ description: 'Indicates whether the warranty is active' })
  isActive: boolean;
}
