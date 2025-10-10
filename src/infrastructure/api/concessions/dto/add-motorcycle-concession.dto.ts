import { ApiProperty } from '@nestjs/swagger';

export class AddMotorcycleToConcessionNameDto {
  @ApiProperty({ type: String, description: 'The motorcycle id', example : '1nckqcn8'})
  motorcycleId: string;
}
