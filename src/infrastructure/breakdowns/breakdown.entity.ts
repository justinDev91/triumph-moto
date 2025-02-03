import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { Repair } from "@infrastructure/repairs/repair.entity";
import { Warranty } from "@infrastructure/warranties/warranty.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";

@Entity()
export class Breakdown {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "Unique identifier for the breakdown" })
  id: string;

  @ManyToOne(() => Motorcycle)
  @ApiProperty({ description: "The motorcycle associated with this breakdown" })
  motorcycle: Motorcycle;

  @Column({ type: "text" })
  @ApiProperty({ description: "Description of the breakdown" })
  description: string;

  @ApiProperty({ description: "The date when the breakdown was reported" })
  @CreateDateColumn({ type: 'timestamp' })
  reportedDate: Date;

  @ManyToOne(() => Warranty)
  @ApiProperty({ description: "The warranty associated with this breakdown, if any" })
  warranty: Warranty| null;

  @OneToMany(() => Repair, (repair) => repair.breakdown)
  @ApiProperty({ description: "The repairs associated with this breakdown" })
  repairs: Repair[];

}
