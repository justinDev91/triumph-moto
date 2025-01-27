import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { User } from '@infrastructure/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Concession {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the concession' })
  id: string;

  @ManyToOne(() => User, user => user.concessions )
  @ApiProperty({ description: 'The user associated with the concession' })
  user: User;

  @OneToMany(() => Motorcycle, motorcycle => motorcycle.concession)
  @ApiProperty({ description: 'The list of motorcycles associated with the concession' })
  motorcycles: Motorcycle[];

  @Column()
  @ApiProperty({ description: 'The name of the concession' })
  name: string;

  @Column()
  @ApiProperty({ description: 'The creation date of the concession' })
  createdAt: Date;

  @Column()
  @ApiProperty({ description: 'The last updated date of the concession' })
  updatedAt: Date;

}
