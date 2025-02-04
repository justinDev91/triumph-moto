import { ApiProperty } from '@nestjs/swagger';

export class AddMotorcycleToCompanyDto {
  @ApiProperty({ type: String, description: 'The motorcycle id to add in this company', example : '12Klz809'})
  motorcycleId: string;
}
