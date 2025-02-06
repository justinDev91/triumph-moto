import { ApiProperty } from '@nestjs/swagger';

export class UpdateConcessionNameDto {
  @ApiProperty({ type: String, description: 'The new name', example : 'MissMonde'})
  name: string;
}
