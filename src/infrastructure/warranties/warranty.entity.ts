import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Warranty {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Motorcycle)
  motorcycle: Motorcycle;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: "text" })
  coverageDetails: string;

  @Column({ default: true })
  isActive: boolean;

}
