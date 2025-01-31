import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyNameDto {
  @ApiProperty({ type: String, description: 'The new name', example : 'MYOffice'})
  name: string;
}
