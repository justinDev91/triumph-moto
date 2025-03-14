import { Company } from "@api/companies/company.entity";
import { Location } from "@api/locations/location.entity";
import { Maintenance } from "@api/maintenances/maintenance.entity";
import { MotorcycleTrial } from "@api/motorcycle-trials/motorcycle-trial.entity";
import { Repair } from "@api/repairs/repair.entity";
import { AppointmentReasonEnum } from "@api/types/AppointmentReasonEnum";
import { AppointmentStatusEnum } from "@api/types/AppointmentStatusEnum";
import { User } from "@api/users/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "Unique identifier for the appointment" })
  id: string;

  @ManyToOne(() => User, { eager: true, })
  @JoinColumn({ name: "userId" })
  @ApiProperty({ description: "The user associated with the appointment" })
  user: User;

  @Column({ type: "timestamp" })
  @ApiProperty({ description: "The start time of the appointment" })
  startTime: Date;

  @Column({ type: "timestamp" })
  @ApiProperty({ description: "The end time of the appointment" })
  endTime: Date;

  @Column("enum", { enum: AppointmentStatusEnum })
  @ApiProperty({ description: "The status of the appointment" })
  appointmentStatus: AppointmentStatusEnum;

  @ApiProperty({ description: "The date the appointment was created" })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;


  @ApiProperty({ description: "The date the appointment was last updated" })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column("enum", { enum: AppointmentReasonEnum })
  @ApiProperty({ description: "The reason for the appointment" })
  reason: AppointmentReasonEnum;

  @ManyToOne(() => Company, {cascade: true})
  @JoinColumn({ name: "companyId" })
  @ApiProperty({ description: "The company associated with the appointment" })
  company: Company;

  @ManyToOne(() => Location, { nullable: true, cascade: true})
  @JoinColumn({ name: "locationId" })
  @ApiProperty({ description: "The location associated with the appointment" })
  location: Location | null;

  @ManyToOne(() => Maintenance, {nullable: true, cascade: true})
  @JoinColumn({ name: "maintenanceId" })
  @ApiProperty({ description: "The maintenance associated with the appointment" })
  maintenance: Maintenance | null;

  @ManyToOne(() => Repair, { nullable: true, cascade: true })
  @JoinColumn({ name: "repairId" })
  @ApiProperty({ description: "The repair associated with the appointment" })
  repair: Repair | null;

  @ManyToOne(() => MotorcycleTrial, {nullable: true, cascade: true })
  @JoinColumn({ name: "motorcycleTrialId" })
  @ApiProperty({ description: "The motorcycle trial associated with the appointment" })
  motorcycleTrial: MotorcycleTrial | null;
}
