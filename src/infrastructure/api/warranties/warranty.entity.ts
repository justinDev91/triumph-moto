import { Motorcycle } from "@api/motorcycles/motorcycle.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Warranty {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "Unique identifier for the warranty"})
  id: string;

  @ManyToOne(() => Motorcycle)
  @ApiProperty({ description: "The motorcycle associated with this warranty" })
  motorcycle?: Motorcycle;

  @Column()
  @ApiProperty({ description: "The start date of the warranty"})
  startDate: Date;

  @Column()
  @ApiProperty({ description: "The end date of the warranty"})
  endDate: Date;

  @Column({ type: "text" })
  @ApiProperty({ description: "Detailed coverage information of the warranty"})
  coverageDetails: string;

  @Column({ default: true })
  @ApiProperty({ description: "Indicates if the warranty is currently active"})
  isActive: boolean;
}
