import { LicenseTypeEnum } from '@infrastructure/types/LicenseTypeEnum';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @ApiProperty({ description: 'The type of license of the driver : A | B |C ' })
  @Column({ type: 'enum', enum: LicenseTypeEnum })
  licenseType: string; 

  @ApiProperty({ description: 'Years of driving experience of the driver' })
  @Column()
  yearsOfExperience: number;

  @ApiProperty({ description: 'Email address of the driver' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Phone number of the driver' })
  @Column()
  phone: string;

}
