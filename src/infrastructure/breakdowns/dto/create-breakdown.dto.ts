import { ApiProperty } from '@nestjs/swagger';

export class CreateBreakDownDto {
  @ApiProperty({ 
    description: 'Unique identifier for the motorcycle associated with the breakdown', 
    example: 'moto-98765' 
  })
  motorcycleId: string;

  @ApiProperty({ 
    description: 'Description of the breakdown issue', 
    example: 'Engine overheating due to coolant leakage' 
  })
  description: string;

  @ApiProperty({ 
    description: 'Unique identifier for the associated warranty, if applicable', 
    example: 'warranty-45678', 
    nullable: true 
  })
  warrantyId: string | null;
}
