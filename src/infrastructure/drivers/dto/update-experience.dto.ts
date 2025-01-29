import { ApiProperty } from '@nestjs/swagger';

export class UpdateExperienceDto {
  @ApiProperty({ description: 'Years of experience', example: 5 })
  years: number;
}