import { Driver } from "@infrastructure/drivers/driver.entity";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class MotorcycleTrial {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "Unique identifier for the motorcycle trial" })
  id: string;

  @OneToOne(() => Motorcycle)
  @JoinColumn({ name: "motorcycleId" })
  @ApiProperty({ description: "The motorcycle involved in the trial" })
  motorcycle: Motorcycle;

  @OneToOne(() => Driver)
  @JoinColumn({ name: "driverId" })
  @ApiProperty({ description: "The driver participating in the trial" })
  driver: Driver;

  @Column({ type: "date" })
  @ApiProperty({ description: "The start date of the motorcycle trial" })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  @ApiProperty({ description: "The end date of the motorcycle trial", nullable: true })
  endDate: Date | null;
}
