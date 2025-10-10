import { Driver } from "@api/drivers/driver.entity";
import { Motorcycle } from "@api/motorcycles/motorcycle.entity";
import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Appointment } from "../appointment/appointment.entity";

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
  
  @OneToMany(() => Appointment, appointment => appointment.motorcycleTrial,  { nullable: true })
  @ApiProperty({ description: "Appointments related to this motorcycle trial" })
  appointments: Appointment[];
}
