import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {

  @ApiProperty({ description: 'Name of the company', example: 'TechCorp' })
  name: string;

  @ApiProperty({ description: 'User ID associated with the company', example: 'user-67890' })
  userId: string;
}
