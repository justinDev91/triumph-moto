import { Driver } from '@infrastructure/drivers/driver.entity';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { User } from '@infrastructure/users/user.entity';
import { Concession } from '@infrastructure/concessions/concession.entity'; 
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the company' })
  id: string;

  @ApiProperty({ description: 'Company name' })
  @Column()
  name: string;

  @ManyToOne(() => User, user => user.companies)
  @ApiProperty({ description: 'The user associated with the company' })
  user: User;

  @OneToMany(() => Driver, driver => driver.company)
  @ApiProperty({ description: 'The list of drivers associated with the company' })
  drivers: Driver[];

  @OneToMany(() => Motorcycle, motorcycle => motorcycle.company)
  @ApiProperty({ description: 'The list of motorcycles associated with the company' })
  motorcycles: Motorcycle[];

  @OneToMany(() => Concession, concession => concession.company) 
  @ApiProperty({ description: 'The list of concessions associated with the company' })
  concessions: Concession[];

  @ApiProperty({ description: 'The creation date of the company' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'The last updated date of the company' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
