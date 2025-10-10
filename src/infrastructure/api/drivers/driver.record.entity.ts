import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Driver } from '@api/drivers/driver.entity';

export enum DrivingRecordType {
  TEST_DRIVE = 'Test Drive',
  INCIDENT = 'Incident',
}

@Entity()
export class DrivingRecord {
  
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the driving record' })
  id: string;

  @ManyToOne(() => Driver, driver => driver.drivingHistory, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'The driver associated with the record' })
  driver: Driver;

  @ManyToOne(() => Motorcycle, { nullable: false })
  @ApiProperty({ description: 'The motorcycle involved in the record' })
  motorcycle: Motorcycle;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date of the driving record' })
  date: Date;

  @Column({ type: 'enum', enum: DrivingRecordType })
  @ApiProperty({ description: 'The type of record (Test Drive or Incident)' })
  type: DrivingRecordType;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Details about the driving record' })
  details: string;
}
