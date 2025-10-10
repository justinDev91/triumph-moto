import { AppointmentReasonEnum } from '@api/types/AppointmentReasonEnum';
import { AppointmentStatusEnum } from '@api/types/AppointmentStatusEnum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'The ID of the user creating the appointment',
    example: 'user12345',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The start time of the appointment',
    example: '2025-03-10T10:00:00Z',
  })
  startTime: Date;

  @ApiProperty({
    description: 'The end time of the appointment',
    example: '2025-03-10T12:00:00Z',
  })
  endTime: Date;

  @ApiProperty({
    description: 'The status of the appointment (e.g. scheduled, completed, cancelled)',
    example: 'Scheduled',
  })
  status: AppointmentStatusEnum;

  @ApiProperty({
    description: 'The reason for the appointment (e.g. repair, maintenance, test ride)',
    example: 'Repair',
  })
  reason: AppointmentReasonEnum;

  @ApiProperty({
    description: 'The ID of the company associated with the appointment',
    example: 'company123',
  })
  companyId: string;

  @ApiProperty({
    description: 'The optional location ID for the appointment',
    example: 'location123',
    required: false,
  })
  locationId?: string;

  @ApiProperty({
    description: 'The optional maintenance ID if the appointment is related to maintenance',
    example: 'maintenance123',
    required: false,
  })
  maintenanceId?: string;

  @ApiProperty({
    description: 'The optional repair ID if the appointment is related to a repair',
    example: 'repair123',
    required: false,
  })
  repairId?: string;

  @ApiProperty({
    description: 'The optional motorcycle trial ID if the appointment involves a motorcycle trial',
    example: 'trial123',
    required: false,
  })
  motorcycleTrialId?: string;
}
