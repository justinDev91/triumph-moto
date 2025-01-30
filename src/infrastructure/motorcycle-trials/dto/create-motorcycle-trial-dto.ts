import { LicenseTypeEnum } from '@infrastructure/types/LicenseTypeEnum';
import { MotorStatusEnum } from '@infrastructure/types/MotorStatusEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMotorcycleTrialDto {
  @ApiProperty({
    description: 'Unique identifier for the motorcycle trial',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Motorcycle information for the trial',
    type: Object
  })
  motorcycle: {
    id: string;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    status: MotorStatusEnum; 
    purchaseDate: Date;
    lastServiceDate: Date | null;
    nextServiceMileage: number;
    createdAt: Date;
    updatedAt: Date;
    company: null,
    concession: null ,
  };

  @ApiProperty({
    description: 'Driver information for the trial',
    type: Object,
  })
  driver: {
    id: string;
    name: string;
    licenseType: LicenseTypeEnum; 
    license: string;
    yearsOfExperience: number;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    company: null ,
    user: null
  };

  @ApiProperty({
    description: 'The start date of the motorcycle trial',
    type: String,
    format: 'date-time',
  })
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the motorcycle trial, if applicable',
    type: String,
    format: 'date-time',
    required: false,
  })
  endDate?: Date;
}
