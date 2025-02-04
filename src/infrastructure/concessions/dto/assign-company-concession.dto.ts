import { ApiProperty } from '@nestjs/swagger';

export class AssignCompanyToConcessionNameDto {
  @ApiProperty({ type: String, description: 'The company id', example : '1nckqcn8'})
  companyId: string;
}
