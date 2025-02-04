import { ApiProperty } from '@nestjs/swagger';

export class AddDriverToCompanyDto {
  @ApiProperty({ type: String, description: 'The driver id to add in this company', example : '12Klz809'})
  driverId: string;
}
