import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { LicenseTypeEnum } from '@api/types/LicenseTypeEnum';
import { Company } from '@api/companies/company.entity';
import { User } from '@api/users/user.entity';
import { DrivingRecord } from './driver.record.entity';

@Entity()
export class Driver {
  
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the driver' })
  id: string;

  @ApiProperty({ description: 'The name of the driver' })
  @Column()
  name: string;

  @ApiProperty({ description: 'The license of the driver' })
  @Column()
  license: string;

  @ApiProperty({ description: 'The type of license of the driver (A, B, C)' })
  @Column({ type: 'enum', enum: LicenseTypeEnum })
  licenseType: LicenseTypeEnum;

  @ApiProperty({ description: 'Years of driving experience' })
  @Column()
  yearsOfExperience: number;

  @ApiProperty({ description: 'Email address of the driver' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Phone number of the driver' })
  @Column()
  phone: string;

  @ManyToOne(() => Company, company => company.drivers)
  @ApiProperty({ description: 'The company to which the driver is associated' })
  company: Company;

  @ManyToOne(() => User, user => user.drivers )
  @ApiProperty({ description: 'The user associated with the drivers' })
  user: User;

  @ApiProperty({ description: 'The createdAt timestamp of the user' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  
  @ApiProperty({ description: 'The updatedAt timestamp of the user' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => DrivingRecord, drivingRecord => drivingRecord.driver, { cascade: true, nullable: true})
  @ApiProperty({ description: 'Driving history of the driver', type: [DrivingRecord] })
  drivingHistory?: DrivingRecord[];

}
