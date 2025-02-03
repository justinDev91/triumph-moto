import { ApiProperty } from '@nestjs/swagger';

export class UpdateDescriptionBreakDownDto {
  @ApiProperty({ type: String, description: 'The new description', example : 'This is my destiny'})
  description: string;
}
