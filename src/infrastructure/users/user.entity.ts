import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the driver' })
  id: string;

  @ApiProperty({ description: 'The firstName of the user' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'The lastName of the user' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'The password of the user' })
  @Column()
  password: string; 

  @ApiProperty({ description: 'The createdAt timestamp of the user' })
  @Column()
  createdAt: Date;

  @ApiProperty({ description: 'The administrator flag of the user' })
  @Column({ default: false })
  administrator: boolean;

  @ApiProperty({ description: 'The updatedAt timestamp of the user' })
  @Column()
  updatedAt: Date;

  @ApiProperty({ description: 'Whether the user is active' })
  @Column({ default: true })
  isActive: boolean;
}
