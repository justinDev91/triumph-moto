import { ApiProperty } from '@nestjs/swagger';

export class CreateConcessionDto {
  @ApiProperty({
    description: 'Name of the concession',
    example: 'SuperMotoConcession',
  })
  name: string;

  @ApiProperty({
    description: 'User ID associated with the concession',
    example: 'user-67890',
  })
  userId: string;

  @ApiProperty({
    description: 'ID of the company that the concession belongs to',
    example: 'company-112233',
  })
  companyId: string;
}
