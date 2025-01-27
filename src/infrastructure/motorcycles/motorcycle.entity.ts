import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MotorStatusEnum } from '@infrastructure/types/MotorStatusEnum';
import { Company } from '@infrastructure/companies/company.entity';
import { Concession } from '@infrastructure/concessions/concession.entity';

@Entity()
export class Motorcycle {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the motorcycle' })
  id: string;

  @ApiProperty({ description: 'Brand of the motorcycle' })
  @Column()
  brand: string;

  @ApiProperty({ description: 'Model of the motorcycle' })
  @Column()
  model: string;

  @ApiProperty({ description: 'Year of manufacture of the motorcycle' })
  @Column()
  year: number;

  @ApiProperty({ description: 'Mileage of the motorcycle' })
  @Column()
  mileage: number;

  @ApiProperty({ description: 'Current status of the motorcycle (e.g., active, in service)' })
  @Column({
    type: 'enum',
    enum: MotorStatusEnum,
    default: MotorStatusEnum.Available,
  })
  status: MotorStatusEnum;

  @ApiProperty({ description: 'Purchase date of the motorcycle' })
  @Column()
  purchaseDate: Date;

  @ApiProperty({ description: 'Last service date of the motorcycle' })
  @Column({ nullable: true })
  lastServiceDate: Date | null;

  @ApiProperty({ description: 'Next service mileage for the motorcycle' })
  @Column()
  nextServiceMileage: number;

  @ApiProperty({ description: 'Date when the motorcycle was created' })
  @Column()
  createdAt: Date;

  @ApiProperty({ description: 'Date when the motorcycle details were last updated' })
  @Column()
  updatedAt: Date;

  @ManyToOne(() => Company, company => company.motorcycles)
  @ApiProperty({ description: 'The company associated with the motorcycle' })
  company: Company | null;

  @ManyToOne(() => Concession, concession => concession.motorcycles)
  @ApiProperty({ description: 'The concession associated with the motorcycle' })
  concession: Concession | null;

}
