import { ApiProperty } from '@nestjs/swagger';

export class DrivingRecordDto {
  @ApiProperty({ description: 'Date of the driving record', type: Date })
  date: Date;

  @ApiProperty({ description: 'ID of the motorcycle associated with the record' })
  motorcycleId: string;

  @ApiProperty({ 
    description: 'Type of driving record', 
    enum: ['Test Drive', 'Incident'] 
  })
  type: 'Test Drive' | 'Incident';

  @ApiProperty({ description: 'Additional details about the driving record' })
  details: string;
}
