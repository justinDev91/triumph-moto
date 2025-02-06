import { Company } from '@api/companies/company.entity';
import { Concession } from '@api/concessions/concession.entity';
import { Driver } from '@api/drivers/driver.entity';
import { ApiProperty } from '@nestjs/swagger';
import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: string;

  @ApiProperty({ description: 'The first name of the user' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'The email of the user' })
  @Column({ unique: true })  
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @Column()
  password: string;

  @ApiProperty({ description: 'The createdAt timestamp of the user' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'The administrator flag of the user' })
  @Column({ default: false })
  administrator: boolean;

  @ApiProperty({ description: 'The updatedAt timestamp of the user' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty({ description: 'Whether the user is active' })
  @Column({ default: true, nullable: true })
  isActive: boolean;

  @OneToMany(() => Company, company => company.user)
  @ApiProperty({ description: 'List of companies associated with the user' })
  companies: Company[];

  @OneToMany(() => Concession, concession => concession.user)
  @ApiProperty({ description: 'List of concessions associated with the user' })
  concessions: Concession[];

  @OneToMany(() => Driver, driver => driver.user)
  @ApiProperty({ description: 'List of drivers associated with the user' })
  drivers: Driver[];
}
