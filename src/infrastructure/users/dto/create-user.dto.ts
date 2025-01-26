import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  lastName: string;

  @ApiProperty({ description: 'Password of the user' })
  password: string;

  @ApiProperty({ description: 'Date when the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the user was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'Flag indicating if the user is an administrator' })
  administrator: boolean;

  @ApiProperty({ description: 'Status of the user, whether active or not', default: true })
  isActive: boolean;
}
