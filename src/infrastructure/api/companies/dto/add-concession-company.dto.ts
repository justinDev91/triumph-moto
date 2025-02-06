import { ApiProperty } from '@nestjs/swagger';

export class AddConcessionToCompanyDto {
  @ApiProperty({ type: String, description: 'The concession id to add in this company', example : '12Klz809'})
  concessionId: string;
}
