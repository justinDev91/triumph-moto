import { MotorStatusEnum } from '@infrastructure/types/MotorStatusEnum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMotorcycleStatusDto {
 
 @ApiProperty({ description: 'New status to update', example: "Available | InMaintenance | OnTest | Sold" })
  status: MotorStatusEnum;

}
