import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { User } from '@infrastructure/users/user.entity';
import { LocationStatusEnum } from '@infrastructure/types/LocationStatusEnum';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the location' })
  id: string;

  @ManyToOne(() => Motorcycle)
  @ApiProperty({ description: 'The motorcycle associated with the location' })
  motorcycle: Motorcycle;

  @ManyToOne(() => User, user => user)
  @ApiProperty({ description: 'The user associated with the location' })
  user: User;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'Start date of the location' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({ description: 'End date of the location' })
  endDate: Date | null;

  @Column({
    type: 'enum',
    enum: LocationStatusEnum,
    default: LocationStatusEnum.IN_PROGRESS,
  })
  @ApiProperty({ description: 'Status of the location (e.g., pending, completed, canceled)' })
  status: LocationStatusEnum;

  @Column('float')
  @ApiProperty({ description: 'Cost of the location' })
  cost: number;

}
