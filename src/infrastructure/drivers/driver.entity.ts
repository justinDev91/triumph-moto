import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LicenseTypeEnum } from '@infrastructure/types/LicenseTypeEnum';
import { Company } from '@infrastructure/companies/company.entity';
import { User } from '@infrastructure/users/user.entity';

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
}
