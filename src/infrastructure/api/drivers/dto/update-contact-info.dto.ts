import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactInfoDto {
  @ApiProperty({ description: 'User email address', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'User phone number', example: '1234567890' })
  phone: string;
}