import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { User } from '@infrastructure/users/user.entity';
import { Company } from '@infrastructure/companies/company.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Concession {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the concession' })
  id: string;

  @ManyToOne(() => User, user => user.concessions)
  @ApiProperty({ description: 'The user associated with the concession' })
  user: User;

  @OneToMany(() => Motorcycle, motorcycle => motorcycle.concession, { nullable: true })
  @ApiProperty({ description: 'The list of motorcycles associated with the concession' })
  motorcycles: Motorcycle[];

  @ManyToOne(() => Company, company => company.concessions, { nullable: true }) 
  @ApiProperty({ 
    description: 'The company associated with the concession', 
    type: Company, 
    nullable: true, 
  })
  company: Company | null; 

  @Column()
  @ApiProperty({ description: 'The name of the concession' })
  name: string;

  @ApiProperty({ description: 'The creation date of the concession' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'The last updated date of the concession' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
