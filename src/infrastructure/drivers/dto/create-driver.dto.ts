import { ApiProperty } from '@nestjs/swagger';
import { LicenseType } from '@domain/types/motorcycle';
import { LicenseTypeEnum } from '@infrastructure/types/LicenseTypeEnum';

export class CreateDriverDto {
  @ApiProperty({ description: 'Name of the driver' })
  name: string;

  @ApiProperty({ description: 'Type of license', enum: LicenseTypeEnum })
  licenseType: LicenseType;

  @ApiProperty({ description: 'License number' })
  license: string;

  @ApiProperty({ description: 'Years of experience' })
  yearsOfExperience: number;

  @ApiProperty({ description: 'Driver email' })
  email: string;

  @ApiProperty({ description: 'Driver phone number' })
  phone: string;
}
