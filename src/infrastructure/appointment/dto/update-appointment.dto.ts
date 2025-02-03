import { AppointmentReasonEnum } from '@infrastructure/types/AppointmentReasonEnum';
import { AppointmentStatusEnum } from '@infrastructure/types/AppointmentStatusEnum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppointmentDto {
  @ApiProperty({
    description: 'The updated status of the appointment (e.g. scheduled, completed, cancelled)',
    example: 'Completed',
  })
  appointmentStatus?: AppointmentStatusEnum;

  @ApiProperty({
    description: 'The updated reason for the appointment (e.g. repair, maintenance, test ride)',
    example: 'Maintenance',
  })
  reason: AppointmentReasonEnum;
}
